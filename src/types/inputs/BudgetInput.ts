import { Period } from '../enums';

export interface CreateBudgetInput {
  category_id: number;
  limit_amount: number;
  period: Period;
  start_date: Date;
  end_date?: Date;
  alert_percentage?: number;
}

export interface UpdateBudgetInput {
  limit_amount?: number;
  end_date?: Date;
  is_active?: boolean;
  alert_percentage?: number;
}