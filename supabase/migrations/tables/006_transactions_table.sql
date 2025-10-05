-- Create transactions table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    account_id UUID REFERENCES bank_accounts(id) ON DELETE SET NULL,
    investment_id UUID REFERENCES investments(id) ON DELETE SET NULL,
    category_id UUID NOT NULL REFERENCES categories(id),
    type transaction_type NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    currency CHAR(3) DEFAULT 'USD',
    description TEXT,
    transaction_date TIMESTAMPTZ NOT NULL,
    input_method input_method DEFAULT 'manual',
    is_recurring BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_account_or_investment CHECK (
        (account_id IS NOT NULL AND investment_id IS NULL) OR
        (account_id IS NULL AND investment_id IS NOT NULL) OR
        (account_id IS NULL AND investment_id IS NULL)
    )
);

-- Create indexes
CREATE INDEX idx_transactions_user_date ON transactions(user_id, transaction_date);
CREATE INDEX idx_transactions_category ON transactions(category_id);
