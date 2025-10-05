-- ==========================================
-- FIX: User Creation Trigger
-- ==========================================
-- Copy and paste this ENTIRE script into Supabase SQL Editor
-- ==========================================

-- Step 1: Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Step 2: Create the fixed function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    v_provider TEXT;
    v_avatar_url TEXT;
    v_first_name TEXT;
    v_last_name TEXT;
BEGIN
    -- Get provider
    v_provider := COALESCE(NEW.app_metadata->>'provider', 'email');

    -- Get avatar
    v_avatar_url := COALESCE(
        NEW.raw_user_meta_data->>'avatar_url',
        NEW.raw_user_meta_data->>'picture'
    );

    -- Get first name (with proper handling)
    v_first_name := COALESCE(
        NULLIF(TRIM(NEW.raw_user_meta_data->>'first_name'), ''),
        NULLIF(TRIM(NEW.raw_user_meta_data->>'given_name'), ''),
        'User'
    );

    -- Get last name (can be empty)
    v_last_name := COALESCE(
        NULLIF(TRIM(NEW.raw_user_meta_data->>'last_name'), ''),
        NULLIF(TRIM(NEW.raw_user_meta_data->>'family_name'), ''),
        ''
    );

    -- Insert the user
    INSERT INTO public.users (
        id,
        email,
        first_name,
        last_name,
        avatar_url,
        provider,
        provider_id,
        email_verified
    ) VALUES (
        NEW.id,
        NEW.email,
        v_first_name,
        v_last_name,
        v_avatar_url,
        v_provider::auth_provider,
        NEW.app_metadata->>'provider_id',
        (NEW.email_confirmed_at IS NOT NULL)
    );

    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE LOG 'Error in handle_new_user: %', SQLERRM;
        RAISE;
END;
$$;

-- Step 3: Create the trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Step 4: Verify everything is set up
DO $$
BEGIN
    -- Check if trigger exists
    IF EXISTS (
        SELECT 1 FROM pg_trigger
        WHERE tgname = 'on_auth_user_created'
    ) THEN
        RAISE NOTICE '✅ Trigger created successfully';
    ELSE
        RAISE EXCEPTION '❌ Trigger was not created';
    END IF;

    -- Check if function exists
    IF EXISTS (
        SELECT 1 FROM pg_proc
        WHERE proname = 'handle_new_user'
    ) THEN
        RAISE NOTICE '✅ Function created successfully';
    ELSE
        RAISE EXCEPTION '❌ Function was not created';
    END IF;
END $$;

-- Step 5: Show final status
SELECT
    '✅ TRIGGER FIXED! Try registering again.' as status,
    'If you still get errors, check the Supabase logs for details.' as note;
