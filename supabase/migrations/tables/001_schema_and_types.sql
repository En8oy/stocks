-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('client', 'admin');
CREATE TYPE subscription_tier AS ENUM ('free', 'starter', 'pro', 'enterprise');
CREATE TYPE auth_provider AS ENUM ('email', 'google', 'facebook');
CREATE TYPE investment_experience AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
CREATE TYPE risk_tolerance AS ENUM ('low', 'medium', 'high');
CREATE TYPE account_type AS ENUM ('savings', 'checking', 'payroll', 'investment');
CREATE TYPE investment_type AS ENUM ('stocks', 'government_bonds', 'cryptocurrency', 'funds', 'other');
CREATE TYPE transaction_type AS ENUM ('income', 'expense', 'transfer');
CREATE TYPE category_type AS ENUM ('income', 'expense');
CREATE TYPE input_method AS ENUM ('app', 'voice', 'social_media', 'manual');
CREATE TYPE period AS ENUM ('daily', 'weekly', 'monthly', 'yearly');
CREATE TYPE alert_type AS ENUM ('low_balance', 'excessive_spending', 'budget_exceeded', 'suspicious_transaction', 'savings_goal', 'reminder');
CREATE TYPE alert_frequency AS ENUM ('immediate', 'daily', 'weekly', 'monthly');
CREATE TYPE social_media_platform AS ENUM ('whatsapp', 'telegram', 'facebook', 'twitter', 'instagram');
