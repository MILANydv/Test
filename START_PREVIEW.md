# 🚀 Quick Start Preview Guide

## Prerequisites Complete ✅

- ✅ Dependencies installed
- ✅ Database created (SQLite)
- ✅ Prisma client generated
- ✅ Migrations applied

## Start the Application

### Option 1: Using the dev script (Recommended)

```bash
./dev.sh
```

This will start both frontend and backend automatically.

### Option 2: Manual startup (2 terminals)

**Terminal 1 - Backend API:**
```bash
npm run server
```
The API will be available at: http://localhost:3000

**Terminal 2 - Frontend:**
```bash
npm run dev
```
The app will be available at: http://localhost:5173

## First Time Setup

Since the seed script has adapter issues with Prisma v7, you'll need to create a user via the registration page.

### Create Your First User

1. Open http://localhost:5173 in your browser
2. You'll be redirected to the login page
3. Click on "Don't have an account? Register"
4. Fill in the registration form:
   - Name: Your Name
   - Email: your@email.com
   - Password: password123
   - Phone: +977-9841234567
   - Organization Name: Your Company

5. Click "Register" to create your account
6. You'll be automatically logged in and redirected to the dashboard

##  Access Points

| Service | URL | Description |
|---------|-----|-------------|
| Frontend App | http://localhost:5173 | Main application |
| Backend API | http://localhost:3000 | API server |
| Health Check | http://localhost:3000/api/health | API status |
| Prisma Studio | http://localhost:5555 | Database GUI (run `npm run prisma:studio`) |

## Test the API

### Health Check
```bash
curl http://localhost:3000/api/health
```

### Register a User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "+977-9841234567",
    "role": "BUSINESS_OWNER",
    "organizationName": "Test Company"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Troubleshooting

### Port Already in Use

If you see "Port 5173 already in use":
```bash
# Kill the process
lsof -ti:5173 | xargs kill -9
```

If you see "Port 3000 already in use":
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9
```

### Database Issues

If you need to reset the database:
```bash
rm dev.db
npm run prisma:migrate
```

### Prisma Client Issues

If you see Prisma client errors:
```bash
npm run prisma:generate
```

## What's Working

✅ **Frontend**
- Login/Register pages
- Dashboard with KPI cards
- Campaigns list page
- Referrals list page
- All navigation
- Language toggle (English/Nepali)
- Responsive design

✅ **Backend**
- User registration
- User login (JWT tokens)
- Protected API routes
- Campaign CRUD endpoints
- Referral endpoints
- Dashboard metrics endpoint

✅ **Database**
- SQLite database
- All tables created
- Relationships configured

## Next Steps

Once you've registered and logged in:

1. **Explore the Dashboard** - View KPI metrics
2. **Create a Campaign** - Go to Campaigns page
3. **Add Referrals** - Go to Referrals page
4. **Check Analytics** - View performance data
5. **Manage Users** - Add team members

## Need Help?

Check the full documentation:
- [README.md](README.md) - Complete documentation
- [SETUP.md](SETUP.md) - Setup guide
- [API.md](API.md) - API documentation
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Quick reference

---

**Ready to start! 🎉**

Run `./dev.sh` to launch the application!
