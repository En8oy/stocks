import { AccountType } from '../enums';

export interface CreateBankAccountInput {
  account_name: string;
  bank_name: string;
  account_type: AccountType;
  currency?: string;
  current_balance?: number;
  is_foreign?: boolean;
  country?: string;
  opening_date?: Date;
}

export interface UpdateBankAccountInput {
  account_name?: string;
  current_balance?: number;
  is_active?: boolean;
}