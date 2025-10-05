-- Create investments table
CREATE TABLE investments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    investment_type investment_type NOT NULL,
    name TEXT NOT NULL,
    symbol TEXT,
    quantity DECIMAL(15,8) NOT NULL,
    purchase_price DECIMAL(15,2),
    current_price DECIMAL(15,2),
    currency CHAR(3) DEFAULT 'USD',
    purchase_date DATE,
    platform TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index
CREATE INDEX idx_investments_user ON investments(user_id);
