#!/bin/bash

echo "🧪 Installing Playwright and browsers..."

# Install Playwright
pnpm exec playwright install

# Install system dependencies
pnpm exec playwright install-deps

echo "✅ Playwright installation complete!"
echo ""
echo "📝 Available test commands:"
echo "  pnpm test          - Run all tests"
echo "  pnpm test:ui       - Run tests in UI mode (recommended)"
echo "  pnpm test:headed   - Run tests with visible browser"
echo "  pnpm test:debug    - Run tests in debug mode"
echo "  pnpm test:report   - Show test report"
echo ""
echo "🚀 To run tests now: pnpm test:ui"
