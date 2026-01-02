import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Plus, Edit, Eye, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Badge from '../../components/shared/Badge';
import { formatDate, formatCurrency } from '../../lib/utils';
import type { Campaign } from '../../types';

const CampaignsPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: campaigns, isLoading } = useQuery<Campaign[]>({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const response = await fetch('/api/campaigns', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch campaigns');
      return response.json();
    },
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'PAUSED':
        return 'warning';
      case 'CLOSED':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">{t('common.loading')}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('campaigns.title')}</h1>
          <p className="text-muted-foreground">Manage your referral campaigns</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t('campaigns.createCampaign')}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Campaigns</CardTitle>
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
                  <th className="text-left py-3 px-4 font-medium">{t('campaigns.name')}</th>
                  <th className="text-left py-3 px-4 font-medium">{t('campaigns.status')}</th>
                  <th className="text-left py-3 px-4 font-medium">{t('campaigns.commissionType')}</th>
                  <th className="text-left py-3 px-4 font-medium">{t('campaigns.commissionValue')}</th>
                  <th className="text-left py-3 px-4 font-medium">{t('campaigns.startDate')}</th>
                  <th className="text-left py-3 px-4 font-medium">{t('campaigns.endDate')}</th>
                  <th className="text-right py-3 px-4 font-medium">{t('common.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {campaigns && campaigns.length > 0 ? (
                  campaigns
                    .filter((campaign) =>
                      campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((campaign) => (
                      <tr key={campaign.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{campaign.name}</td>
                        <td className="py-3 px-4">
                          <Badge variant={getStatusBadgeVariant(campaign.status)}>
                            {campaign.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{campaign.commissionType}</td>
                        <td className="py-3 px-4">
                          {campaign.commissionType === 'PERCENTAGE'
                            ? `${campaign.commissionValue}%`
                            : formatCurrency(campaign.commissionValue)}
                        </td>
                        <td className="py-3 px-4">{formatDate(campaign.startDate)}</td>
                        <td className="py-3 px-4">
                          {campaign.endDate ? formatDate(campaign.endDate) : 'N/A'}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                      No campaigns found. Create your first campaign to get started.
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

export default CampaignsPage;
