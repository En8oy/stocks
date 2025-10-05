-- ==========================================
-- FEATURE: BANK ACCOUNTS
-- ==========================================
-- Execute this when you need bank accounts functionality
-- ==========================================

-- 1. CREATE TYPES
CREATE TYPE account_type AS ENUM ('checking', 'savings', 'credit_card', 'investment', 'cash');

-- 2. CREATE TABLE
CREATE TABLE bank_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    account_name TEXT NOT NULL,
    account_type account_type NOT NULL,
    account_number TEXT,
    bank_name TEXT,
    currency CHAR(3) DEFAULT 'USD',
    initial_balance DECIMAL(15,2) DEFAULT 0,
    current_balance DECIMAL(15,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CREATE INDEXES
CREATE INDEX idx_bank_accounts_user ON bank_accounts(user_id);
CREATE INDEX idx_bank_accounts_active ON bank_accounts(user_id, is_active);

-- 4. ENABLE RLS
ALTER TABLE bank_accounts ENABLE ROW LEVEL SECURITY;

-- 5. CREATE RLS POLICIES
CREATE POLICY "Users can view own bank accounts"
    ON bank_accounts FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bank accounts"
    ON bank_accounts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bank accounts"
    ON bank_accounts FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bank accounts"
    ON bank_accounts FOR DELETE
    USING (auth.uid() = user_id);

-- 6. CREATE TRIGGER FOR UPDATED_AT
CREATE TRIGGER update_bank_accounts_updated_at
    BEFORE UPDATE ON bank_accounts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- VERIFICATION
SELECT '✅ Bank Accounts feature installed successfully!' as status;
