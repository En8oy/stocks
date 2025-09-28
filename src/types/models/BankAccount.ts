import { AccountType } from '../enums';

export interface BankAccount {
  account_id: number;
  user_id: number;
  account_name: string;
  bank_name: string;
  account_type: AccountType;
  currency: string;
  current_balance: number;
  is_foreign: boolean;
  country?: string;
  opening_date?: Date;
  is_active: boolean;
  last_updated: Date;
}