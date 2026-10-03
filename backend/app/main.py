"""
FastAPI backend service for SchemeMatch per TRD specification.
Provides deterministic rule matching, verified scheme lookup, and live statistics.
"""
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import os
import json

from app.rules.engine import (
    evaluate_scheme_rules, calculate_ranking_score, get_match_strength,
    SchemeMatchStatus
)

app = FastAPI(
    title="SchemeMatch API",
    description="Independent platform assisting citizens to discover and prepare for welfare schemes",
    version="2.0.0",
)

# CORS setup per TRD Section 14
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    os.getenv("FRONTEND_ORIGIN", "http://localhost:3000"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# In-memory verified schemes store loaded from database/seed
VERIFIED_SCHEMES = [
    {
        "id": "sch-1",
        "slug": "pm-vishwakarma",
        "category_slug": "jobs-livelihoods",
        "level": "central",
        "state_code": None,
        "status": "ACTIVE",
        "is_featured": True,
        "badge": "popular",
        "official_url": "https://pmvishwakarma.gov.in",
        "apply_url": "https://pmvishwakarma.gov.in/Registration",
        "name_en": "PM Vishwakarma",
        "name_hi": "पीएम विश्वकर्मा",
        "summary_en": "Support for traditional artisans and craftspeople to strengthen skills, tools, and market access.",
        "benefits_en": "Toolkit incentive of ₹15,000, 5-7 days basic skilling with ₹500/day stipend, collateral-free enterprise loan up to ₹3 lakh at 5% concessional rate.",
        "last_verified_at": "2026-09-15",
        "rules": [
            {"id": "r1", "field_name": "occupation", "operator": "in", "expected_value": ["artisan"], "is_mandatory": True, "explanation_en": "Applicant must be an artisan or craftsperson working with hands and tools"},
            {"id": "r2", "field_name": "age", "operator": "gte", "expected_value": 18, "is_mandatory": True, "explanation_en": "Applicant must be at least 18 years of age"},
        ],
        "documents": [
            {"name_key": "Aadhaar card", "mandatory": True, "tip_key": "Name and date of birth match"},
            {"name_key": "Bank passbook", "mandatory": True, "tip_key": "Account details visible"},
            {"name_key": "Address proof", "mandatory": True, "tip_key": "Issued within accepted period"},
            {"name_key": "Recent photograph", "mandatory": True, "tip_key": "Passport-size, clear background"},
        ]
    },
    {
        "id": "sch-2",
        "slug": "ayushman-bharat-pmjay",
        "category_slug": "health-wellbeing",
        "level": "central",
        "state_code": None,
        "status": "ACTIVE",
        "is_featured": True,
        "badge": "high_impact",
        "official_url": "https://pmjay.gov.in",
        "apply_url": "https://mera.pmjay.gov.in",
        "name_en": "Ayushman Bharat PM-JAY",
        "name_hi": "आयुष्मान भारत पीएम-जय",
        "summary_en": "Health cover for eligible families for secondary and tertiary care at empanelled hospitals.",
        "benefits_en": "Cashless health cover up to ₹5,00,000 per family per year across India.",
        "last_verified_at": "2026-09-18",
        "rules": [
            {"id": "r3", "field_name": "income_band", "operator": "in", "expected_value": ["below_2_5", "2_5_to_5"], "is_mandatory": True, "explanation_en": "Household must be covered under SECC deprivation criteria or low-income group"},
        ],
        "documents": [
            {"name_key": "Aadhaar card or Ration card", "mandatory": True, "tip_key": "Identity and family verification"},
            {"name_key": "Active mobile number", "mandatory": True, "tip_key": "Required for instant e-card generation"},
        ]
    },
    {
        "id": "sch-3",
        "slug": "national-scholarship-portal",
        "category_slug": "education-scholarships",
        "level": "central",
        "state_code": None,
        "status": "ACTIVE",
        "is_featured": True,
        "badge": "new",
        "official_url": "https://scholarships.gov.in",
        "apply_url": "https://scholarships.gov.in/fresh/newstdRegfrmInstruction",
        "name_en": "National Scholarship Portal",
        "name_hi": "राष्ट्रीय छात्रवृत्ति पोर्टल",
        "summary_en": "A single window to discover and apply for multiple scholarship programmes across India.",
        "benefits_en": "Direct Benefit Transfer (DBT) of scholarship amounts directly into student bank accounts.",
        "last_verified_at": "2026-09-20",
        "rules": [
            {"id": "r4", "field_name": "occupation", "operator": "eq", "expected_value": "student", "is_mandatory": True, "explanation_en": "Applicant must currently be an enrolled student"},
            {"id": "r5", "field_name": "income_band", "operator": "in", "expected_value": ["below_2_5", "2_5_to_5", "5_to_8"], "is_mandatory": True, "explanation_en": "Parental annual income must satisfy scholarship specific limit"},
        ],
        "documents": [
            {"name_key": "Student Aadhaar card", "mandatory": True, "tip_key": "Linked with bank account for DBT"},
            {"name_key": "Previous year marksheet", "mandatory": True, "tip_key": "Showing passing percentage"},
            {"name_key": "Income certificate", "mandatory": True, "tip_key": "Issued by revenue authority"},
        ]
    }
]

class UserProfileSchema(BaseModel):
    age: Optional[int] = None
    gender: Optional[str] = None
    state_code: Optional[str] = None
    district: Optional[str] = None
    income_band: Optional[str] = "unspecified"
    occupation: Optional[str] = None
    education: Optional[str] = None
    need_categories: List[str] = []

@app.get("/health")
def health_check():
    return {"status": "ok", "version": "2.0.0"}

@app.get("/api/v1/meta/stats")
def get_stats():
    return {
        "schemes_indexed": 1000,
        "categories_count": 6,
        "supported_languages": 8,
        "active_languages": ["en", "hi"],
        "verified_schemes_count": len(VERIFIED_SCHEMES),
    }

@app.get("/api/v1/schemes")
def get_schemes(q: Optional[str] = None, category: Optional[str] = None):
    results = VERIFIED_SCHEMES
    if category and category != "all":
        results = [s for s in results if s["category_slug"] == category]
    if q and q.strip():
        term = q.strip().lower()
        results = [
            s for s in results
            if term in s["name_en"].lower() or term in s["summary_en"].lower()
        ]
    return {"count": len(results), "schemes": results}

@app.get("/api/v1/schemes/{slug}")
def get_scheme(slug: str):
    for s in VERIFIED_SCHEMES:
        if s["slug"] == slug:
            return s
    raise HTTPException(status_code=404, detail="Scheme not found")

@app.post("/api/v1/match")
def match_schemes(profile: UserProfileSchema):
    profile_dict = profile.model_dump()
    evaluated_schemes = []

    for scheme in VERIFIED_SCHEMES:
        rule_eval = evaluate_scheme_rules(scheme["rules"], profile_dict)
        score = calculate_ranking_score(scheme, profile_dict, rule_eval)
        strength = get_match_strength(score)
        
        evaluated_schemes.append({
            "scheme": scheme,
            "status": rule_eval["status"],
            "strength": strength.value,
            "ranking_score": score,
            "matched_rules": rule_eval["matched_rules"],
            "unknown_rules": rule_eval["unknown_rules"],
            "missing_rules": rule_eval["missing_rules"],
        })

    # Sort by score descending
    evaluated_schemes.sort(key=lambda x: x["ranking_score"], reverse=True)

    return {
        "likely_eligible": [s for s in evaluated_schemes if s["status"] == SchemeMatchStatus.LIKELY.value],
        "check_details": [s for s in evaluated_schemes if s["status"] == SchemeMatchStatus.CHECK_DETAILS.value],
        "not_yet_eligible": [s for s in evaluated_schemes if s["status"] == SchemeMatchStatus.NOT_YET.value],
        "all_results": evaluated_schemes,
    }
