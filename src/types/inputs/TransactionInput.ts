import { TransactionType, InputMethod } from '../enums';

export interface CreateTransactionInput {
  account_id?: number;
  investment_id?: number;
  category_id: number;
  type: TransactionType;
  amount: number;
  currency?: string;
  description?: string;
  transaction_date: Date;
  input_method?: InputMethod;
  is_recurring?: boolean;
}

export interface UpdateTransactionInput {
  category_id?: number;
  amount?: number;
  description?: string;
  transaction_date?: Date;
}