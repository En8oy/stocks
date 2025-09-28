import { TransactionType, InputMethod } from '../enums';

export interface Transaction {
  transaction_id: number;
  user_id: number;
  account_id?: number;
  investment_id?: number;
  category_id: number;
  type: TransactionType;
  amount: number;
  currency: string;
  description?: string;
  transaction_date: Date;
  input_method: InputMethod;
  created_at: Date;
  is_recurring: boolean;
}