-- Function to check if budget limits are exceeded
CREATE OR REPLACE FUNCTION check_budget_exceeded(p_user_id UUID, p_category_id UUID, p_amount DECIMAL)
RETURNS TABLE (
    budget_id UUID,
    limit_amount DECIMAL,
    spent_amount DECIMAL,
    percentage_used DECIMAL,
    is_exceeded BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        b.id,
        b.limit_amount,
        COALESCE(SUM(t.amount), 0) + p_amount as spent_amount,
        ((COALESCE(SUM(t.amount), 0) + p_amount) / b.limit_amount * 100) as percentage_used,
        ((COALESCE(SUM(t.amount), 0) + p_amount) > b.limit_amount) as is_exceeded
    FROM budgets b
    LEFT JOIN transactions t ON t.category_id = b.category_id
        AND t.user_id = b.user_id
        AND t.type = 'expense'
        AND t.transaction_date >= b.start_date
        AND (b.end_date IS NULL OR t.transaction_date <= b.end_date)
    WHERE b.user_id = p_user_id
        AND b.category_id = p_category_id
        AND b.is_active = true
    GROUP BY b.id;
END;
$$ LANGUAGE plpgsql;
