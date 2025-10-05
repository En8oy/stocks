-- Function to update savings goal progress based on account balance
CREATE OR REPLACE FUNCTION update_savings_goal_progress(p_goal_id UUID)
RETURNS void AS $$
DECLARE
    v_account_balance DECIMAL;
BEGIN
    SELECT current_balance INTO v_account_balance
    FROM bank_accounts ba
    JOIN savings_goals sg ON sg.account_id = ba.id
    WHERE sg.id = p_goal_id;

    IF v_account_balance IS NOT NULL THEN
        UPDATE savings_goals
        SET current_amount = v_account_balance
        WHERE id = p_goal_id;
    END IF;
END;
$$ LANGUAGE plpgsql;
