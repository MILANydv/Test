# API Documentation

Base URL: `http://localhost:3000/api`

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### Register User
**POST** `/api/auth/register`

Register a new user and create an organization if they are a business owner.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+977-9841234567",
  "role": "BUSINESS_OWNER",
  "organizationName": "My Company"
}
```

**Response:**
```json
{
  "user": {
    "id": "clx...",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "BUSINESS_OWNER",
    ...
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Login
**POST** `/api/auth/login`

Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "clx...",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "BUSINESS_OWNER",
    ...
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### Campaigns

#### List Campaigns
**GET** `/api/campaigns`

Get all campaigns for the authenticated user's organization.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "clx...",
    "name": "Summer Sale Campaign",
    "description": "Get rewards for referring friends",
    "status": "ACTIVE",
    "commissionType": "PERCENTAGE",
    "commissionValue": 10,
    "startDate": "2024-01-01T00:00:00.000Z",
    "endDate": "2024-12-31T00:00:00.000Z",
    "organization": { ... },
    "campaignStores": [ ... ]
  }
]
```

#### Get Campaign
**GET** `/api/campaigns/:id`

Get a specific campaign by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "clx...",
  "name": "Summer Sale Campaign",
  "description": "Get rewards for referring friends",
  "status": "ACTIVE",
  "commissionType": "PERCENTAGE",
  "commissionValue": 10,
  ...
}
```

#### Create Campaign
**POST** `/api/campaigns`

Create a new campaign.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "New Year Campaign",
  "description": "Special New Year referral rewards",
  "commissionType": "FLAT",
  "commissionValue": 500,
  "status": "DRAFT",
  "startDate": "2024-01-01T00:00:00.000Z",
  "endDate": "2024-12-31T00:00:00.000Z",
  "targetReferrals": 100,
  "terms": "Valid for all new customers"
}
```

**Response:**
```json
{
  "id": "clx...",
  "name": "New Year Campaign",
  ...
}
```

#### Update Campaign
**PUT** `/api/campaigns/:id`

Update an existing campaign.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Updated Campaign Name",
  "status": "ACTIVE"
}
```

**Response:**
```json
{
  "id": "clx...",
  "name": "Updated Campaign Name",
  ...
}
```

#### Delete Campaign
**DELETE** `/api/campaigns/:id`

Delete a campaign.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Campaign deleted successfully"
}
```

---

### Referrals

#### List Referrals
**GET** `/api/referrals`

Get all referrals for the authenticated user's organization.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "clx...",
    "referralCode": "REF-ABC123",
    "referredName": "Jane Smith",
    "referredEmail": "jane@example.com",
    "referredPhone": "+977-9841234567",
    "status": "CONVERTED",
    "source": "WhatsApp",
    "campaign": { ... },
    "store": { ... },
    "referrer": { ... }
  }
]
```

#### Get Referral
**GET** `/api/referrals/:id`

Get a specific referral by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "clx...",
  "referralCode": "REF-ABC123",
  "referredName": "Jane Smith",
  ...
}
```

#### Create Referral
**POST** `/api/referrals`

Create a new referral.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "referralCode": "REF-XYZ789",
  "campaignId": "clx...",
  "storeId": "clx...",
  "referrerId": "clx...",
  "referredName": "Bob Johnson",
  "referredEmail": "bob@example.com",
  "referredPhone": "+977-9841234567",
  "source": "Facebook",
  "status": "INVITED"
}
```

**Response:**
```json
{
  "id": "clx...",
  "referralCode": "REF-XYZ789",
  ...
}
```

---

### Dashboard

#### Get Metrics
**GET** `/api/dashboard/metrics`

Get dashboard metrics and KPIs.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "totalReferrals": 150,
  "activeReferrals": 45,
  "convertedReferrals": 80,
  "totalCommissions": 125000,
  "pendingCommissions": 35000,
  "paidCommissions": 90000,
  "conversionRate": 0.533,
  "topReferrers": [
    {
      "userId": "clx...",
      "name": "John Doe",
      "referralCount": 25,
      "totalCommission": 15000
    }
  ]
}
```

---

### Health Check

#### Health Check
**GET** `/api/health`

Check if the API is running.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Invalid request data"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Data Types

### User Roles
- `ADMIN` - System administrator
- `BUSINESS_OWNER` - Organization owner
- `STORE_MANAGER` - Store/branch manager
- `REFERRER` - User who makes referrals
- `CUSTOMER` - Referred customer

### Campaign Status
- `DRAFT` - Campaign in draft state
- `ACTIVE` - Active campaign
- `PAUSED` - Temporarily paused
- `CLOSED` - Campaign ended

### Referral Status
- `INVITED` - Referral invitation sent
- `SIGNED_UP` - Customer signed up
- `CONVERTED` - Customer made purchase
- `ACTIVE` - Active customer
- `REJECTED` - Referral rejected

### Commission Type
- `FLAT` - Fixed amount commission
- `PERCENTAGE` - Percentage-based commission
- `TIERED` - Multi-tier commission structure

### Commission Status
- `PENDING` - Awaiting approval
- `APPROVED` - Approved by manager
- `REJECTED` - Rejected
- `PAID` - Commission paid out

### Payout Method
- `BANK_TRANSFER` - Direct bank transfer
- `FONEPAY` - Fonepay digital wallet
- `ESEWA` - eSewa digital wallet
- `IME_PAY` - IME Pay digital wallet

---

## Rate Limiting

Currently, there are no rate limits implemented. This will be added in future versions.

## Pagination

Pagination is not yet implemented but will be added for list endpoints in future versions.

## Webhooks

Webhook support for events like:
- New referral created
- Referral status changed
- Commission approved
- Payment processed

Coming in future versions.

---

## Examples

### Complete Registration Flow

1. **Register a new user:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rajesh Kumar",
    "email": "rajesh@example.np",
    "password": "securepassword",
    "phone": "+977-9841234567",
    "role": "BUSINESS_OWNER",
    "organizationName": "Kumar Enterprises"
  }'
```

2. **Use the token for authenticated requests:**
```bash
curl -X GET http://localhost:3000/api/campaigns \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Create a Campaign

```bash
curl -X POST http://localhost:3000/api/campaigns \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dashain Special 2081",
    "description": "Refer friends during Dashain festival",
    "commissionType": "PERCENTAGE",
    "commissionValue": 15,
    "status": "ACTIVE",
    "startDate": "2024-10-01T00:00:00.000Z",
    "endDate": "2024-10-15T00:00:00.000Z",
    "targetReferrals": 200
  }'
```

---

For more information, see the [README.md](README.md) or [SETUP.md](SETUP.md).
