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

-- Trigger to update account balance on transaction changes
CREATE TRIGGER update_balance_on_transaction
    AFTER INSERT OR UPDATE OR DELETE ON transactions
    FOR EACH ROW EXECUTE FUNCTION update_account_balance();
