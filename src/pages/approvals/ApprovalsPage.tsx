import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/shared/Card';

const ApprovalsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('nav.approvals')}</h1>
        <p className="text-muted-foreground">Commission approval workflows</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Commission Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Approval workflow features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApprovalsPage;
