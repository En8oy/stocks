-- Create bank_accounts table
CREATE TABLE bank_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    account_name TEXT NOT NULL,
    bank_name TEXT NOT NULL,
    account_type account_type NOT NULL,
    currency CHAR(3) DEFAULT 'USD',
    current_balance DECIMAL(15,2) DEFAULT 0,
    is_foreign BOOLEAN DEFAULT FALSE,
    country TEXT,
    opening_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index
CREATE INDEX idx_bank_accounts_user ON bank_accounts(user_id);
