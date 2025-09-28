export enum AccountType {
  SAVINGS = 'savings',
  CHECKING = 'checking',
  PAYROLL = 'payroll',
  INVESTMENT = 'investment'
}

export enum InvestmentType {
  STOCKS = 'stocks',
  GOVERNMENT_BONDS = 'government_bonds',
  CRYPTOCURRENCY = 'cryptocurrency',
  FUNDS = 'funds',
  OTHER = 'other'
}

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
  TRANSFER = 'transfer'
}

export enum CategoryType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export enum InputMethod {
  APP = 'app',
  VOICE = 'voice',
  SOCIAL_MEDIA = 'social_media',
  MANUAL = 'manual'
}

export enum Period {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

export enum AlertType {
  LOW_BALANCE = 'low_balance',
  EXCESSIVE_SPENDING = 'excessive_spending',
  BUDGET_EXCEEDED = 'budget_exceeded',
  SUSPICIOUS_TRANSACTION = 'suspicious_transaction',
  SAVINGS_GOAL = 'savings_goal',
  REMINDER = 'reminder'
}

export enum AlertFrequency {
  IMMEDIATE = 'immediate',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly'
}

export enum SocialMediaPlatform {
  WHATSAPP = 'whatsapp',
  TELEGRAM = 'telegram',
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  INSTAGRAM = 'instagram'
}