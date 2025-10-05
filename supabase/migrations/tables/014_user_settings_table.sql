-- Create user_settings table for app configuration
CREATE TABLE user_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,

    -- Language & Region
    language CHAR(2) DEFAULT 'es',
    timezone TEXT DEFAULT 'America/Mexico_City',
    date_format TEXT DEFAULT 'DD/MM/YYYY',
    time_format TEXT DEFAULT '24h',
    first_day_of_week INTEGER DEFAULT 1,

    -- Currency & Number Format
    default_currency CHAR(3) DEFAULT 'MXN',
    currency_display TEXT DEFAULT 'symbol',
    decimal_places INTEGER DEFAULT 2,
    thousand_separator TEXT DEFAULT ',',
    decimal_separator TEXT DEFAULT '.',

    -- Theme & Appearance
    theme TEXT DEFAULT 'system',
    color_scheme TEXT DEFAULT 'blue',
    font_size TEXT DEFAULT 'medium',
    compact_mode BOOLEAN DEFAULT FALSE,
    show_animations BOOLEAN DEFAULT TRUE,

    -- Dashboard & Layout
    dashboard_layout TEXT DEFAULT 'default',
    show_balance_on_startup BOOLEAN DEFAULT TRUE,
    hide_sensitive_data BOOLEAN DEFAULT FALSE,
    default_dashboard_period TEXT DEFAULT 'month',

    -- Notifications
    push_notifications BOOLEAN DEFAULT TRUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    budget_alerts BOOLEAN DEFAULT TRUE,
    transaction_alerts BOOLEAN DEFAULT FALSE,
    weekly_summary BOOLEAN DEFAULT TRUE,
    monthly_summary BOOLEAN DEFAULT TRUE,
    low_balance_alerts BOOLEAN DEFAULT TRUE,
    unusual_spending_alerts BOOLEAN DEFAULT TRUE,

    -- Transaction Defaults
    default_transaction_type transaction_type DEFAULT 'expense',
    auto_categorize BOOLEAN DEFAULT TRUE,
    require_description BOOLEAN DEFAULT FALSE,
    default_account_id UUID REFERENCES bank_accounts(id),

    -- Security & Privacy
    require_auth_for_app BOOLEAN DEFAULT FALSE,
    auto_lock_timeout INTEGER DEFAULT 300,
    biometric_auth BOOLEAN DEFAULT FALSE,
    pin_auth BOOLEAN DEFAULT FALSE,
    session_timeout INTEGER DEFAULT 1800,

    -- Data & Backup
    auto_backup BOOLEAN DEFAULT TRUE,
    backup_frequency TEXT DEFAULT 'weekly',
    include_attachments_backup BOOLEAN DEFAULT TRUE,
    data_retention_days INTEGER DEFAULT 365,

    -- Voice & AI Features
    voice_recognition BOOLEAN DEFAULT FALSE,
    voice_language CHAR(2) DEFAULT 'es',
    auto_transcribe_voice BOOLEAN DEFAULT TRUE,
    ai_categorization BOOLEAN DEFAULT TRUE,
    smart_suggestions BOOLEAN DEFAULT TRUE,

    -- Social Media Integration
    whatsapp_integration BOOLEAN DEFAULT FALSE,
    telegram_integration BOOLEAN DEFAULT FALSE,
    auto_process_messages BOOLEAN DEFAULT FALSE,

    -- Export & Reports
    default_export_format TEXT DEFAULT 'pdf',
    include_charts_export BOOLEAN DEFAULT TRUE,
    default_report_period TEXT DEFAULT 'month',

    -- Performance
    cache_enabled BOOLEAN DEFAULT TRUE,
    offline_mode BOOLEAN DEFAULT TRUE,
    sync_frequency TEXT DEFAULT 'real_time',

    -- Accessibility
    high_contrast BOOLEAN DEFAULT FALSE,
    large_text BOOLEAN DEFAULT FALSE,
    screen_reader_support BOOLEAN DEFAULT FALSE,
    reduce_motion BOOLEAN DEFAULT FALSE,

    -- Advanced Features
    developer_mode BOOLEAN DEFAULT FALSE,
    beta_features BOOLEAN DEFAULT FALSE,
    analytics_enabled BOOLEAN DEFAULT TRUE,
    crash_reporting BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index
CREATE INDEX idx_user_settings_user_id ON user_settings(user_id);
