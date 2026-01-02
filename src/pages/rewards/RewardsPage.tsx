import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/shared/Card';

const RewardsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('nav.rewards')}</h1>
        <p className="text-muted-foreground">Manage commission rewards and payouts</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Rewards & Commissions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Rewards management coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardsPage;
