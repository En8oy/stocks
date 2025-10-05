-- Social media records policies
CREATE POLICY "Users can view own social media records" ON social_media_records
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own social media records" ON social_media_records
    FOR INSERT WITH CHECK (auth.uid() = user_id);
