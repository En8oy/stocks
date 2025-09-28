export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string | null
          phone: string | null
          language_setting: string
          timezone: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name: string
          last_name?: string | null
          phone?: string | null
          language_setting?: string
          timezone?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string | null
          phone?: string | null
          language_setting?: string
          timezone?: string
          created_at?: string
          updated_at?: string
        }
      }
      bank_accounts: {
        Row: {
          id: string
          user_id: string
          account_name: string
          bank_name: string
          account_type: 'savings' | 'checking' | 'payroll' | 'investment'
          currency: string
          current_balance: number
          is_foreign: boolean
          country: string | null
          opening_date: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          account_name: string
          bank_name: string
          account_type: 'savings' | 'checking' | 'payroll' | 'investment'
          currency?: string
          current_balance?: number
          is_foreign?: boolean
          country?: string | null
          opening_date?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          account_name?: string
          bank_name?: string
          account_type?: 'savings' | 'checking' | 'payroll' | 'investment'
          currency?: string
          current_balance?: number
          is_foreign?: boolean
          country?: string | null
          opening_date?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      investments: {
        Row: {
          id: string
          user_id: string
          investment_type: 'stocks' | 'government_bonds' | 'cryptocurrency' | 'funds' | 'other'
          name: string
          symbol: string | null
          quantity: number
          purchase_price: number | null
          current_price: number | null
          currency: string
          purchase_date: string | null
          platform: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          investment_type: 'stocks' | 'government_bonds' | 'cryptocurrency' | 'funds' | 'other'
          name: string
          symbol?: string | null
          quantity: number
          purchase_price?: number | null
          current_price?: number | null
          currency?: string
          purchase_date?: string | null
          platform?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          investment_type?: 'stocks' | 'government_bonds' | 'cryptocurrency' | 'funds' | 'other'
          name?: string
          symbol?: string | null
          quantity?: number
          purchase_price?: number | null
          current_price?: number | null
          currency?: string
          purchase_date?: string | null
          platform?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          type: 'income' | 'expense'
          icon: string | null
          color_hex: string | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'income' | 'expense'
          icon?: string | null
          color_hex?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'income' | 'expense'
          icon?: string | null
          color_hex?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          account_id: string | null
          investment_id: string | null
          category_id: string
          type: 'income' | 'expense' | 'transfer'
          amount: number
          currency: string
          description: string | null
          transaction_date: string
          input_method: 'app' | 'voice' | 'social_media' | 'manual'
          is_recurring: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          account_id?: string | null
          investment_id?: string | null
          category_id: string
          type: 'income' | 'expense' | 'transfer'
          amount: number
          currency?: string
          description?: string | null
          transaction_date: string
          input_method?: 'app' | 'voice' | 'social_media' | 'manual'
          is_recurring?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          account_id?: string | null
          investment_id?: string | null
          category_id?: string
          type?: 'income' | 'expense' | 'transfer'
          amount?: number
          currency?: string
          description?: string | null
          transaction_date?: string
          input_method?: 'app' | 'voice' | 'social_media' | 'manual'
          is_recurring?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      budgets: {
        Row: {
          id: string
          user_id: string
          category_id: string
          limit_amount: number
          period: 'daily' | 'weekly' | 'monthly' | 'yearly'
          start_date: string
          end_date: string | null
          is_active: boolean
          alert_percentage: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category_id: string
          limit_amount: number
          period: 'daily' | 'weekly' | 'monthly' | 'yearly'
          start_date: string
          end_date?: string | null
          is_active?: boolean
          alert_percentage?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category_id?: string
          limit_amount?: number
          period?: 'daily' | 'weekly' | 'monthly' | 'yearly'
          start_date?: string
          end_date?: string | null
          is_active?: boolean
          alert_percentage?: number
          created_at?: string
          updated_at?: string
        }
      }
      alerts: {
        Row: {
          id: string
          user_id: string
          alert_type: 'low_balance' | 'excessive_spending' | 'budget_exceeded' | 'suspicious_transaction' | 'savings_goal' | 'reminder'
          configuration: Json
          is_active: boolean
          frequency: 'immediate' | 'daily' | 'weekly' | 'monthly'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          alert_type: 'low_balance' | 'excessive_spending' | 'budget_exceeded' | 'suspicious_transaction' | 'savings_goal' | 'reminder'
          configuration: Json
          is_active?: boolean
          frequency?: 'immediate' | 'daily' | 'weekly' | 'monthly'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          alert_type?: 'low_balance' | 'excessive_spending' | 'budget_exceeded' | 'suspicious_transaction' | 'savings_goal' | 'reminder'
          configuration?: Json
          is_active?: boolean
          frequency?: 'immediate' | 'daily' | 'weekly' | 'monthly'
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          alert_id: string
          user_id: string
          message: string
          is_read: boolean
          email_sent: boolean
          push_sent: boolean
          created_at: string
        }
        Insert: {
          id?: string
          alert_id: string
          user_id: string
          message: string
          is_read?: boolean
          email_sent?: boolean
          push_sent?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          alert_id?: string
          user_id?: string
          message?: string
          is_read?: boolean
          email_sent?: boolean
          push_sent?: boolean
          created_at?: string
        }
      }
      savings_goals: {
        Row: {
          id: string
          user_id: string
          name: string
          target_amount: number
          current_amount: number
          target_date: string | null
          account_id: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          target_amount: number
          current_amount?: number
          target_date?: string | null
          account_id?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          target_amount?: number
          current_amount?: number
          target_date?: string | null
          account_id?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      voice_records: {
        Row: {
          id: string
          transaction_id: string | null
          user_id: string
          audio_file: string | null
          transcription: string | null
          is_processed: boolean
          transcription_confidence: number | null
          created_at: string
        }
        Insert: {
          id?: string
          transaction_id?: string | null
          user_id: string
          audio_file?: string | null
          transcription?: string | null
          is_processed?: boolean
          transcription_confidence?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          transaction_id?: string | null
          user_id?: string
          audio_file?: string | null
          transcription?: string | null
          is_processed?: boolean
          transcription_confidence?: number | null
          created_at?: string
        }
      }
      social_media_records: {
        Row: {
          id: string
          transaction_id: string | null
          user_id: string
          platform: 'whatsapp' | 'telegram' | 'facebook' | 'twitter' | 'instagram'
          original_message: string | null
          is_processed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          transaction_id?: string | null
          user_id: string
          platform: 'whatsapp' | 'telegram' | 'facebook' | 'twitter' | 'instagram'
          original_message?: string | null
          is_processed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          transaction_id?: string | null
          user_id?: string
          platform?: 'whatsapp' | 'telegram' | 'facebook' | 'twitter' | 'instagram'
          original_message?: string | null
          is_processed?: boolean
          created_at?: string
        }
      }
      exchange_rates: {
        Row: {
          id: string
          source_currency: string
          target_currency: string
          exchange_rate: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          source_currency: string
          target_currency: string
          exchange_rate: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          source_currency?: string
          target_currency?: string
          exchange_rate?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_budget_exceeded: {
        Args: {
          p_user_id: string
          p_category_id: string
          p_amount: number
        }
        Returns: {
          budget_id: string
          limit_amount: number
          spent_amount: number
          percentage_used: number
          is_exceeded: boolean
        }[]
      }
      get_financial_summary: {
        Args: {
          p_user_id: string
          p_start_date?: string
          p_end_date?: string
        }
        Returns: {
          total_income: number
          total_expenses: number
          net_savings: number
          total_balance: number
        }[]
      }
      update_savings_goal_progress: {
        Args: {
          p_goal_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      account_type: 'savings' | 'checking' | 'payroll' | 'investment'
      alert_frequency: 'immediate' | 'daily' | 'weekly' | 'monthly'
      alert_type: 'low_balance' | 'excessive_spending' | 'budget_exceeded' | 'suspicious_transaction' | 'savings_goal' | 'reminder'
      category_type: 'income' | 'expense'
      input_method: 'app' | 'voice' | 'social_media' | 'manual'
      investment_type: 'stocks' | 'government_bonds' | 'cryptocurrency' | 'funds' | 'other'
      period: 'daily' | 'weekly' | 'monthly' | 'yearly'
      social_media_platform: 'whatsapp' | 'telegram' | 'facebook' | 'twitter' | 'instagram'
      transaction_type: 'income' | 'expense' | 'transfer'
    }
  }
}