-- Exchange rates policies (public read)
CREATE POLICY "Anyone can view exchange rates" ON exchange_rates
    FOR SELECT USING (true);
