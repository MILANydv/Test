import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/shared/Card';
import Badge from '../../components/shared/Badge';
import Button from '../../components/shared/Button';
import { formatDateTime } from '../../lib/utils';
import type { Referral } from '../../types';

const ReferralsPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: referrals, isLoading } = useQuery<Referral[]>({
    queryKey: ['referrals'],
    queryFn: async () => {
      const response = await fetch('/api/referrals', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch referrals');
      return response.json();
    },
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'CONVERTED':
        return 'success';
      case 'SIGNED_UP':
        return 'warning';
      case 'REJECTED':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const copyReferralCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">{t('common.loading')}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('referrals.title')}</h1>
          <p className="text-muted-foreground">Track and manage all referrals</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Referrals</CardTitle>
            <input
              type="text"
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 px-3 py-2 border rounded-md"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">{t('referrals.referralCode')}</th>
                  <th className="text-left py-3 px-4 font-medium">{t('referrals.customer')}</th>
                  <th className="text-left py-3 px-4 font-medium">{t('referrals.status')}</th>
                  <th className="text-left py-3 px-4 font-medium">{t('referrals.source')}</th>
                  <th className="text-left py-3 px-4 font-medium">{t('referrals.createdAt')}</th>
                  <th className="text-right py-3 px-4 font-medium">{t('common.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {referrals && referrals.length > 0 ? (
                  referrals
                    .filter((referral) =>
                      referral.referralCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      referral.referredName?.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((referral) => (
                      <tr key={referral.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <code className="px-2 py-1 bg-gray-100 rounded text-sm">
                              {referral.referralCode}
                            </code>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => copyReferralCode(referral.referralCode)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{referral.referredName || 'Pending'}</p>
                            <p className="text-sm text-muted-foreground">{referral.referredEmail}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={getStatusBadgeVariant(referral.status)}>
                            {referral.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{referral.source || 'Direct'}</td>
                        <td className="py-3 px-4">{formatDateTime(referral.createdAt)}</td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm">
                              {t('common.view')}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      No referrals found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralsPage;
