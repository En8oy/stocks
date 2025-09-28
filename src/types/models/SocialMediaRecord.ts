import { SocialMediaPlatform } from '../enums';

export interface SocialMediaRecord {
  record_id: number;
  transaction_id?: number;
  user_id: number;
  platform: SocialMediaPlatform;
  original_message?: string;
  is_processed: boolean;
  created_at: Date;
}