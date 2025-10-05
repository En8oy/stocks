-- Function to get financial summary for a user
CREATE OR REPLACE FUNCTION get_financial_summary(
    p_user_id UUID,
    p_start_date DATE DEFAULT NULL,
    p_end_date DATE DEFAULT NULL
)
RETURNS TABLE (
    total_income DECIMAL,
    total_expenses DECIMAL,
    net_savings DECIMAL,
    total_balance DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COALESCE(SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END), 0) as total_income,
        COALESCE(SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END), 0) as total_expenses,
        COALESCE(SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE -t.amount END), 0) as net_savings,
        COALESCE(SUM(ba.current_balance), 0) as total_balance
    FROM users u
    LEFT JOIN transactions t ON t.user_id = u.id
        AND (p_start_date IS NULL OR t.transaction_date >= p_start_date)
        AND (p_end_date IS NULL OR t.transaction_date <= p_end_date)
    LEFT JOIN bank_accounts ba ON ba.user_id = u.id AND ba.is_active = true
    WHERE u.id = p_user_id
    GROUP BY u.id;
END;
$$ LANGUAGE plpgsql;
