import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Users, UserCheck, TrendingUp, DollarSign, Clock, CheckCircle } from 'lucide-react';
import MetricCard from '../../components/dashboard/MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/shared/Card';
import { formatCurrency } from '../../lib/utils';
import type { DashboardMetrics } from '../../types';

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();

  const { data: metrics, isLoading } = useQuery<DashboardMetrics>({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/metrics', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch metrics');
      return response.json();
    },
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">{t('common.loading')}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground">{t('app.tagline')}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title={t('dashboard.totalReferrals')}
          value={metrics?.totalReferrals || 0}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title={t('dashboard.activeReferrals')}
          value={metrics?.activeReferrals || 0}
          icon={UserCheck}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title={t('dashboard.convertedReferrals')}
          value={metrics?.convertedReferrals || 0}
          icon={CheckCircle}
        />
        <MetricCard
          title={t('dashboard.totalCommissions')}
          value={formatCurrency(metrics?.totalCommissions || 0)}
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
        <MetricCard
          title={t('dashboard.pendingCommissions')}
          value={formatCurrency(metrics?.pendingCommissions || 0)}
          icon={Clock}
        />
        <MetricCard
          title={t('dashboard.conversionRate')}
          value={`${((metrics?.conversionRate || 0) * 100).toFixed(1)}%`}
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.topReferrers')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics?.topReferrers && metrics.topReferrers.length > 0 ? (
                metrics.topReferrers.map((referrer, index) => (
                  <div key={referrer.userId} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{referrer.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {referrer.referralCount} referrals
                        </p>
                      </div>
                    </div>
                    <div className="text-sm font-semibold">
                      {formatCurrency(referrer.totalCommission)}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No data available</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">No recent activity</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
