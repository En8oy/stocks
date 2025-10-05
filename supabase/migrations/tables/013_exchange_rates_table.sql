-- Create exchange_rates table
CREATE TABLE exchange_rates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_currency CHAR(3) NOT NULL,
    target_currency CHAR(3) NOT NULL,
    exchange_rate DECIMAL(10,6) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(source_currency, target_currency)
);

-- Create index
CREATE INDEX idx_exchange_rates_currencies ON exchange_rates(source_currency, target_currency);
