#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Referral Management SaaS...${NC}"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules not found. Installing dependencies...${NC}"
    npm install
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found. Copying from .env.example...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit .env with your database credentials${NC}"
    exit 1
fi

# Check if Prisma client is generated
if [ ! -d "node_modules/@prisma/client" ]; then
    echo -e "${YELLOW}⚠️  Prisma client not found. Generating...${NC}"
    npm run prisma:generate
fi

echo -e "${GREEN}✓ All prerequisites met${NC}"
echo ""
echo -e "${BLUE}Starting services...${NC}"
echo -e "  ${GREEN}Frontend:${NC} http://localhost:5173"
echo -e "  ${GREEN}Backend:${NC}  http://localhost:3000"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}Stopping services...${NC}"
    kill $(jobs -p) 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start backend in background
npm run server &
BACKEND_PID=$!

# Give backend time to start
sleep 2

# Start frontend in foreground
npm run dev

# Wait for all background jobs
wait
