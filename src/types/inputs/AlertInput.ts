import { AlertType, AlertFrequency, Period } from '../enums';

export interface CreateAlertInput {
  alert_type: AlertType;
  configuration: AlertConfiguration;
  frequency?: AlertFrequency;
}

export interface AlertConfiguration {
  low_balance?: {
    account_id: number;
    threshold_amount: number;
  };
  excessive_spending?: {
    category_id?: number;
    threshold_amount: number;
    period: Period;
  };
  budget_exceeded?: {
    budget_id: number;
  };
  suspicious_transaction?: {
    rules: {
      amount_threshold?: number;
      unusual_location?: boolean;
      unusual_time?: boolean;
    };
  };
  savings_goal?: {
    goal_id: number;
    milestone_percentage: number;
  };
  reminder?: {
    message: string;
    schedule: string;
  };
}