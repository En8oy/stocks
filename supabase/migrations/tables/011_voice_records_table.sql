-- Create voice_records table
CREATE TABLE voice_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID REFERENCES transactions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    audio_file TEXT,
    transcription TEXT,
    is_processed BOOLEAN DEFAULT FALSE,
    transcription_confidence FLOAT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_confidence CHECK (transcription_confidence >= 0 AND transcription_confidence <= 1)
);

-- Create index
CREATE INDEX idx_voice_records_user ON voice_records(user_id);
