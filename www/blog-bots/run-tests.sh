#!/bin/bash

echo "🧪 Running UI Automation Tests..."
echo ""
echo "📍 Test Server: http://localhost:3002"
echo ""

# Check if server is running
if ! curl -s http://localhost:3002 > /dev/null 2>&1; then
  echo "⚠️  Warning: Development server doesn't seem to be running"
  echo "   Please start it with: pnpm dev"
  echo ""
  read -p "Do you want to start the server now? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Starting server..."
    pnpm dev &
    echo "⏳ Waiting for server to start..."
    sleep 10
  else
    exit 1
  fi
fi

# Run tests
echo "🏃 Running tests..."
pnpm test

echo ""
echo "✅ Tests complete!"
echo ""
echo "📊 View detailed report: pnpm test:report"
