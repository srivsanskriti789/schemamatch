# Security Policy for SchemeMatch

## Reporting Security Issues
If you discover a security vulnerability in SchemeMatch, please report it immediately to `security@schemematch.org`. 
Please do NOT file public GitHub issues for security vulnerabilities.

## Core Security Commitments
1. **Deterministic Rule Engine Only**: Eligibility is evaluated strictly through deterministic server-side rules. Language models never evaluate or decide citizen eligibility.
2. **Zero Aadhaar / Sensitive PII Storage**: SchemeMatch never collects, asks for, or stores Aadhaar numbers, OTPs, biometric data, or bank account credentials. Guest mode is enabled by default.
3. **Official Domain Allowlist**: All outbound official links and source citations are strictly verified against official Indian government domains (`.gov.in`, `.nic.in`) and manually verified portals.
4. **No Document Uploads on Public Checklists**: Document readiness checklists are processed client-side without storing personal user files.
5. **Prompt Injection Defense**: All AI interactions (Mitra) run through structured JSON extractors, schema validation, and URL filtering.
