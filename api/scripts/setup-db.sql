-- Database setup script for GraphQL Express API
-- Run this script as a PostgreSQL superuser (usually postgres)

-- Create database
CREATE DATABASE graphql_api;

-- Create user (replace 'your_password' with a secure password)
CREATE USER graphql_user WITH PASSWORD 'your_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE graphql_api TO graphql_user;

-- Connect to the new database
\c graphql_api;

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO graphql_user;

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Note: The actual tables will be created by Sequelize when the application starts
-- This script just sets up the database and user permissions
