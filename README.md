# Referral Management SaaS for Nepal

A comprehensive, developer-focused referral management system built specifically for the Nepali market. This campaign-based referral tracking system includes multi-store/branch support, commission management, and approval workflows.

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript, Vite
- **Routing**: React Router v6
- **State Management**: TanStack React Query (React Query)
- **Database**: Prisma ORM + PostgreSQL (Neon)
- **Authentication**: JWT-based authentication
- **UI/Styling**: Tailwind CSS + Custom Components (shadcn-inspired)
- **Icons**: lucide-react
- **Forms**: react-hook-form + zod validation
- **Charts**: Recharts (for analytics)
- **Backend**: Node.js + Express
- **Internationalization**: i18next (English & Nepali)

## 📋 Features

### Core Features
- ✅ Dashboard with KPI metrics
- ✅ Campaign management (CRUD operations)
- ✅ Referral tracking with unique codes
- ✅ Multi-store/branch support
- ✅ Commission calculation & rewards
- ✅ Role-based access control (RBAC)
- ✅ Commission approval workflows
- ✅ Analytics & reporting
- ✅ User management
- ✅ Audit logging

### Nepali-Specific Features
- 🇳🇵 Dual language support (English/Nepali)
- 💰 NPR currency formatting
- 📱 Nepali phone number validation
- 🏦 Payment gateway integrations (Fonepay, eSewa, IME Pay)
- 📄 PAN/VAT support for businesses

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (or Neon account)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd project
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your database connection:
```env
DATABASE_URL="postgresql://user:password@host/database?schema=public"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:5173"
VITE_APP_URL="http://localhost:5173"
VITE_API_URL="http://localhost:3000"
```

4. **Generate Prisma client**
```bash
npm run prisma:generate
```

5. **Run database migrations**
```bash
npm run prisma:migrate
```

### Running the Application

**Terminal 1 - Frontend (Vite)**
```bash
npm run dev
```
The frontend will be available at `http://localhost:5173`

**Terminal 2 - Backend (Express)**
```bash
npm run server
```
The API will be available at `http://localhost:3000`

### Development Tools

- **Prisma Studio** - Database GUI
```bash
npm run prisma:studio
```

- **Lint Code**
```bash
npm run lint
```

- **Build for Production**
```bash
npm run build
```

## 📊 Database Schema

### Main Entities
- **User** - System users (Business Owners, Store Managers, Referrers, Customers)
- **Organization** - Business accounts
- **Store** - Multi-store/branch support
- **Campaign** - Referral campaigns with commission structures
- **Referral** - Individual referral tracking
- **ReferralReward** - Commission calculations
- **CommissionApproval** - Approval workflow
- **Transaction** - Payout records
- **AuditLog** - Compliance tracking

## 🎨 Project Structure

```
src/
├── pages/                    # Feature pages
│   ├── dashboard/           # KPI cards, referral metrics
│   ├── campaigns/           # Campaign CRUD
│   ├── referrals/           # Referral tracking
│   ├── rewards/             # Commission tracking
│   ├── analytics/           # Performance dashboards
│   ├── users/               # User management
│   ├── stores/              # Multi-store management
│   ├── settings/            # App settings
│   ├── approvals/           # Commission approvals
│   └── auth/                # Login/Register
├── components/              # Reusable UI components
│   ├── layout/              # Layout components
│   ├── shared/              # Shared components (Button, Card, etc.)
│   └── [feature]/           # Feature-specific components
├── hooks/                   # Custom React hooks
├── context/                 # React context (Auth)
├── lib/                     # Utilities & helpers
├── integrations/            # Prisma client, external APIs
├── styles/                  # Global styles, Tailwind
├── types/                   # TypeScript definitions
├── i18n/                    # Internationalization
└── server/                  # Express backend
    ├── routes/              # API routes
    ├── middleware/          # Auth middleware
    └── utils/               # Server utilities
```

## 🔐 Authentication

The system uses JWT-based authentication with the following roles:
- **ADMIN** - System-wide access
- **BUSINESS_OWNER** - Full organization control
- **STORE_MANAGER** - Store-level management
- **REFERRER** - Track personal referrals
- **CUSTOMER** - View referral status

## 🌍 Internationalization

Switch between English and Nepali using the language toggle in the header.

To add/edit translations:
- `src/i18n/locales/en.json` - English translations
- `src/i18n/locales/ne.json` - Nepali translations

## 💳 Payment Integrations

The system supports Nepali payment gateways:
- **Fonepay** - Digital wallet
- **eSewa** - Digital wallet
- **IME Pay** - Digital wallet
- **Bank Transfer** - Direct bank transfers

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Campaigns
- `GET /api/campaigns` - List campaigns
- `GET /api/campaigns/:id` - Get campaign
- `POST /api/campaigns` - Create campaign
- `PUT /api/campaigns/:id` - Update campaign
- `DELETE /api/campaigns/:id` - Delete campaign

### Referrals
- `GET /api/referrals` - List referrals
- `GET /api/referrals/:id` - Get referral
- `POST /api/referrals` - Create referral

### Dashboard
- `GET /api/dashboard/metrics` - Dashboard metrics

## 🚀 Deployment

### Frontend (Vite)
Deploy to:
- Vercel
- Netlify
- AWS S3 + CloudFront

### Backend (Express)
Deploy to:
- Railway
- Render
- Heroku
- AWS EC2/ECS

### Database
- Neon (PostgreSQL)
- Supabase
- AWS RDS

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built for the Nepali business community
- Designed with developer experience in mind
- Inspired by modern SaaS best practices

---

**Made with ❤️ for Nepal**
