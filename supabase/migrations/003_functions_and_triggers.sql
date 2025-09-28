-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, first_name, last_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'last_name', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update bank account balance after transaction
CREATE OR REPLACE FUNCTION update_account_balance()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        IF NEW.account_id IS NOT NULL THEN
            IF NEW.type = 'income' THEN
                UPDATE bank_accounts 
                SET current_balance = current_balance + NEW.amount 
                WHERE id = NEW.account_id;
            ELSIF NEW.type = 'expense' THEN
                UPDATE bank_accounts 
                SET current_balance = current_balance - NEW.amount 
                WHERE id = NEW.account_id;
            END IF;
        END IF;
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.account_id IS NOT NULL AND (OLD.amount != NEW.amount OR OLD.type != NEW.type) THEN
            -- Revert old transaction
            IF OLD.type = 'income' THEN
                UPDATE bank_accounts 
                SET current_balance = current_balance - OLD.amount 
                WHERE id = OLD.account_id;
            ELSIF OLD.type = 'expense' THEN
                UPDATE bank_accounts 
                SET current_balance = current_balance + OLD.amount 
                WHERE id = OLD.account_id;
            END IF;
            
            -- Apply new transaction
            IF NEW.type = 'income' THEN
                UPDATE bank_accounts 
                SET current_balance = current_balance + NEW.amount 
                WHERE id = NEW.account_id;
            ELSIF NEW.type = 'expense' THEN
                UPDATE bank_accounts 
                SET current_balance = current_balance - NEW.amount 
                WHERE id = NEW.account_id;
            END IF;
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        IF OLD.account_id IS NOT NULL THEN
            IF OLD.type = 'income' THEN
                UPDATE bank_accounts 
                SET current_balance = current_balance - OLD.amount 
                WHERE id = OLD.account_id;
            ELSIF OLD.type = 'expense' THEN
                UPDATE bank_accounts 
                SET current_balance = current_balance + OLD.amount 
                WHERE id = OLD.account_id;
            END IF;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update account balance
CREATE TRIGGER update_balance_on_transaction
    AFTER INSERT OR UPDATE OR DELETE ON transactions
    FOR EACH ROW EXECUTE FUNCTION update_account_balance();

-- Function to check budget limits
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

-- Function to get financial summary
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

-- Function to update savings goal progress
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