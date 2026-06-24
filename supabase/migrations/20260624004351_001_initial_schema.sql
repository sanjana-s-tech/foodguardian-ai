-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Ingredients table
CREATE TABLE ingredients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  quantity TEXT NOT NULL,
  expiry_date DATE NOT NULL,
  category TEXT DEFAULT 'other',
  storage_tips TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sustainability metrics table
CREATE TABLE sustainability_metrics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  food_saved_kg DECIMAL DEFAULT 0,
  money_saved DECIMAL DEFAULT 0,
  co2_reduced_kg DECIMAL DEFAULT 0,
  sustainability_score INTEGER DEFAULT 0,
  recipes_generated INTEGER DEFAULT 0,
  ingredients_tracked INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert initial sustainability metrics
INSERT INTO sustainability_metrics (id, food_saved_kg, money_saved, co2_reduced_kg, sustainability_score, recipes_generated, ingredients_tracked)
VALUES (uuid_generate_v4(), 0, 0, 0, 0, 0, 0);

-- Enable RLS
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE sustainability_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ingredients (public access for demo)
CREATE POLICY "select_ingredients" ON ingredients FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "insert_ingredients" ON ingredients FOR INSERT TO PUBLIC WITH CHECK (true);
CREATE POLICY "update_ingredients" ON ingredients FOR UPDATE TO PUBLIC USING (true) WITH CHECK (true);
CREATE POLICY "delete_ingredients" ON ingredients FOR DELETE TO PUBLIC USING (true);

-- RLS Policies for sustainability_metrics (public access for demo)
CREATE POLICY "select_metrics" ON sustainability_metrics FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "insert_metrics" ON sustainability_metrics FOR INSERT TO PUBLIC WITH CHECK (true);
CREATE POLICY "update_metrics" ON sustainability_metrics FOR UPDATE TO PUBLIC USING (true) WITH CHECK (true);
CREATE POLICY "delete_metrics" ON sustainability_metrics FOR DELETE TO PUBLIC USING (true);