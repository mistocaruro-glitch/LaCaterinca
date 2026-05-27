/*
  # Initialize database schema for Mistocaru

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `name` (text)
      - `credits` (integer, default 0)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)
    
    - `characters`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `avatar` (text)
      - `created_at` (timestamp with time zone)
    
    - `pranks`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `character_id` (uuid, references characters)
      - `victim_number` (text)
      - `victim_name` (text, nullable)
      - `status` (text: pending, in_progress, success, failed)
      - `duration` (integer, nullable, seconds)
      - `credits_used` (integer)
      - `recording_url` (text, nullable)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)
    
    - `transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `amount` (integer, in RON)
      - `credits` (integer)
      - `status` (text: pending, completed, failed)
      - `stripe_payment_id` (text, nullable)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on all tables
    - Users can only read/write their own data
    - Characters are publicly readable

  3. Important Notes
    - `profiles.id` references `auth.users.id` with ON DELETE CASCADE
    - All tables have proper indexes for performance
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text DEFAULT '',
  credits integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create characters table
CREATE TABLE IF NOT EXISTS characters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  avatar text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE characters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Characters are publicly readable"
  ON characters FOR SELECT
  USING (true);

-- Create pranks table
CREATE TABLE IF NOT EXISTS pranks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  character_id uuid NOT NULL REFERENCES characters(id) ON DELETE RESTRICT,
  victim_number text NOT NULL,
  victim_name text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'success', 'failed')),
  duration integer,
  credits_used integer NOT NULL DEFAULT 1,
  recording_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pranks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own pranks"
  ON pranks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pranks"
  ON pranks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pranks"
  ON pranks FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount integer NOT NULL,
  credits integer NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  stripe_payment_id text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions"
  ON transactions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_pranks_user_id ON pranks(user_id);
CREATE INDEX IF NOT EXISTS idx_pranks_status ON pranks(status);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);

-- Insert default characters
INSERT INTO characters (name, description, avatar) VALUES
  ('Tiganul Vesel', 'Un personaj plin de energie si umor', 'https://images.pexels.com/photos/1222235/pexels-photo-1222235.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'),
  ('Politisul Strict', 'Un ofiter sever dar drept', 'https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'),
  ('Baba Prosatoare', 'O batrana inteleapta cu sfaturi surprinzatoare', 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'),
  ('Agentul Imobiliar', 'Totul despre apartamente imaginare', 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'),
  ('Taximetristul Voraret', 'Povesti fara sfarsit despre calatorii', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'),
  ('Doctorul Panicar', 'Diagnostic surprinzator garantat', 'https://images.pexels.com/photos/545229/pexels-photo-545229.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop')
ON CONFLICT DO NOTHING;

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating timestamps
DROP TRIGGER IF EXISTS on_profiles_updated ON profiles;
CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS on_pranks_updated ON pranks;
CREATE TRIGGER on_pranks_updated
  BEFORE UPDATE ON pranks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
