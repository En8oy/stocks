export interface VoiceRecord {
  record_id: number;
  transaction_id?: number;
  user_id: number;
  audio_file?: string;
  transcription?: string;
  is_processed: boolean;
  transcription_confidence?: number;
  created_at: Date;
}