"""
Unit tests for deterministic rule engine & operators.
Testing TRD Section 12 requirements.
"""
from app.rules.operators import (
    op_eq, op_ne, op_gte, op_lte, op_in, op_not_in, op_between,
    evaluate_income_limit, RuleStatus
)
from app.rules.engine import (
    evaluate_scheme_rules, calculate_ranking_score,
    SchemeMatchStatus, MatchStrength, get_match_strength
)

def test_operators_basic():
    assert op_eq("artisan", "artisan") == RuleStatus.PASS
    assert op_eq("farmer", "artisan") == RuleStatus.FAIL
    assert op_eq(None, "artisan") == RuleStatus.UNKNOWN
    assert op_eq("unspecified", "artisan") == RuleStatus.UNKNOWN

    assert op_gte(25, 18) == RuleStatus.PASS
    assert op_gte(16, 18) == RuleStatus.FAIL
    assert op_gte(None, 18) == RuleStatus.UNKNOWN

    assert op_lte(10, 10) == RuleStatus.PASS
    assert op_lte(12, 10) == RuleStatus.FAIL

    assert op_in("student", ["student", "artisan"]) == RuleStatus.PASS
    assert op_in("farmer", ["student", "artisan"]) == RuleStatus.FAIL
    assert op_in(None, ["student"]) == RuleStatus.UNKNOWN

    assert op_between(25, [18, 35]) == RuleStatus.PASS
    assert op_between(40, [18, 35]) == RuleStatus.FAIL

def test_income_band_evaluation():
    # Ceiling is 250,000 (2.5 Lakh)
    assert evaluate_income_limit("below_2_5", 250000) == RuleStatus.PASS
    assert evaluate_income_limit("2_5_to_5", 200000) == RuleStatus.FAIL
    assert evaluate_income_limit("2_5_to_5", 250000) == RuleStatus.UNKNOWN # Boundary point
    assert evaluate_income_limit("above_8", 250000) == RuleStatus.FAIL
    assert evaluate_income_limit("unspecified", 250000) == RuleStatus.UNKNOWN

    # Ceiling is 600,000 (6 Lakh)
    # Band 5_to_8 is 500k to 800k -> straddles 600k -> UNKNOWN!
    assert evaluate_income_limit("below_2_5", 600000) == RuleStatus.PASS
    assert evaluate_income_limit("2_5_to_5", 600000) == RuleStatus.PASS
    assert evaluate_income_limit("5_to_8", 600000) == RuleStatus.UNKNOWN
    assert evaluate_income_limit("above_8", 600000) == RuleStatus.FAIL

def test_scheme_evaluation_likely():
    rules = [
        {"field_name": "age", "operator": "gte", "expected_value": 18, "is_mandatory": True},
        {"field_name": "occupation", "operator": "eq", "expected_value": "artisan", "is_mandatory": True},
    ]
    profile = {"age": 30, "occupation": "artisan"}
    res = evaluate_scheme_rules(rules, profile)
    assert res["status"] == SchemeMatchStatus.LIKELY.value
    assert len(res["matched_rules"]) == 2

def test_scheme_evaluation_mandatory_fail():
    rules = [
        {"field_name": "age", "operator": "gte", "expected_value": 18, "is_mandatory": True},
        {"field_name": "occupation", "operator": "eq", "expected_value": "artisan", "is_mandatory": True},
    ]
    profile = {"age": 16, "occupation": "artisan"} # Age fails
    res = evaluate_scheme_rules(rules, profile)
    assert res["status"] == SchemeMatchStatus.NOT_YET.value
    assert len(res["missing_rules"]) == 1

def test_scheme_evaluation_unknown_check_details():
    rules = [
        {"field_name": "age", "operator": "gte", "expected_value": 18, "is_mandatory": True},
        {"field_name": "occupation", "operator": "eq", "expected_value": "artisan", "is_mandatory": True},
    ]
    profile = {"age": 25, "occupation": "unspecified"} # Missing detail
    res = evaluate_scheme_rules(rules, profile)
    assert res["status"] == SchemeMatchStatus.CHECK_DETAILS.value
    assert len(res["unknown_rules"]) == 1

def test_ranking_strength():
    assert get_match_strength(85) == MatchStrength.STRONG
    assert get_match_strength(65) == MatchStrength.GOOD
    assert get_match_strength(40) == MatchStrength.FAIR

if __name__ == "__main__":
    test_operators_basic()
    test_income_band_evaluation()
    test_scheme_evaluation_likely()
    test_scheme_evaluation_mandatory_fail()
    test_scheme_evaluation_unknown_check_details()
    test_ranking_strength()
    print("All rule tests passed successfully!")
