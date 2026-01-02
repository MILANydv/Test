import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, LogOut, Globe } from 'lucide-react';
import Button from '../shared/Button';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { logout } = useAuth();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ne' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="h-16 border-b bg-white px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {t('app.tagline')}
        </h2>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={toggleLanguage}>
          <Globe className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" onClick={logout}>
          <LogOut className="h-5 w-5 mr-2" />
          {t('auth.logout')}
        </Button>
      </div>
    </header>
  );
};

export default Header;
