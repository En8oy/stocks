-- ==========================================
-- TABLE: users
-- Description: User profiles linked to auth.users
-- Related to: auth.users (Supabase Auth)
-- ==========================================

-- ==========================================
-- 1. CREATE CUSTOM TYPES
-- ==========================================
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('client', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE subscription_tier AS ENUM ('free', 'starter', 'pro', 'enterprise');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE auth_provider AS ENUM ('email', 'google', 'facebook');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE investment_experience AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE risk_tolerance AS ENUM ('low', 'medium', 'high');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==========================================
-- 2. CREATE TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS users (
    -- Primary Key (linked to auth.users)
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

    -- Basic Info
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    bio TEXT,
    country TEXT,

    -- Auth & Account
    role user_role DEFAULT 'client' NOT NULL,
    subscription_tier subscription_tier DEFAULT 'free' NOT NULL,
    provider auth_provider DEFAULT 'email' NOT NULL,
    provider_id TEXT,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE NOT NULL,
    onboarding_completed BOOLEAN DEFAULT FALSE NOT NULL,

    -- Preferences
    language_setting TEXT DEFAULT 'en',
    timezone TEXT DEFAULT 'UTC',
    preferred_currency CHAR(3) DEFAULT 'USD',

    -- Trading Profile
    investment_experience investment_experience,
    risk_tolerance risk_tolerance,

    -- Timestamps
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==========================================
-- 3. CREATE INDEXES
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider, provider_id);
CREATE INDEX IF NOT EXISTS idx_users_subscription ON users(subscription_tier);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_active ON users(is_active);

-- ==========================================
-- 4. ENABLE ROW LEVEL SECURITY
-- ==========================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 5. DROP OLD POLICIES (if exist)
-- ==========================================
DROP POLICY IF EXISTS "users_select_own" ON users;
DROP POLICY IF EXISTS "users_update_own" ON users;
DROP POLICY IF EXISTS "users_insert_own" ON users;
DROP POLICY IF EXISTS "admins_select_all" ON users;
DROP POLICY IF EXISTS "admins_update_all" ON users;

-- ==========================================
-- 6. CREATE RLS POLICIES
-- ==========================================

-- Policy: Users can view their own profile
CREATE POLICY "users_select_own"
    ON users
    FOR SELECT
    USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "users_update_own"
    ON users
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "users_insert_own"
    ON users
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Policy: Admins can view all profiles
CREATE POLICY "admins_select_all"
    ON users
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.role = 'admin'
        )
    );

-- Policy: Admins can update all profiles
CREATE POLICY "admins_update_all"
    ON users
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.role = 'admin'
        )
    );

-- ==========================================
-- 7. CREATE FUNCTIONS
-- ==========================================

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

-- Function: Handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    v_provider TEXT := 'email';
    v_avatar_url TEXT;
    v_first_name TEXT;
    v_last_name TEXT;
BEGIN
    -- Get avatar from metadata
    v_avatar_url := COALESCE(
        NEW.raw_user_meta_data->>'avatar_url',
        NEW.raw_user_meta_data->>'picture'
    );

    -- Get first name with fallback
    v_first_name := COALESCE(
        NULLIF(TRIM(NEW.raw_user_meta_data->>'first_name'), ''),
        NULLIF(TRIM(NEW.raw_user_meta_data->>'given_name'), ''),
        'User'
    );

    -- Get last name (can be empty)
    v_last_name := COALESCE(
        NULLIF(TRIM(NEW.raw_user_meta_data->>'last_name'), ''),
        NULLIF(TRIM(NEW.raw_user_meta_data->>'family_name'), '')
    );

    -- Determine provider from available data
    IF v_avatar_url IS NOT NULL AND v_avatar_url LIKE '%googleusercontent.com%' THEN
        v_provider := 'google';
    ELSIF v_avatar_url IS NOT NULL AND v_avatar_url LIKE '%facebook.com%' THEN
        v_provider := 'facebook';
    ELSIF NEW.raw_user_meta_data->>'provider' IS NOT NULL THEN
        v_provider := NEW.raw_user_meta_data->>'provider';
    END IF;

    -- Insert user profile
    INSERT INTO public.users (
        id,
        email,
        first_name,
        last_name,
        avatar_url,
        provider,
        email_verified
    ) VALUES (
        NEW.id,
        NEW.email,
        v_first_name,
        v_last_name,
        v_avatar_url,
        v_provider::auth_provider,
        (NEW.email_confirmed_at IS NOT NULL)
    );

    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE LOG 'Error in handle_new_user for user %: %', NEW.id, SQLERRM;
        RAISE;
END;
$$;

-- ==========================================
-- 8. CREATE TRIGGERS
-- ==========================================

-- Drop old triggers first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS update_users_updated_at ON users;

-- Trigger: Auto-create user profile on auth signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Trigger: Auto-update updated_at on row update
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- 9. ADD COMMENTS
-- ==========================================
COMMENT ON TABLE users IS 'User profiles linked to Supabase auth.users';
COMMENT ON COLUMN users.id IS 'Primary key, references auth.users(id)';
COMMENT ON COLUMN users.provider IS 'Authentication provider (email, google, facebook)';
COMMENT ON COLUMN users.subscription_tier IS 'User subscription level';
COMMENT ON COLUMN users.role IS 'User role (client or admin)';

-- ==========================================
-- 10. VERIFICATION
-- ==========================================
DO $$
DECLARE
    v_table_exists BOOLEAN;
    v_trigger_exists BOOLEAN;
    v_rls_enabled BOOLEAN;
BEGIN
    -- Check table
    SELECT EXISTS (
        SELECT 1 FROM pg_tables
        WHERE tablename = 'users' AND schemaname = 'public'
    ) INTO v_table_exists;

    -- Check trigger
    SELECT EXISTS (
        SELECT 1 FROM pg_trigger
        WHERE tgname = 'on_auth_user_created'
    ) INTO v_trigger_exists;

    -- Check RLS
    SELECT relrowsecurity FROM pg_class
    WHERE relname = 'users'
    INTO v_rls_enabled;

    -- Report results
    IF v_table_exists THEN
        RAISE NOTICE '✅ Table "users" created successfully';
    ELSE
        RAISE EXCEPTION '❌ Table "users" was not created';
    END IF;

    IF v_trigger_exists THEN
        RAISE NOTICE '✅ Trigger "on_auth_user_created" created successfully';
    ELSE
        RAISE EXCEPTION '❌ Trigger "on_auth_user_created" was not created';
    END IF;

    IF v_rls_enabled THEN
        RAISE NOTICE '✅ Row Level Security enabled';
    ELSE
        RAISE WARNING '⚠️ Row Level Security not enabled';
    END IF;

    RAISE NOTICE '🎉 User table setup complete!';
END $$;
