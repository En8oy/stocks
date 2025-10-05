-- ==========================================
-- INITIAL DATABASE SETUP - MINIMAL AUTH
-- ==========================================
-- Execute this AFTER running RESET_DATABASE.sql
-- This creates only essential tables for authentication
-- ==========================================

-- ==========================================
-- 1. CREATE CUSTOM TYPES (only auth-related)
-- ==========================================

CREATE TYPE user_role AS ENUM ('client', 'admin');
CREATE TYPE subscription_tier AS ENUM ('free', 'starter', 'pro', 'enterprise');
CREATE TYPE auth_provider AS ENUM ('email', 'google', 'facebook');
CREATE TYPE investment_experience AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
CREATE TYPE risk_tolerance AS ENUM ('low', 'medium', 'high');

-- ==========================================
-- 2. CREATE USERS TABLE
-- ==========================================

CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    bio TEXT,
    country TEXT,

    -- Auth & Account
    role user_role DEFAULT 'client',
    subscription_tier subscription_tier DEFAULT 'free',
    provider auth_provider DEFAULT 'email',
    provider_id TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    onboarding_completed BOOLEAN DEFAULT FALSE,

    -- Preferences
    language_setting TEXT DEFAULT 'en',
    timezone TEXT DEFAULT 'UTC',
    preferred_currency CHAR(3) DEFAULT 'USD',

    -- Trading Profile
    investment_experience investment_experience,
    risk_tolerance risk_tolerance,

    -- Timestamps
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for users table
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_provider ON users(provider, provider_id);
CREATE INDEX idx_users_subscription ON users(subscription_tier);

-- ==========================================
-- 3. ENABLE ROW LEVEL SECURITY
-- ==========================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 4. CREATE RLS POLICIES FOR USERS
-- ==========================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
    ON users
    FOR SELECT
    USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON users
    FOR UPDATE
    USING (auth.uid() = id);

-- Users can insert their own profile (for manual creation)
CREATE POLICY "Users can insert own profile"
    ON users
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
    ON users
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.role = 'admin'
        )
    );

-- ==========================================
-- 5. CREATE AUTH FUNCTION AND TRIGGER
-- ==========================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    v_provider TEXT;
    v_avatar_url TEXT;
BEGIN
    -- Determine the auth provider
    v_provider := CASE
        WHEN NEW.app_metadata->>'provider' = 'google' THEN 'google'
        WHEN NEW.app_metadata->>'provider' = 'facebook' THEN 'facebook'
        ELSE 'email'
    END;

    -- Get avatar URL from OAuth providers
    v_avatar_url := COALESCE(
        NEW.raw_user_meta_data->>'avatar_url',
        NEW.raw_user_meta_data->>'picture'
    );

    -- Insert user with proper null handling
    INSERT INTO public.users (
        id,
        email,
        first_name,
        last_name,
        avatar_url,
        provider,
        provider_id,
        email_verified
    )
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(
            NULLIF(NEW.raw_user_meta_data->>'first_name', ''),
            NULLIF(NEW.raw_user_meta_data->>'given_name', ''),
            'User'
        ),
        COALESCE(
            NULLIF(NEW.raw_user_meta_data->>'last_name', ''),
            NULLIF(NEW.raw_user_meta_data->>'family_name', '')
        ),
        v_avatar_url,
        v_provider::auth_provider,
        NEW.app_metadata->>'provider_id',
        COALESCE(NEW.email_confirmed_at IS NOT NULL, false)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic user profile creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- 6. CREATE UPDATED_AT TRIGGER
-- ==========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- VERIFICATION
-- ==========================================

-- Check tables
SELECT
    schemaname,
    tablename,
    tableowner
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Check triggers
SELECT
    tgname as trigger_name,
    tgrelid::regclass as table_name,
    tgenabled as enabled
FROM pg_trigger
WHERE tgrelid::regclass::text LIKE 'users'
   OR tgrelid::regclass::text LIKE 'auth.users';

-- SUCCESS
SELECT '✅ Initial database setup complete! You can now register users.' as status;
