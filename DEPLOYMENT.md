# Deployment Guide

This guide covers deploying the Referral Management SaaS to production.

## Prerequisites

- Git repository (GitHub, GitLab, etc.)
- Database (Neon, Supabase, or PostgreSQL)
- Domain name (optional)
- Deployment platforms accounts

## Database Setup (Neon)

1. Create a free account at [Neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Update your `.env` file:
```env
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

## Frontend Deployment (Vercel)

### Option 1: Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel Dashboard:
- `VITE_APP_URL`
- `VITE_API_URL`

### Option 2: GitHub Integration

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add environment variables
7. Deploy

## Backend Deployment (Railway)

1. Create account at [railway.app](https://railway.app)
2. Create new project
3. Add PostgreSQL database (or connect Neon)
4. Deploy from GitHub:
   - Select repository
   - Set root directory (if needed)
   - Configure start command: `npm run server`
5. Set environment variables:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - `PORT` (Railway provides this)
6. Deploy

## Alternative Backend Options

### Render

1. Create account at [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - Build Command: `npm install`
   - Start Command: `npm run server`
5. Add environment variables
6. Deploy

### Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Add PostgreSQL: `heroku addons:create heroku-postgresql:hobby-dev`
5. Set env vars: `heroku config:set KEY=VALUE`
6. Deploy: `git push heroku main`

## Docker Deployment

### Build and Run Locally

```bash
docker-compose up -d
```

### Deploy to AWS ECS

1. Build image:
```bash
docker build -t referral-saas .
```

2. Push to ECR:
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ECR_URL
docker tag referral-saas:latest YOUR_ECR_URL/referral-saas:latest
docker push YOUR_ECR_URL/referral-saas:latest
```

3. Create ECS task definition and service

### Deploy to DigitalOcean

1. Create Droplet
2. Install Docker:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

3. Clone repository and deploy:
```bash
git clone your-repo
cd your-repo
docker-compose up -d
```

## Environment Variables

### Production Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@host/database?schema=public"

# Authentication
NEXTAUTH_SECRET="generate-a-secure-random-string"
NEXTAUTH_URL="https://yourdomain.com"

# App URLs
VITE_APP_URL="https://yourdomain.com"
VITE_API_URL="https://api.yourdomain.com"

# Node Environment
NODE_ENV="production"

# Port (for backend)
PORT=3000
```

## Database Migration

Before deploying, run migrations:

```bash
npm run prisma:migrate
```

## SSL/HTTPS Setup

### Using Cloudflare

1. Add your domain to Cloudflare
2. Update nameservers
3. Enable "Always Use HTTPS"
4. Configure SSL/TLS to "Full"

### Using Let's Encrypt (self-hosted)

```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## Monitoring & Logging

### Sentry (Error Tracking)

1. Create account at [sentry.io](https://sentry.io)
2. Install SDK:
```bash
npm install @sentry/react
```

3. Configure in `src/main.tsx`:
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production",
});
```

### LogRocket (Session Replay)

```bash
npm install logrocket
```

## Performance Optimization

### Build Optimization

1. Enable compression in Vite:
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
});
```

2. Use CDN for assets
3. Enable caching headers

## Backup Strategy

### Database Backups

#### Neon
- Automatic backups included
- Enable point-in-time recovery

#### Self-hosted
```bash
# Backup
pg_dump -U username database_name > backup.sql

# Restore
psql -U username database_name < backup.sql
```

### Automated Backups Script

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DATABASE_URL="your-database-url"

pg_dump $DATABASE_URL > $BACKUP_DIR/backup_$DATE.sql

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
```

## Domain Configuration

1. Add A record pointing to your server IP
2. Add CNAME record for www
3. Add CNAME for API subdomain

Example DNS records:
```
A     @       your-server-ip
CNAME www     your-app.vercel.app
CNAME api     your-backend.railway.app
```

## Health Checks

Add health check endpoint in your backend:

```typescript
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
```

## Scaling Considerations

1. **Database**: Upgrade to production tier on Neon
2. **Backend**: Enable auto-scaling on Railway/Render
3. **Frontend**: Vercel handles this automatically
4. **CDN**: Use Cloudflare for global distribution
5. **Load Balancer**: Add when traffic increases

## Security Checklist

- [ ] Enable HTTPS
- [ ] Set secure environment variables
- [ ] Enable CORS with specific origins
- [ ] Use strong JWT secrets
- [ ] Enable rate limiting
- [ ] Set up WAF (Web Application Firewall)
- [ ] Regular security updates
- [ ] Database encryption at rest
- [ ] Implement audit logging

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check DATABASE_URL format
   - Verify network access
   - Check SSL mode

2. **Build Failures**
   - Clear node_modules and reinstall
   - Check Node.js version
   - Verify all dependencies

3. **CORS Errors**
   - Update CORS configuration
   - Check allowed origins
   - Verify API URL

## Maintenance

### Regular Tasks

1. Update dependencies monthly
2. Review and rotate secrets quarterly
3. Check logs for errors
4. Monitor performance metrics
5. Review database query performance

## Support

For deployment issues:
1. Check deployment platform status
2. Review application logs
3. Check database logs
4. Verify environment variables
5. Test API endpoints

---

**Need help?** Open an issue on GitHub or contact support.
