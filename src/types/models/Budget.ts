import { Period } from '../enums';

export interface Budget {
  budget_id: number;
  user_id: number;
  category_id: number;
  limit_amount: number;
  period: Period;
  start_date: Date;
  end_date?: Date;
  is_active: boolean;
  alert_percentage: number;
}