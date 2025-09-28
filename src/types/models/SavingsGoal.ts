export interface SavingsGoal {
  goal_id: number;
  user_id: number;
  name: string;
  target_amount: number;
  current_amount: number;
  target_date?: Date;
  account_id?: number;
  is_active: boolean;
  created_at: Date;
}