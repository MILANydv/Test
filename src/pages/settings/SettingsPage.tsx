import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/shared/Card';

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('nav.settings')}</h1>
        <p className="text-muted-foreground">Configure your application settings</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Settings management features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
