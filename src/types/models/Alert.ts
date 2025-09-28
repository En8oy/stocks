import { AlertType, AlertFrequency } from '../enums';

export interface Alert {
  alert_id: number;
  user_id: number;
  alert_type: AlertType;
  configuration: Record<string, any>;
  is_active: boolean;
  frequency: AlertFrequency;
  created_at: Date;
}