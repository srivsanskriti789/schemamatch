# SchemeMatch

> **Discover. Verify. Prepare. Apply.**  
> An independent, plain-language assistance platform helping Indian citizens discover welfare schemes, understand eligibility, prepare documents, and apply on official government portals.

Based on **SchemeMatch Final TRD Spec v2.0** and the **ppt_proj.pdf** design template.

---

## Key Features

1. **Strictly Grounded in Design Template**:
   - Exact color tokens, typography, and section flow matching `ppt proj.pdf`.
   - Dark Navy Hero with concentric rings decoration and family preview card.
   - Four calm steps: **01 Discover**, **02 Verify**, **03 Prepare**, **04 Apply**.
   - Categories grid with live scheme counts.
   - Live **Question 4 of 7** preview in the Personalized section.
   - **Mitra AI** conversational assistant with verified scheme citations.
   - **Document Readiness Checklist** with zero file uploads and client-side privacy.
   - Featured schemes with official source badges and last-checked timestamps.
   - Social proof, testimonials, and 6-question FAQ accordion.
   - Vibrant terracotta/orange CTA band and comprehensive footer.

2. **Deterministic Rule Engine (TRD Section 12)**:
   - Evaluates citizen eligibility strictly through mathematical and logical rules (`eq`, `gte`, `lte`, `in`, `between`, logical groups).
   - Classifies matches into **Likely eligible**, **Check one detail**, and **Not yet eligible**.
   - Missing or skipped optional answers evaluate to `UNKNOWN` (never a disqualifying `FAIL`).
   - LLMs never decide eligibility.

3. **Privacy First & DPDP Compliance**:
   - Default guest mode: answers live purely in the client's browser session.
   - Zero collection of Aadhaar numbers, OTPs, or bank credentials.
   - Document checklist is interactive without any file uploads.

4. **Bilingual (English & Hindi)**:
   - Instant language switching across all pages and components.

---

## Project Structure

```
schemematch/
├── frontend/                     # Next.js (App Router), TypeScript, Tailwind CSS
│   ├── app/
│   │   ├── page.tsx              # Landing page matching ppt_proj.pdf
│   │   ├── check/                # 7-question eligibility wizard
│   │   ├── results/              # Categorized match results
│   │   ├── schemes/              # Directory with search & filters
│   │   │   └── [slug]/           # Comprehensive scheme details
│   │   ├── checklist/[slug]/     # Interactive document checklist
│   │   ├── mitra/                # Full AI assistant chat
│   │   ├── about/                # About & mission
│   │   ├── privacy/              # Privacy & DPDP compliance
│   │   ├── methodology/          # Verification methodology
│   │   └── help/                 # Help & support centre
│   ├── components/               # Modular landing and layout components
│   ├── lib/
│   │   ├── types.ts              # Data and rule engine types
│   │   ├── data.ts               # Verified schemes and category catalog
│   │   ├── rule-engine.ts        # Client-side deterministic rule engine
│   │   └── i18n.tsx              # English & Hindi language provider
│   └── styles/tokens.css         # Design tokens from TRD Section 5
├── backend/                      # Python FastAPI backend
│   ├── app/
│   │   ├── main.py               # REST API endpoints (/api/v1)
│   │   └── rules/                # Python rule engine & operators
│   └── tests/
│       └── test_rules.py         # Full rule engine unit tests
├── database/                     # MySQL schema & verified CSV seeds
│   ├── schema.sql
│   └── seed/
├── SECURITY.md                   # Security guidelines & zero-PII policy
└── README.md
```

---

## Running Locally

### Frontend (Next.js)
```bash
cd frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend (FastAPI)
```bash
cd backend
python -m uvicorn app.main:app --reload --port 8000
```
API runs on [http://localhost:8000](http://localhost:8000).

### Running Tests
```bash
cd backend
python -m tests.test_rules
```
