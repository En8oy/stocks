export interface User {
  user_id: number;
  email: string;
  first_name: string;
  last_name?: string;
  phone?: string;
  registration_date: Date;
  password_hash: string;
  is_active: boolean;
  language_setting: string;
  timezone: string;
}