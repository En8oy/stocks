# Relational Database Model - Personal Financial Management System

## Entity-Relationship Diagram

```
USERS ||--o{ BANK_ACCOUNTS : owns
USERS ||--o{ INVESTMENTS : has
USERS ||--o{ TRANSACTIONS : performs
USERS ||--o{ BUDGETS : defines
USERS ||--o{ ALERTS : configures
USERS ||--o{ INPUT_METHODS : registers

BANK_ACCOUNTS ||--o{ TRANSACTIONS : contains
INVESTMENTS ||--o{ TRANSACTIONS : generates

CATEGORIES ||--o{ TRANSACTIONS : classifies
CATEGORIES ||--o{ BUDGETS : applies

ALERTS ||--o{ NOTIFICATIONS : generates
TRANSACTIONS ||--o{ VOICE_RECORDS : may_have
TRANSACTIONS ||--o{ SOCIAL_MEDIA_RECORDS : may_have
```

## Main Tables

### 1. USERS
```sql
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    phone VARCHAR(20),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    language_setting VARCHAR(10) DEFAULT 'en',
    timezone VARCHAR(50) DEFAULT 'UTC'
);
```

### 2. BANK_ACCOUNTS
```sql
CREATE TABLE bank_accounts (
    account_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    account_name VARCHAR(100) NOT NULL,
    bank_name VARCHAR(100) NOT NULL,
    account_type ENUM('savings', 'checking', 'payroll', 'investment') NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    current_balance DECIMAL(15,2) DEFAULT 0,
    is_foreign BOOLEAN DEFAULT FALSE,
    country VARCHAR(50),
    opening_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

### 3. INVESTMENTS
```sql
CREATE TABLE investments (
    investment_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    investment_type ENUM('stocks', 'government_bonds', 'cryptocurrency', 'funds', 'other') NOT NULL,
    name VARCHAR(100) NOT NULL,
    symbol VARCHAR(20),
    quantity DECIMAL(15,8) NOT NULL,
    purchase_price DECIMAL(15,2),
    current_price DECIMAL(15,2),
    currency VARCHAR(3) DEFAULT 'USD',
    purchase_date DATE,
    platform VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

### 4. CATEGORIES
```sql
CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    type ENUM('income', 'expense') NOT NULL,
    icon VARCHAR(50),
    color_hex VARCHAR(7),
    description TEXT
);
```

### 5. TRANSACTIONS
```sql
CREATE TABLE transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    account_id INT,
    investment_id INT,
    category_id INT NOT NULL,
    type ENUM('income', 'expense', 'transfer') NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    description TEXT,
    transaction_date DATETIME NOT NULL,
    input_method ENUM('app', 'voice', 'social_media', 'manual') DEFAULT 'manual',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_recurring BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (account_id) REFERENCES bank_accounts(account_id),
    FOREIGN KEY (investment_id) REFERENCES investments(investment_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
```

### 6. BUDGETS
```sql
CREATE TABLE budgets (
    budget_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    limit_amount DECIMAL(15,2) NOT NULL,
    period ENUM('daily', 'weekly', 'monthly', 'yearly') NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    alert_percentage INT DEFAULT 80,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
```

### 7. ALERTS
```sql
CREATE TABLE alerts (
    alert_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    alert_type ENUM('low_balance', 'excessive_spending', 'budget_exceeded', 
                    'suspicious_transaction', 'savings_goal', 'reminder') NOT NULL,
    configuration JSON NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    frequency ENUM('immediate', 'daily', 'weekly', 'monthly') DEFAULT 'immediate',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

### 8. NOTIFICATIONS
```sql
CREATE TABLE notifications (
    notification_id INT PRIMARY KEY AUTO_INCREMENT,
    alert_id INT NOT NULL,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    email_sent BOOLEAN DEFAULT FALSE,
    push_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (alert_id) REFERENCES alerts(alert_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

### 9. SAVINGS_GOALS
```sql
CREATE TABLE savings_goals (
    goal_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    target_amount DECIMAL(15,2) NOT NULL,
    current_amount DECIMAL(15,2) DEFAULT 0,
    target_date DATE,
    account_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (account_id) REFERENCES bank_accounts(account_id)
);
```

### 10. VOICE_RECORDS
```sql
CREATE TABLE voice_records (
    record_id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_id INT,
    user_id INT NOT NULL,
    audio_file VARCHAR(255),
    transcription TEXT,
    is_processed BOOLEAN DEFAULT FALSE,
    transcription_confidence FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

### 11. SOCIAL_MEDIA_RECORDS
```sql
CREATE TABLE social_media_records (
    record_id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_id INT,
    user_id INT NOT NULL,
    platform ENUM('whatsapp', 'telegram', 'facebook', 'twitter', 'instagram') NOT NULL,
    original_message TEXT,
    is_processed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

### 12. EXCHANGE_RATES
```sql
CREATE TABLE exchange_rates (
    rate_id INT PRIMARY KEY AUTO_INCREMENT,
    source_currency VARCHAR(3) NOT NULL,
    target_currency VARCHAR(3) NOT NULL,
    exchange_rate DECIMAL(10,6) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_currencies (source_currency, target_currency)
);
```

## Recommended Indexes

```sql
-- Indexes for improved performance
CREATE INDEX idx_trans_user_date ON transactions(user_id, transaction_date);
CREATE INDEX idx_trans_category ON transactions(category_id);
CREATE INDEX idx_accounts_user ON bank_accounts(user_id);
CREATE INDEX idx_investments_user ON investments(user_id);
CREATE INDEX idx_alerts_user ON alerts(user_id);
CREATE INDEX idx_notif_user_read ON notifications(user_id, is_read);
```

## Security Considerations

1. **Sensitive data encryption**: Balances and amounts should be encrypted in the database
2. **Audit trail**: Consider adding an audit table to track all changes
3. **Two-factor authentication**: Add fields for 2FA in users table
4. **Access tokens**: For social media and voice assistant integrations

## Model Advantages

1. **Flexibility**: Supports multiple types of accounts and investments
2. **Scalability**: Normalized structure that allows growth
3. **Multi-currency**: Support for accounts in different currencies
4. **Integrations**: Ready to receive data from different sources
5. **Customizable alerts**: Robust alert and notification system
6. **Complete history**: Maintains record of all transactions

## Next Steps

1. Define stored procedures for common operations
2. Implement triggers to automatically update balances
3. Create views for frequent reports
4. Design cache layer for frequent queries
5. Implement table partitioning for large tables (transactions)