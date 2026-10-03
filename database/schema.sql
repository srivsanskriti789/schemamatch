-- SchemeMatch Database Schema (MySQL 8 / utf8mb4)
-- Version 2.0 per TRD Spec

CREATE DATABASE IF NOT EXISTS schemematch CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE schemematch;

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(64) NOT NULL UNIQUE,
    name_en VARCHAR(128) NOT NULL,
    name_hi VARCHAR(128) NOT NULL,
    icon VARCHAR(64) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS schemes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(128) NOT NULL UNIQUE,
    category_id INT NOT NULL,
    level ENUM('central', 'state') NOT NULL DEFAULT 'central',
    state_code VARCHAR(8) NULL,
    status ENUM('ACTIVE', 'VERIFICATION_REQUIRED', 'OUTDATED', 'PAUSED', 'DISCONTINUED', 'MERGED') NOT NULL DEFAULT 'VERIFICATION_REQUIRED',
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    badge ENUM('popular', 'high_impact', 'new', 'none') NOT NULL DEFAULT 'none',
    official_url VARCHAR(512) NOT NULL,
    apply_url VARCHAR(512) NOT NULL,
    source_url VARCHAR(512) NOT NULL,
    source_type VARCHAR(64) NOT NULL DEFAULT 'official_portal',
    last_verified_at DATETIME NULL,
    verified_by VARCHAR(128) NULL,
    official_domain_checked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_category (category_id),
    INDEX idx_status (status),
    INDEX idx_state (state_code),
    CONSTRAINT fk_schemes_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS scheme_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scheme_id INT NOT NULL,
    locale VARCHAR(8) NOT NULL,
    name VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    benefits TEXT NOT NULL,
    apply_steps JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_scheme_locale (scheme_id, locale),
    CONSTRAINT fk_translations_scheme FOREIGN KEY (scheme_id) REFERENCES schemes (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS eligibility_rules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scheme_id INT NOT NULL,
    field_name VARCHAR(64) NOT NULL,
    operator ENUM('eq', 'ne', 'gte', 'lte', 'in', 'not_in', 'between') NOT NULL,
    expected_value JSON NOT NULL,
    data_type VARCHAR(32) NOT NULL,
    is_mandatory BOOLEAN NOT NULL DEFAULT TRUE,
    logical_group VARCHAR(32) NULL,
    explanation_en TEXT NOT NULL,
    explanation_hi TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_rule_scheme (scheme_id),
    CONSTRAINT fk_rules_scheme FOREIGN KEY (scheme_id) REFERENCES schemes (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS scheme_documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scheme_id INT NOT NULL,
    name_key VARCHAR(128) NOT NULL,
    mandatory BOOLEAN NOT NULL DEFAULT TRUE,
    condition_json JSON NULL,
    tip_key VARCHAR(255) NULL,
    alternatives_json JSON NULL,
    last_verified_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_doc_scheme (scheme_id),
    CONSTRAINT fk_docs_scheme FOREIGN KEY (scheme_id) REFERENCES schemes (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS verification_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scheme_id INT NOT NULL,
    checked_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    checked_by VARCHAR(128) NOT NULL,
    source_url VARCHAR(512) NOT NULL,
    result VARCHAR(64) NOT NULL,
    notes TEXT NULL,
    CONSTRAINT fk_verif_scheme FOREIGN KEY (scheme_id) REFERENCES schemes (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('editor', 'verifier', 'superadmin') NOT NULL DEFAULT 'editor',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    failed_attempts INT NOT NULL DEFAULT 0,
    locked_until DATETIME NULL,
    last_login_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NULL,
    action VARCHAR(64) NOT NULL,
    table_name VARCHAR(64) NOT NULL,
    record_id INT NOT NULL,
    old_value JSON NULL,
    new_value JSON NULL,
    ip_hash VARCHAR(128) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page VARCHAR(128) NOT NULL,
    helpful BOOLEAN NOT NULL,
    comment VARCHAR(300) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
