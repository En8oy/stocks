export interface Notification {
  notification_id: number;
  alert_id: number;
  user_id: number;
  message: string;
  is_read: boolean;
  email_sent: boolean;
  push_sent: boolean;
  created_at: Date;
}