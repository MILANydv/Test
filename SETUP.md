# Quick Setup Guide

This guide will help you get the Referral Management SaaS up and running locally.

## Prerequisites

Make sure you have the following installed:
- Node.js 18+ and npm
- PostgreSQL (or use Docker)
- Git

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
# For local PostgreSQL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/referral_saas?schema=public"

# Or for Neon (cloud PostgreSQL)
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Authentication
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:5173"

# App URLs
VITE_APP_URL="http://localhost:5173"
VITE_API_URL="http://localhost:3000"
```

### 3. Set Up Database

#### Option A: Using Docker (Recommended)

Start PostgreSQL with Docker Compose:

```bash
docker-compose up -d postgres
```

#### Option B: Using Local PostgreSQL

Make sure PostgreSQL is running locally and create the database:

```bash
createdb referral_saas
```

#### Option C: Using Neon (Cloud)

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string to your `.env` file

### 4. Generate Prisma Client

```bash
npm run prisma:generate
```

### 5. Run Database Migrations

```bash
npm run prisma:migrate
```

When prompted for a migration name, enter: `init`

### 6. Seed the Database (Optional)

Populate the database with demo data:

```bash
npm run prisma:seed
```

This will create:
- Demo organization: "Demo Retail Nepal"
- 4 demo users (business owner, store manager, 2 referrers)
- 2 stores (Kathmandu and Pokhara branches)
- 2 active campaigns
- Sample referrals and rewards

**Demo Login Credentials:**
- Business Owner: `owner@demoretail.np` / `password123`
- Store Manager: `manager@demoretail.np` / `password123`
- Referrer 1: `referrer1@demoretail.np` / `password123`
- Referrer 2: `referrer2@demoretail.np` / `password123`

### 7. Start the Development Servers

You'll need two terminal windows:

**Terminal 1 - Frontend (Vite):**
```bash
npm run dev
```

The frontend will be available at: http://localhost:5173

**Terminal 2 - Backend (Express API):**
```bash
npm run server
```

The API will be available at: http://localhost:3000

### 8. Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **API Health Check**: http://localhost:3000/api/health
- **Prisma Studio** (Database GUI): Run `npm run prisma:studio`

## Testing the Application

1. Go to http://localhost:5173
2. You'll be redirected to the login page
3. Use one of the demo credentials to log in
4. Explore the dashboard, campaigns, referrals, and other features

## Troubleshooting

### Database Connection Issues

If you see database connection errors:

1. Verify PostgreSQL is running:
   ```bash
   # For Docker
   docker-compose ps
   
   # For local PostgreSQL
   pg_isready
   ```

2. Check your `DATABASE_URL` in `.env`
3. Ensure the database exists and is accessible

### Port Already in Use

If port 5173 or 3000 is already in use:

1. Stop the process using the port
2. Or change the port in `vite.config.ts` (frontend) or `.env` (backend)

### Prisma Client Not Found

If you see "Cannot find module '@prisma/client'":

```bash
npm run prisma:generate
```

### Build Errors

If the build fails:

1. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Regenerate Prisma client:
   ```bash
   npm run prisma:generate
   ```

## Development Tools

### Prisma Studio

Visual database browser:

```bash
npm run prisma:studio
```

Access at: http://localhost:5555

### Linting

Check code quality:

```bash
npm run lint
```

### Build for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Next Steps

- Read the [README.md](README.md) for full documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- See [CONTRIBUTING.md](CONTRIBUTING.md) to contribute to the project

## Quick Reference

### Useful Commands

```bash
# Install dependencies
npm install

# Development
npm run dev                    # Start frontend
npm run server                 # Start backend

# Database
npm run prisma:generate        # Generate Prisma client
npm run prisma:migrate         # Run migrations
npm run prisma:studio          # Open Prisma Studio
npm run prisma:seed            # Seed demo data

# Build
npm run build                  # Build for production
npm run preview                # Preview production build

# Code Quality
npm run lint                   # Lint code
```

### Default Ports

- Frontend: 5173
- Backend API: 3000
- Prisma Studio: 5555
- PostgreSQL (Docker): 5432

### Important URLs

- Frontend: http://localhost:5173
- API: http://localhost:3000
- Health Check: http://localhost:3000/api/health
- Prisma Studio: http://localhost:5555

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the error messages carefully
3. Check if all services are running
4. Verify environment variables are set correctly
5. Open an issue on GitHub if the problem persists

Happy coding! 🚀
