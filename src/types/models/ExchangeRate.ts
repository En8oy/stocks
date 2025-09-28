export interface ExchangeRate {
  rate_id: number;
  source_currency: string;
  target_currency: string;
  exchange_rate: number;
  updated_at: Date;
}