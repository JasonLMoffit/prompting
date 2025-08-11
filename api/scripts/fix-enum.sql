-- Fix enum type mismatch by dropping old table and enum
-- Run this in your PostgreSQL client (pgAdmin, DBeaver, etc.)

-- Drop the existing table and its associated enum type
DROP TABLE IF EXISTS "users" CASCADE;
DROP TYPE IF EXISTS "enum_Users_role" CASCADE;

-- The table will be recreated by Sequelize with the correct enum type
-- when you restart your API
