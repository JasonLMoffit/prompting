#!/bin/bash

echo "🚀 GraphQL Express API Quick Start Script"
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please edit .env file with your database credentials and JWT secret"
    echo "   - Set DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD"
    echo "   - Set JWT_SECRET to a secure random string"
    echo "   - Set ADMIN_REGISTRATION_CODE if you want to customize it"
    echo ""
    echo "Press Enter when you've configured .env file..."
    read
else
    echo "✅ .env file already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🎯 Next steps:"
echo "1. Make sure PostgreSQL is running"
echo "2. Create database and user (see scripts/setup-db.sql)"
echo "3. Update .env file with your database credentials"
echo "4. Run: npm run dev"
echo ""
echo "📚 For more information, see README.md"
echo ""
echo "🚀 Ready to start! Run: npm run dev"
