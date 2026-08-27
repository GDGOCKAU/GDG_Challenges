-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Enums
CREATE TYPE user_role AS ENUM ('student', 'member', 'admin');
CREATE TYPE challenge_type AS ENUM ('multiple_choice', 'simple_coding');
CREATE TYPE difficulty_level AS ENUM ('easy', 'medium', 'hard');

-- 2. Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'student' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 3. Categories Table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 4. Challenges Table
CREATE TABLE challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    type challenge_type NOT NULL,
    difficulty difficulty_level DEFAULT 'easy' NOT NULL,
    base_points INT DEFAULT 10 NOT NULL,
    max_attempts INT DEFAULT 5 NOT NULL,
    challenge_date DATE,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_challenge_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    CONSTRAINT chk_base_points CHECK (base_points > 0),
    CONSTRAINT chk_max_attempts CHECK (max_attempts > 0)
);

-- 5. Attempts Table
CREATE TABLE attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    challenge_id UUID NOT NULL,
    attempt_number INT NOT NULL,
    submitted_answer TEXT,
    is_correct BOOLEAN NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_attempt_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_attempt_challenge FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE,
    CONSTRAINT chk_attempt_number CHECK (attempt_number >= 1 AND attempt_number <= 5)
);

-- 6. Points Ledger Table
CREATE TABLE points (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    challenge_id UUID,
    points_awarded INT NOT NULL,
    reason VARCHAR(100) DEFAULT 'daily_challenge' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_points_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_points_challenge FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE SET NULL,
    CONSTRAINT uq_user_challenge_points UNIQUE (user_id, challenge_id),
    CONSTRAINT chk_points_positive CHECK (points_awarded >= 0)
);

-- 7. Streaks Table
CREATE TABLE user_streaks (
    user_id UUID PRIMARY KEY,
    current_streak INT DEFAULT 0 NOT NULL,
    max_streak INT DEFAULT 0 NOT NULL,
    last_completed_date DATE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_streak_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_streak_non_negative CHECK (current_streak >= 0 AND max_streak >= 0)
);

-- Indexes for Query Performance
CREATE INDEX idx_challenges_date ON challenges(challenge_date);
CREATE INDEX idx_challenges_category ON challenges(category_id);
CREATE INDEX idx_attempts_user_challenge ON attempts(user_id, challenge_id);
CREATE INDEX idx_points_user_id ON points(user_id);
CREATE INDEX idx_points_created_at ON points(created_at);