-- Create categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type category_type NOT NULL,
    icon TEXT,
    color_hex CHAR(7),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(name, type)
);

-- Create index
CREATE INDEX idx_categories_type ON categories(type);
