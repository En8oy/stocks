-- Create user_settings table for app configuration
CREATE TABLE user_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    
    -- Language & Region
    language CHAR(2) DEFAULT 'es',
    timezone TEXT DEFAULT 'America/Mexico_City',
    date_format TEXT DEFAULT 'DD/MM/YYYY', -- DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD
    time_format TEXT DEFAULT '24h', -- 12h, 24h
    first_day_of_week INTEGER DEFAULT 1, -- 0=Sunday, 1=Monday
    
    -- Currency & Number Format
    default_currency CHAR(3) DEFAULT 'MXN',
    currency_display TEXT DEFAULT 'symbol', -- symbol, code, name
    decimal_places INTEGER DEFAULT 2,
    thousand_separator TEXT DEFAULT ',',
    decimal_separator TEXT DEFAULT '.',
    
    -- Theme & Appearance
    theme TEXT DEFAULT 'system', -- light, dark, system
    color_scheme TEXT DEFAULT 'blue', -- blue, green, purple, orange, red
    font_size TEXT DEFAULT 'medium', -- small, medium, large
    compact_mode BOOLEAN DEFAULT FALSE,
    show_animations BOOLEAN DEFAULT TRUE,
    
    -- Dashboard & Layout
    dashboard_layout TEXT DEFAULT 'default', -- default, compact, detailed
    show_balance_on_startup BOOLEAN DEFAULT TRUE,
    hide_sensitive_data BOOLEAN DEFAULT FALSE,
    default_dashboard_period TEXT DEFAULT 'month', -- week, month, quarter, year
    
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
    auto_lock_timeout INTEGER DEFAULT 300, -- seconds (5 minutes)
    biometric_auth BOOLEAN DEFAULT FALSE,
    pin_auth BOOLEAN DEFAULT FALSE,
    session_timeout INTEGER DEFAULT 1800, -- seconds (30 minutes)
    
    -- Data & Backup
    auto_backup BOOLEAN DEFAULT TRUE,
    backup_frequency TEXT DEFAULT 'weekly', -- daily, weekly, monthly
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
    default_export_format TEXT DEFAULT 'pdf', -- pdf, excel, csv
    include_charts_export BOOLEAN DEFAULT TRUE,
    default_report_period TEXT DEFAULT 'month',
    
    -- Performance
    cache_enabled BOOLEAN DEFAULT TRUE,
    offline_mode BOOLEAN DEFAULT TRUE,
    sync_frequency TEXT DEFAULT 'real_time', -- real_time, hourly, daily, manual
    
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

-- Create index for performance
CREATE INDEX idx_user_settings_user_id ON user_settings(user_id);

-- Function to create default settings for new users
CREATE OR REPLACE FUNCTION create_default_user_settings()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_settings (user_id, language, timezone, default_currency)
    VALUES (
        NEW.id,
        COALESCE(NEW.language_setting, 'es'),
        COALESCE(NEW.timezone, 'America/Mexico_City'),
        'MXN'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create default settings when user is created
CREATE TRIGGER create_user_settings_on_signup
    AFTER INSERT ON users
    FOR EACH ROW EXECUTE FUNCTION create_default_user_settings();

-- Function to get user settings with fallbacks
CREATE OR REPLACE FUNCTION get_user_settings(p_user_id UUID)
RETURNS TABLE (
    language CHAR(2),
    timezone TEXT,
    theme TEXT,
    default_currency CHAR(3),
    push_notifications BOOLEAN,
    settings_json JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(us.language, 'es'),
        COALESCE(us.timezone, 'UTC'),
        COALESCE(us.theme, 'system'),
        COALESCE(us.default_currency, 'USD'),
        COALESCE(us.push_notifications, true),
        to_jsonb(us.*) - 'id' - 'user_id' - 'created_at' - 'updated_at' as settings_json
    FROM user_settings us
    WHERE us.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- RLS Policies
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own settings" ON user_settings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings" ON user_settings
    FOR UPDATE USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER set_timestamp_user_settings 
    BEFORE UPDATE ON user_settings 
    FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();