import { InvestmentType } from '../enums';

export interface Investment {
  investment_id: number;
  user_id: number;
  investment_type: InvestmentType;
  name: string;
  symbol?: string;
  quantity: number;
  purchase_price?: number;
  current_price?: number;
  currency: string;
  purchase_date?: Date;
  platform?: string;
  is_active: boolean;
}