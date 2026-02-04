-- Donut Vote USA Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Shops table (donut shops/chains)
CREATE TABLE shops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  address TEXT,
  city TEXT,
  state TEXT NOT NULL,
  state_code CHAR(2) NOT NULL,
  zip TEXT,
  lat DECIMAL(10, 7),
  lng DECIMAL(10, 7),
  phone TEXT,
  website TEXT,
  doordash_url TEXT,
  image_url TEXT,
  is_chain BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  vote_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Donuts table
CREATE TABLE donuts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
  flavor_category TEXT NOT NULL CHECK (flavor_category IN ('glazed', 'filled', 'cake', 'vegan', 'gourmet', 'cronut', 'other')),
  image_url TEXT,
  is_signature BOOLEAN DEFAULT FALSE,
  vote_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Votes table
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  donut_id UUID REFERENCES donuts(id) ON DELETE CASCADE,
  shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
  ip_hash TEXT, -- Hashed IP for rate limiting
  state_code CHAR(2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- User can only vote once per 24 hours
  CONSTRAINT unique_user_daily_vote UNIQUE (user_id, (created_at::date))
);

-- Global vote counter for prize system
CREATE TABLE vote_counter (
  id INTEGER PRIMARY KEY DEFAULT 1,
  total_votes BIGINT DEFAULT 0,
  last_winner_vote BIGINT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT single_row CHECK (id = 1)
);

-- Initialize counter
INSERT INTO vote_counter (id, total_votes) VALUES (1, 0) ON CONFLICT DO NOTHING;

-- Winners table
CREATE TABLE winners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  vote_id UUID REFERENCES votes(id) ON DELETE SET NULL,
  vote_number BIGINT NOT NULL,
  prize_amount DECIMAL(10, 2) NOT NULL DEFAULT 5.00,
  prize_type TEXT DEFAULT 'doordash',
  email TEXT,
  claimed BOOLEAN DEFAULT FALSE,
  claimed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table (optional photo + review)
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  donut_id UUID REFERENCES donuts(id) ON DELETE CASCADE,
  shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  state_code CHAR(2),
  vote_streak INTEGER DEFAULT 0,
  total_votes INTEGER DEFAULT 0,
  is_winner BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_votes_user_id ON votes(user_id);
CREATE INDEX idx_votes_donut_id ON votes(donut_id);
CREATE INDEX idx_votes_shop_id ON votes(shop_id);
CREATE INDEX idx_votes_created_at ON votes(created_at);
CREATE INDEX idx_votes_state_code ON votes(state_code);
CREATE INDEX idx_donuts_shop_id ON donuts(shop_id);
CREATE INDEX idx_donuts_flavor ON donuts(flavor_category);
CREATE INDEX idx_donuts_vote_count ON donuts(vote_count DESC);
CREATE INDEX idx_shops_state_code ON shops(state_code);
CREATE INDEX idx_shops_vote_count ON shops(vote_count DESC);

-- Function to increment vote counts
CREATE OR REPLACE FUNCTION increment_vote_counts()
RETURNS TRIGGER AS $$
BEGIN
  -- Increment donut vote count
  IF NEW.donut_id IS NOT NULL THEN
    UPDATE donuts SET vote_count = vote_count + 1, updated_at = NOW() WHERE id = NEW.donut_id;
  END IF;
  
  -- Increment shop vote count
  IF NEW.shop_id IS NOT NULL THEN
    UPDATE shops SET vote_count = vote_count + 1, updated_at = NOW() WHERE id = NEW.shop_id;
  END IF;
  
  -- Increment global counter
  UPDATE vote_counter SET total_votes = total_votes + 1, updated_at = NOW() WHERE id = 1;
  
  -- Increment user profile total votes
  IF NEW.user_id IS NOT NULL THEN
    UPDATE profiles SET total_votes = total_votes + 1, updated_at = NOW() WHERE id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for vote counts
CREATE TRIGGER trigger_increment_vote_counts
AFTER INSERT ON votes
FOR EACH ROW
EXECUTE FUNCTION increment_vote_counts();

-- Function to check for winner (every 2000th vote)
CREATE OR REPLACE FUNCTION check_for_winner()
RETURNS TRIGGER AS $$
DECLARE
  current_total BIGINT;
  last_winner BIGINT;
  user_email TEXT;
BEGIN
  SELECT total_votes, last_winner_vote INTO current_total, last_winner FROM vote_counter WHERE id = 1;
  
  -- Check if this vote is a winning vote (every 2000)
  IF current_total > 0 AND current_total % 2000 = 0 AND current_total > last_winner THEN
    -- Get user email
    SELECT email INTO user_email FROM auth.users WHERE id = NEW.user_id;
    
    -- Create winner record
    INSERT INTO winners (user_id, vote_id, vote_number, prize_amount, email)
    VALUES (NEW.user_id, NEW.id, current_total, 5.00, user_email);
    
    -- Update last winner vote
    UPDATE vote_counter SET last_winner_vote = current_total WHERE id = 1;
    
    -- Mark user as winner
    UPDATE profiles SET is_winner = TRUE WHERE id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for winner check (runs after vote count increment)
CREATE TRIGGER trigger_check_winner
AFTER INSERT ON votes
FOR EACH ROW
EXECUTE FUNCTION check_for_winner();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION handle_new_user();

-- Views for leaderboards
CREATE OR REPLACE VIEW top_donuts AS
SELECT 
  d.id,
  d.name,
  d.slug,
  d.image_url,
  d.flavor_category,
  d.vote_count,
  s.name as shop_name,
  s.slug as shop_slug,
  s.state_code
FROM donuts d
LEFT JOIN shops s ON d.shop_id = s.id
ORDER BY d.vote_count DESC;

CREATE OR REPLACE VIEW top_shops AS
SELECT 
  id,
  name,
  slug,
  image_url,
  city,
  state_code,
  vote_count,
  is_chain,
  is_featured
FROM shops
ORDER BY vote_count DESC;

CREATE OR REPLACE VIEW top_shops_by_state AS
SELECT 
  id,
  name,
  slug,
  image_url,
  city,
  state_code,
  vote_count,
  ROW_NUMBER() OVER (PARTITION BY state_code ORDER BY vote_count DESC) as state_rank
FROM shops;

-- RLS Policies
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE donuts ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE winners ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vote_counter ENABLE ROW LEVEL SECURITY;

-- Public read access for shops, donuts, leaderboards
CREATE POLICY "Shops are viewable by everyone" ON shops FOR SELECT USING (true);
CREATE POLICY "Donuts are viewable by everyone" ON donuts FOR SELECT USING (true);
CREATE POLICY "Vote counter is viewable by everyone" ON vote_counter FOR SELECT USING (true);

-- Votes: users can insert their own, read all (for leaderboards)
CREATE POLICY "Users can insert their own votes" ON votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Votes are viewable by everyone" ON votes FOR SELECT USING (true);

-- Winners: viewable by everyone (for winner wall), users can see their own details
CREATE POLICY "Winners are viewable by everyone" ON winners FOR SELECT USING (true);

-- Reviews: users can manage their own
CREATE POLICY "Users can insert their own reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);

-- Profiles: users can manage their own, public read
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
