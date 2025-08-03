-- Function to update user_id based on metadata with validation
CREATE OR REPLACE FUNCTION stripe.update_customer_user_id()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
    user_exists BOOLEAN;
BEGIN
    -- Check if metadata contains userId
    IF NEW.metadata IS NOT NULL AND NEW.metadata ? 'userId' THEN
        -- Validate that the user exists in auth.users
        SELECT EXISTS(
            SELECT 1 FROM auth.users
            WHERE id = (NEW.metadata->>'userId')::uuid
        ) INTO user_exists;

        -- Only assign if the user exists
        IF user_exists THEN
            NEW.user_id := (NEW.metadata->>'userId')::uuid;
        END IF;
    END IF;

    RETURN NEW;
END;
$$;

-- Create the trigger that executes the function BEFORE INSERT
CREATE TRIGGER trigger_update_customer_user_id
    BEFORE INSERT ON stripe.customers
    FOR EACH ROW
    EXECUTE FUNCTION stripe.update_customer_user_id();
