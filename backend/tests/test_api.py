"""
API endpoint integration tests for SchemeMatch FastAPI backend.
"""
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json()["status"] == "ok"

def test_meta_stats():
    res = client.get("/api/v1/meta/stats")
    assert res.status_code == 200
    data = res.json()
    assert data["verified_schemes_count"] == 7
    assert "en" in data["active_languages"]
    assert "hi" in data["active_languages"]

def test_get_schemes_all():
    res = client.get("/api/v1/schemes")
    assert res.status_code == 200
    data = res.json()
    assert data["count"] == 7
    assert len(data["schemes"]) == 7

def test_get_schemes_filtered():
    res = client.get("/api/v1/schemes?category=education-scholarships")
    assert res.status_code == 200
    data = res.json()
    assert data["count"] == 2
    slugs = [s["slug"] for s in data["schemes"]]
    assert "national-scholarship-portal" in slugs
    assert "pm-scholarship-scheme" in slugs

def test_get_single_scheme():
    res = client.get("/api/v1/schemes/pm-vishwakarma")
    assert res.status_code == 200
    assert res.json()["name_en"] == "PM Vishwakarma"

def test_match_schemes_student():
    res = client.post("/api/v1/match", json={
        "occupation": "student",
        "education": "graduate",
        "income_band": "below_2_5"
    })
    assert res.status_code == 200
    data = res.json()
    likely_slugs = [s["scheme"]["slug"] for s in data["likely_eligible"]]
    assert "national-scholarship-portal" in likely_slugs
    assert "pm-scholarship-scheme" in likely_slugs

def test_match_schemes_farmer():
    res = client.post("/api/v1/match", json={
        "occupation": "farmer"
    })
    assert res.status_code == 200
    data = res.json()
    likely_slugs = [s["scheme"]["slug"] for s in data["likely_eligible"]]
    assert "pm-kisan-samman-nidhi" in likely_slugs

if __name__ == "__main__":
    test_health()
    test_meta_stats()
    test_get_schemes_all()
    test_get_schemes_filtered()
    test_get_single_scheme()
    test_match_schemes_student()
    test_match_schemes_farmer()
    print("All API integration tests passed successfully!")
