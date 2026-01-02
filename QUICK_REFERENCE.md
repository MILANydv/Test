# Quick Reference Card

## 🚀 Quick Start Commands

```bash
# One-time setup
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

# Start development (recommended)
./dev.sh

# Or start services individually
npm run dev      # Frontend (Terminal 1)
npm run server   # Backend (Terminal 2)
```

## 📱 Access Points

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | React app |
| Backend API | http://localhost:3000 | Express API |
| Health Check | http://localhost:3000/api/health | API status |
| Prisma Studio | http://localhost:5555 | Database GUI |

## 👤 Demo Credentials

| Email | Password | Role |
|-------|----------|------|
| owner@demoretail.np | password123 | Business Owner |
| manager@demoretail.np | password123 | Store Manager |
| referrer1@demoretail.np | password123 | Referrer |
| referrer2@demoretail.np | password123 | Referrer |

## 🛠️ Essential Commands

### Development
```bash
npm run dev              # Start Vite dev server
npm run server           # Start Express API
npm run lint             # Run ESLint
npm run build            # Build for production
npm run preview          # Preview production build
```

### Database
```bash
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio
npm run prisma:seed      # Seed demo data
```

### Docker
```bash
docker-compose up -d              # Start all services
docker-compose up -d postgres     # Start PostgreSQL only
docker-compose down               # Stop all services
docker-compose logs -f            # View logs
```

## 📂 Project Structure

```
src/
├── pages/          # Feature pages
├── components/     # UI components
├── context/        # React context
├── lib/            # Utilities
├── server/         # Express backend
├── types/          # TypeScript types
└── i18n/           # Translations

prisma/
├── schema.prisma   # Database schema
└── seed.ts         # Demo data
```

## 🔌 API Endpoints

### Authentication
```bash
POST /api/auth/register  # Register user
POST /api/auth/login     # Login user
```

### Campaigns
```bash
GET    /api/campaigns      # List campaigns
POST   /api/campaigns      # Create campaign
GET    /api/campaigns/:id  # Get campaign
PUT    /api/campaigns/:id  # Update campaign
DELETE /api/campaigns/:id  # Delete campaign
```

### Referrals
```bash
GET  /api/referrals      # List referrals
POST /api/referrals      # Create referral
GET  /api/referrals/:id  # Get referral
```

### Dashboard
```bash
GET /api/dashboard/metrics  # Get KPIs
```

## 🎨 UI Components

```typescript
// Button
<Button variant="default|destructive|outline|secondary|ghost">
  Click me
</Button>

// Card
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// Badge
<Badge variant="default|success|warning|destructive">
  Status
</Badge>

// Input
<Input type="text" placeholder="Enter text" />
```

## 🌍 i18n Usage

```typescript
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();

// Use translation
<h1>{t('dashboard.title')}</h1>

// Change language
i18n.changeLanguage('ne'); // or 'en'
```

## 🔐 Authentication

```typescript
// Login
const { login } = useAuth();
await login(email, password);

// Logout
const { logout } = useAuth();
await logout();

// Get current user
const { user, isAuthenticated } = useAuth();
```

## 📊 React Query

```typescript
// Fetch data
const { data, isLoading } = useQuery({
  queryKey: ['campaigns'],
  queryFn: () => fetch('/api/campaigns').then(r => r.json())
});

// Mutate data
const mutation = useMutation({
  mutationFn: (data) => 
    fetch('/api/campaigns', {
      method: 'POST',
      body: JSON.stringify(data)
    })
});
```

## 🎯 Common Tasks

### Add a new page
1. Create component in `src/pages/[feature]/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/layout/Sidebar.tsx`
4. Add translations to `src/i18n/locales/`

### Add a new API endpoint
1. Create route in `src/server/routes/`
2. Add to `src/server/index.ts`
3. Add authentication if needed
4. Document in `API.md`

### Add a new database table
1. Update `prisma/schema.prisma`
2. Run `npm run prisma:generate`
3. Create migration: `npm run prisma:migrate`
4. Update seed script if needed

## 🐛 Troubleshooting

### Port in use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Database connection error
```bash
# Check PostgreSQL is running
docker-compose ps
pg_isready

# Verify DATABASE_URL in .env
cat .env | grep DATABASE_URL
```

### Prisma client not found
```bash
npm run prisma:generate
```

### Build errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run prisma:generate
npm run build
```

## 📚 Documentation

| File | Purpose |
|------|---------|
| README.md | Complete documentation |
| SETUP.md | Setup guide |
| API.md | API documentation |
| DEPLOYMENT.md | Deployment guide |
| CONTRIBUTING.md | Contribution guidelines |
| CHANGELOG.md | Version history |
| PROJECT_SUMMARY.md | Project overview |

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Query](https://tanstack.com/query/latest)

## 🔗 Useful Links

- [Neon Console](https://console.neon.tech)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Railway Dashboard](https://railway.app)

---

**Need more help?** Check the full documentation in the files above! 📖
