import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Megaphone,
  Users,
  Award,
  BarChart3,
  Store,
  Settings,
  CheckSquare,
  UserCircle2,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { user } = useAuth();

  const navigation = [
    { name: t('nav.dashboard'), href: '/dashboard', icon: LayoutDashboard },
    { name: t('nav.campaigns'), href: '/campaigns', icon: Megaphone },
    { name: t('nav.referrals'), href: '/referrals', icon: UserCircle2 },
    { name: t('nav.rewards'), href: '/rewards', icon: Award },
    { name: t('nav.analytics'), href: '/analytics', icon: BarChart3 },
    { name: t('nav.users'), href: '/users', icon: Users },
    { name: t('nav.stores'), href: '/stores', icon: Store },
    { name: t('nav.approvals'), href: '/approvals', icon: CheckSquare },
    { name: t('nav.settings'), href: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
        <h1 className="text-xl font-bold">{t('app.name')}</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      {user && (
        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-sm font-medium">{user.name.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-400">{user.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
