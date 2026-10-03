"""
Deterministic rule engine for SchemeMatch.
Strictly implements Section 12 of the TRD.
"""
from typing import Dict, List, Any, Optional
from enum import Enum
from .operators import RuleStatus, OPERATOR_MAP, evaluate_income_limit

class SchemeMatchStatus(str, Enum):
    LIKELY = "LIKELY"                     # Likely eligible
    CHECK_DETAILS = "CHECK_DETAILS"       # Check one detail
    NOT_YET = "NOT_YET"                   # Not yet eligible

class MatchStrength(str, Enum):
    STRONG = "Strong"
    GOOD = "Good"
    FAIR = "Fair"

def evaluate_single_rule(rule: Dict[str, Any], profile: Dict[str, Any]) -> RuleStatus:
    field_name = rule["field_name"]
    operator_name = rule["operator"]
    expected_value = rule["expected_value"]
    
    actual_value = profile.get(field_name)
    
    # Special handling for income ceiling comparison if operator is income limit
    if field_name == "income_band" and operator_name in ("lte", "gte"):
        if isinstance(expected_value, (int, float)):
            return evaluate_income_limit(actual_value, float(expected_value))
            
    op_fn = OPERATOR_MAP.get(operator_name)
    if not op_fn:
        return RuleStatus.UNKNOWN
        
    return op_fn(actual_value, expected_value)

def evaluate_scheme_rules(rules: List[Dict[str, Any]], profile: Dict[str, Any]) -> Dict[str, Any]:
    """
    Evaluates all rules for a single scheme against user profile.
    Rules in the same logical_group are OR-ed.
    Different logical groups and ungrouped rules are AND-ed.
    """
    grouped_rules: Dict[str, List[Dict[str, Any]]] = {}
    ungrouped_rules: List[Dict[str, Any]] = []
    
    rule_results = []
    for r in rules:
        res = evaluate_single_rule(r, profile)
        evaluated = {
            "id": r.get("id"),
            "field_name": r["field_name"],
            "status": res.value,
            "is_mandatory": r.get("is_mandatory", True),
            "explanation_en": r.get("explanation_en", ""),
            "explanation_hi": r.get("explanation_hi", ""),
            "logical_group": r.get("logical_group"),
        }
        rule_results.append(evaluated)
        
        lg = r.get("logical_group")
        if lg:
            grouped_rules.setdefault(lg, []).append(evaluated)
        else:
            ungrouped_rules.append(evaluated)

    # Check for mandatory FAIL or UNKNOWN
    has_mandatory_fail = False
    has_mandatory_unknown = False

    # Check ungrouped mandatory rules
    for r in ungrouped_rules:
        if r["is_mandatory"]:
            if r["status"] == RuleStatus.FAIL.value:
                has_mandatory_fail = True
            elif r["status"] == RuleStatus.UNKNOWN.value:
                has_mandatory_unknown = True

    # Check grouped rules (OR within group)
    for group_name, grp in grouped_rules.items():
        is_group_mandatory = any(r["is_mandatory"] for r in grp)
        if is_group_mandatory:
            any_pass = any(r["status"] == RuleStatus.PASS.value for r in grp)
            all_fail = all(r["status"] == RuleStatus.FAIL.value for r in grp)
            
            if all_fail:
                has_mandatory_fail = True
            elif not any_pass:
                # None passed, and not all failed -> at least one unknown
                has_mandatory_unknown = True

    if has_mandatory_fail:
        final_status = SchemeMatchStatus.NOT_YET
    elif has_mandatory_unknown:
        final_status = SchemeMatchStatus.CHECK_DETAILS
    else:
        final_status = SchemeMatchStatus.LIKELY

    return {
        "status": final_status.value,
        "rules": rule_results,
        "matched_rules": [r for r in rule_results if r["status"] == RuleStatus.PASS.value],
        "unknown_rules": [r for r in rule_results if r["status"] == RuleStatus.UNKNOWN.value],
        "missing_rules": [r for r in rule_results if r["status"] == RuleStatus.FAIL.value],
    }

def calculate_ranking_score(
    scheme: Dict[str, Any],
    profile: Dict[str, Any],
    eval_result: Dict[str, Any]
) -> int:
    """
    Computes deterministic ranking score 0-100 per Section 12:
    - need-category match: 40
    - optional-rule fit: 25
    - freshness (verified within 90 days): 15
    - state-specific relevance: 10
    - featured/popular badge: 10
    """
    score = 0
    
    # 1. Category match (40)
    need_categories = profile.get("need_categories", [])
    if scheme.get("category_slug") in need_categories:
        score += 40
    elif not need_categories:
        score += 30 # default if no need filter applied
        
    # 2. Rule evaluation fit (25)
    rules = eval_result.get("rules", [])
    if rules:
        pass_count = len(eval_result.get("matched_rules", []))
        score += int(25 * (pass_count / len(rules)))
    else:
        score += 20
        
    # 3. Freshness (15)
    # If verified and not outdated
    if scheme.get("status") == "ACTIVE" and scheme.get("official_domain_checked"):
        score += 15
    elif scheme.get("status") == "ACTIVE":
        score += 10
        
    # 4. State relevance (10)
    user_state = profile.get("state_code")
    if not scheme.get("state_code"): # Central scheme applies everywhere
        score += 8
    elif user_state and scheme.get("state_code") == user_state:
        score += 10
        
    # 5. Featured/popular (10)
    if scheme.get("is_featured") or scheme.get("badge") in ("popular", "high_impact"):
        score += 10
        
    return min(100, max(0, score))

def get_match_strength(score: int) -> MatchStrength:
    if score >= 70:
        return MatchStrength.STRONG
    if score >= 50:
        return MatchStrength.GOOD
    return MatchStrength.FAIR
