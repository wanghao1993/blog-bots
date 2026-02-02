#!/bin/bash

echo "🌸 Setting up Cute Blog..."

# Check if .env exists
if [ ! -f .env ]; then
  echo "📝 Creating .env file from .env.example..."
  cp .env.example .env
  echo "⚠️  Please configure your .env file with your API keys"
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Run the development server
echo "🚀 Starting development server..."
pnpm dev
