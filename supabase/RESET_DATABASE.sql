-- ==========================================
-- COMPLETE DATABASE RESET
-- ==========================================
-- WARNING: This will delete ALL data and tables
-- Execute this in Supabase SQL Editor
-- ==========================================

-- 1. DROP ALL TRIGGERS
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS update_balance_on_transaction ON transactions;

-- 2. DROP ALL FUNCTIONS
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS update_account_balance() CASCADE;
DROP FUNCTION IF EXISTS check_budget_exceeded(UUID, UUID, DECIMAL) CASCADE;
DROP FUNCTION IF EXISTS get_financial_summary(UUID, DATE, DATE) CASCADE;
DROP FUNCTION IF EXISTS update_savings_goal_progress(UUID) CASCADE;

-- 3. DROP ALL TABLES (in reverse dependency order)
DROP TABLE IF EXISTS social_media_records CASCADE;
DROP TABLE IF EXISTS voice_records CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS alerts CASCADE;
DROP TABLE IF EXISTS savings_goals CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS budgets CASCADE;
DROP TABLE IF EXISTS investments CASCADE;
DROP TABLE IF EXISTS bank_accounts CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS exchange_rates CASCADE;
DROP TABLE IF EXISTS user_settings CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 4. DROP ALL CUSTOM TYPES
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS subscription_tier CASCADE;
DROP TYPE IF EXISTS auth_provider CASCADE;
DROP TYPE IF EXISTS investment_experience CASCADE;
DROP TYPE IF EXISTS risk_tolerance CASCADE;
DROP TYPE IF EXISTS account_type CASCADE;
DROP TYPE IF EXISTS transaction_type CASCADE;
DROP TYPE IF EXISTS transaction_status CASCADE;
DROP TYPE IF EXISTS investment_type CASCADE;
DROP TYPE IF EXISTS investment_status CASCADE;
DROP TYPE IF EXISTS category_type CASCADE;
DROP TYPE IF EXISTS budget_period CASCADE;
DROP TYPE IF EXISTS alert_type CASCADE;
DROP TYPE IF EXISTS alert_frequency CASCADE;
DROP TYPE IF EXISTS notification_type CASCADE;
DROP TYPE IF EXISTS notification_status CASCADE;
DROP TYPE IF EXISTS voice_command_type CASCADE;
DROP TYPE IF EXISTS social_platform CASCADE;

-- 5. DROP ALL RLS POLICIES (will be recreated with tables)
-- RLS policies are automatically dropped with tables

-- ==========================================
-- VERIFICATION: Check all is clean
-- ==========================================
SELECT
    'Tables remaining: ' || COUNT(*)::text as status
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name NOT IN ('schema_migrations');

SELECT
    'Custom types remaining: ' || COUNT(*)::text as status
FROM pg_type
WHERE typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
AND typtype = 'e';

-- ==========================================
-- SUCCESS MESSAGE
-- ==========================================
SELECT 'Database reset complete! Ready for fresh migrations.' as message;
