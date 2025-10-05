-- Create users profile table (extends Supabase auth.users)
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

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_provider ON users(provider, provider_id);
CREATE INDEX idx_users_subscription ON users(subscription_tier);
