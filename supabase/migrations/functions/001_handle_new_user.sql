-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    v_provider TEXT;
    v_avatar_url TEXT;
BEGIN
    -- Determine the auth provider
    v_provider := CASE
        WHEN NEW.app_metadata->>'provider' = 'google' THEN 'google'
        WHEN NEW.app_metadata->>'provider' = 'facebook' THEN 'facebook'
        ELSE 'email'
    END;

    -- Get avatar URL from OAuth providers
    v_avatar_url := COALESCE(
        NEW.raw_user_meta_data->>'avatar_url',
        NEW.raw_user_meta_data->>'picture'
    );

    INSERT INTO public.users (
        id,
        email,
        first_name,
        last_name,
        avatar_url,
        provider,
        provider_id,
        email_verified
    )
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(
            NULLIF(NEW.raw_user_meta_data->>'first_name', ''),
            NULLIF(NEW.raw_user_meta_data->>'given_name', ''),
            'User'
        ),
        COALESCE(
            NULLIF(NEW.raw_user_meta_data->>'last_name', ''),
            NULLIF(NEW.raw_user_meta_data->>'family_name', ''),
            ''
        ),
        v_avatar_url,
        v_provider::auth_provider,
        NEW.app_metadata->>'provider_id',
        COALESCE(NEW.email_confirmed_at IS NOT NULL, false)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
