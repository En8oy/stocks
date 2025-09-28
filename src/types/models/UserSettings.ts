export interface UserSettings {
  id: string;
  user_id: string;
  
  // Language & Region
  language: 'es' | 'en';
  timezone: string;
  date_format: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
  time_format: '12h' | '24h';
  first_day_of_week: 0 | 1; // 0=Sunday, 1=Monday
  
  // Currency & Number Format
  default_currency: string;
  currency_display: 'symbol' | 'code' | 'name';
  decimal_places: number;
  thousand_separator: string;
  decimal_separator: string;
  
  // Theme & Appearance
  theme: 'light' | 'dark' | 'system';
  color_scheme: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  font_size: 'small' | 'medium' | 'large';
  compact_mode: boolean;
  show_animations: boolean;
  
  // Dashboard & Layout
  dashboard_layout: 'default' | 'compact' | 'detailed';
  show_balance_on_startup: boolean;
  hide_sensitive_data: boolean;
  default_dashboard_period: 'week' | 'month' | 'quarter' | 'year';
  
  // Notifications
  push_notifications: boolean;
  email_notifications: boolean;
  budget_alerts: boolean;
  transaction_alerts: boolean;
  weekly_summary: boolean;
  monthly_summary: boolean;
  low_balance_alerts: boolean;
  unusual_spending_alerts: boolean;
  
  // Transaction Defaults
  default_transaction_type: 'income' | 'expense' | 'transfer';
  auto_categorize: boolean;
  require_description: boolean;
  default_account_id?: string;
  
  // Security & Privacy
  require_auth_for_app: boolean;
  auto_lock_timeout: number; // seconds
  biometric_auth: boolean;
  pin_auth: boolean;
  session_timeout: number; // seconds
  
  // Data & Backup
  auto_backup: boolean;
  backup_frequency: 'daily' | 'weekly' | 'monthly';
  include_attachments_backup: boolean;
  data_retention_days: number;
  
  // Voice & AI Features
  voice_recognition: boolean;
  voice_language: 'es' | 'en';
  auto_transcribe_voice: boolean;
  ai_categorization: boolean;
  smart_suggestions: boolean;
  
  // Social Media Integration
  whatsapp_integration: boolean;
  telegram_integration: boolean;
  auto_process_messages: boolean;
  
  // Export & Reports
  default_export_format: 'pdf' | 'excel' | 'csv';
  include_charts_export: boolean;
  default_report_period: 'week' | 'month' | 'quarter' | 'year';
  
  // Performance
  cache_enabled: boolean;
  offline_mode: boolean;
  sync_frequency: 'real_time' | 'hourly' | 'daily' | 'manual';
  
  // Accessibility
  high_contrast: boolean;
  large_text: boolean;
  screen_reader_support: boolean;
  reduce_motion: boolean;
  
  // Advanced Features
  developer_mode: boolean;
  beta_features: boolean;
  analytics_enabled: boolean;
  crash_reporting: boolean;
  
  created_at: string;
  updated_at: string;
}

export interface UpdateUserSettingsInput {
  language?: 'es' | 'en';
  timezone?: string;
  date_format?: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
  time_format?: '12h' | '24h';
  first_day_of_week?: 0 | 1;
  
  default_currency?: string;
  currency_display?: 'symbol' | 'code' | 'name';
  decimal_places?: number;
  thousand_separator?: string;
  decimal_separator?: string;
  
  theme?: 'light' | 'dark' | 'system';
  color_scheme?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  font_size?: 'small' | 'medium' | 'large';
  compact_mode?: boolean;
  show_animations?: boolean;
  
  dashboard_layout?: 'default' | 'compact' | 'detailed';
  show_balance_on_startup?: boolean;
  hide_sensitive_data?: boolean;
  default_dashboard_period?: 'week' | 'month' | 'quarter' | 'year';
  
  push_notifications?: boolean;
  email_notifications?: boolean;
  budget_alerts?: boolean;
  transaction_alerts?: boolean;
  weekly_summary?: boolean;
  monthly_summary?: boolean;
  low_balance_alerts?: boolean;
  unusual_spending_alerts?: boolean;
  
  default_transaction_type?: 'income' | 'expense' | 'transfer';
  auto_categorize?: boolean;
  require_description?: boolean;
  default_account_id?: string;
  
  require_auth_for_app?: boolean;
  auto_lock_timeout?: number;
  biometric_auth?: boolean;
  pin_auth?: boolean;
  session_timeout?: number;
  
  auto_backup?: boolean;
  backup_frequency?: 'daily' | 'weekly' | 'monthly';
  include_attachments_backup?: boolean;
  data_retention_days?: number;
  
  voice_recognition?: boolean;
  voice_language?: 'es' | 'en';
  auto_transcribe_voice?: boolean;
  ai_categorization?: boolean;
  smart_suggestions?: boolean;
  
  whatsapp_integration?: boolean;
  telegram_integration?: boolean;
  auto_process_messages?: boolean;
  
  default_export_format?: 'pdf' | 'excel' | 'csv';
  include_charts_export?: boolean;
  default_report_period?: 'week' | 'month' | 'quarter' | 'year';
  
  cache_enabled?: boolean;
  offline_mode?: boolean;
  sync_frequency?: 'real_time' | 'hourly' | 'daily' | 'manual';
  
  high_contrast?: boolean;
  large_text?: boolean;
  screen_reader_support?: boolean;
  reduce_motion?: boolean;
  
  developer_mode?: boolean;
  beta_features?: boolean;
  analytics_enabled?: boolean;
  crash_reporting?: boolean;
}

export type SettingCategory = {
  key: string;
  icon: string;
  titleKey: string;
  settings: Array<{
    key: keyof UserSettings;
    type: 'boolean' | 'select' | 'number' | 'text';
    options?: any[];
  }>;
};