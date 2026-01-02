export type UserRole = 'ADMIN' | 'BUSINESS_OWNER' | 'STORE_MANAGER' | 'REFERRER' | 'CUSTOMER';

export type CampaignStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'CLOSED';

export type ReferralStatus = 'INVITED' | 'SIGNED_UP' | 'CONVERTED' | 'ACTIVE' | 'REJECTED';

export type CommissionType = 'FLAT' | 'PERCENTAGE' | 'TIERED';

export type CommissionStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAID';

export type PayoutMethod = 'BANK_TRANSFER' | 'FONEPAY' | 'ESEWA' | 'IME_PAY';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  organizationId?: string;
  storeIds: string[];
  emailVerified?: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  email: string;
  phone: string;
  pan?: string;
  vat?: string;
  address?: string;
  city?: string;
  country: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Store {
  id: string;
  name: string;
  organizationId: string;
  address?: string;
  city?: string;
  phone?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  organizationId: string;
  commissionType: CommissionType;
  commissionValue: number;
  commissionTiers?: { min: number; max: number; value: number }[];
  status: CampaignStatus;
  startDate: Date;
  endDate?: Date;
  targetReferrals?: number;
  maxCommissionPerReferrer?: number;
  terms?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Referral {
  id: string;
  referralCode: string;
  campaignId: string;
  storeId: string;
  referrerId: string;
  referredCustomerId?: string;
  referredName?: string;
  referredEmail?: string;
  referredPhone?: string;
  source?: string;
  status: ReferralStatus;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReferralReward {
  id: string;
  referralId: string;
  userId: string;
  amount: number;
  currency: string;
  commissionType: CommissionType;
  status: CommissionStatus;
  approvedBy?: string;
  approvedAt?: Date;
  paidAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardMetrics {
  totalReferrals: number;
  activeReferrals: number;
  convertedReferrals: number;
  totalCommissions: number;
  pendingCommissions: number;
  paidCommissions: number;
  conversionRate: number;
  topReferrers: {
    userId: string;
    name: string;
    referralCount: number;
    totalCommission: number;
  }[];
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
  organizationName?: string;
}
