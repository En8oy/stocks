-- Voice records policies
CREATE POLICY "Users can view own voice records" ON voice_records
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own voice records" ON voice_records
    FOR INSERT WITH CHECK (auth.uid() = user_id);
