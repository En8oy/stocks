# Supabase Setup Instructions

## 1. Configure Environment Variables

Update your `.env` file with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://sdznbrgwcnlpxvvrwqzr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 2. Run Migrations in Supabase

Go to your Supabase dashboard and run the SQL migrations in order:

1. Navigate to SQL Editor in your Supabase dashboard
2. Run each migration file in order:
   - `001_initial_schema.sql` - Creates all tables and types
   - `002_rls_policies.sql` - Sets up Row Level Security
   - `003_functions_and_triggers.sql` - Adds helper functions
   - `004_seed_categories.sql` - Adds default categories

## 3. Enable Authentication Providers

In Supabase Auth settings:
1. Enable Email/Password authentication
2. Configure email templates
3. (Optional) Enable social providers (Google, GitHub, etc.)

## 4. Configure Storage Buckets (Optional)

For voice recordings:
1. Create a bucket named `voice-recordings`
2. Set it to private
3. Add RLS policies for user access

## 5. Test the Connection

Run your Next.js app:
```bash
npm run dev
```

## Database Features

- **Automatic user profile creation** on signup
- **Balance updates** when transactions are added
- **RLS policies** ensure users only see their own data
- **Budget tracking** with automatic alerts
- **Multi-currency support** with exchange rates
- **Voice and social media** transaction inputs

## Security Notes

- All tables have RLS enabled
- Users can only access their own data
- Categories and exchange rates are public read
- Sensitive operations use database functions