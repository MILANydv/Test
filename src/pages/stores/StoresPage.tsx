import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/shared/Card';

const StoresPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('nav.stores')}</h1>
        <p className="text-muted-foreground">Manage stores and branches</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Store Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Multi-store management features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoresPage;
