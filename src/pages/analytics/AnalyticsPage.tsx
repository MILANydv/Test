import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/shared/Card';

const AnalyticsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('nav.analytics')}</h1>
        <p className="text-muted-foreground">Performance analytics and insights</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Analytics charts and reports coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
