"""
Deterministic rule operators for SchemeMatch.
All operators are pure functions, strictly typed, with no eval/exec.
"""
from typing import Any, Tuple
from enum import Enum

class RuleStatus(str, Enum):
    PASS = "PASS"
    FAIL = "FAIL"
    UNKNOWN = "UNKNOWN"

INCOME_BANDS = {
    "below_2_5": (0, 250000),
    "2_5_to_5": (250000, 500000),
    "5_to_8": (500000, 800000),
    "above_8": (800000, float("inf")),
    "unspecified": (0, float("inf")),
}

def op_eq(actual: Any, expected: Any) -> RuleStatus:
    if actual is None or actual == "unspecified":
        return RuleStatus.UNKNOWN
    return RuleStatus.PASS if str(actual).lower() == str(expected).lower() else RuleStatus.FAIL

def op_ne(actual: Any, expected: Any) -> RuleStatus:
    if actual is None or actual == "unspecified":
        return RuleStatus.UNKNOWN
    return RuleStatus.PASS if str(actual).lower() != str(expected).lower() else RuleStatus.FAIL

def op_gte(actual: Any, expected: Any) -> RuleStatus:
    if actual is None or actual == "unspecified":
        return RuleStatus.UNKNOWN
    try:
        return RuleStatus.PASS if float(actual) >= float(expected) else RuleStatus.FAIL
    except (ValueError, TypeError):
        return RuleStatus.UNKNOWN

def op_lte(actual: Any, expected: Any) -> RuleStatus:
    if actual is None or actual == "unspecified":
        return RuleStatus.UNKNOWN
    try:
        return RuleStatus.PASS if float(actual) <= float(expected) else RuleStatus.FAIL
    except (ValueError, TypeError):
        return RuleStatus.UNKNOWN

def op_in(actual: Any, expected: Any) -> RuleStatus:
    if actual is None or actual == "unspecified":
        return RuleStatus.UNKNOWN
    if isinstance(expected, list):
        expected_set = {str(x).lower() for x in expected}
        return RuleStatus.PASS if str(actual).lower() in expected_set else RuleStatus.FAIL
    return RuleStatus.UNKNOWN

def op_not_in(actual: Any, expected: Any) -> RuleStatus:
    if actual is None or actual == "unspecified":
        return RuleStatus.UNKNOWN
    if isinstance(expected, list):
        expected_set = {str(x).lower() for x in expected}
        return RuleStatus.PASS if str(actual).lower() not in expected_set else RuleStatus.FAIL
    return RuleStatus.UNKNOWN

def op_between(actual: Any, expected: Any) -> RuleStatus:
    if actual is None or actual == "unspecified":
        return RuleStatus.UNKNOWN
    try:
        if isinstance(expected, (list, tuple)) and len(expected) == 2:
            val = float(actual)
            low, high = float(expected[0]), float(expected[1])
            return RuleStatus.PASS if low <= val <= high else RuleStatus.FAIL
    except (ValueError, TypeError):
        return RuleStatus.UNKNOWN
    return RuleStatus.UNKNOWN

def evaluate_income_limit(band_name: str, limit: float) -> RuleStatus:
    """Compare income band with a ceiling limit per Section 12."""
    if not band_name or band_name not in INCOME_BANDS or band_name == "unspecified":
        return RuleStatus.UNKNOWN
    low, high = INCOME_BANDS[band_name]
    if limit >= high:
        return RuleStatus.PASS
    if limit < low:
        return RuleStatus.FAIL
    return RuleStatus.UNKNOWN

OPERATOR_MAP = {
    "eq": op_eq,
    "ne": op_ne,
    "gte": op_gte,
    "lte": op_lte,
    "in": op_in,
    "not_in": op_not_in,
    "between": op_between,
}
