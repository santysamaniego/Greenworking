import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Empleados',
      value: stats?.total,
      icon: 'Users',
      color: 'bg-blue-500/10 text-blue-600',
      iconBg: 'bg-blue-500/20'
    },
    {
      title: 'Empleados Activos',
      value: stats?.active,
      icon: 'UserCheck',
      color: 'bg-success/10 text-success',
      iconBg: 'bg-success/20'
    },
    {
      title: 'Empleados Inactivos',
      value: stats?.inactive,
      icon: 'UserX',
      color: 'bg-error/10 text-error',
      iconBg: 'bg-error/20'
    },
    {
      title: 'Nuevos Este Mes',
      value: stats?.newThisMonth,
      icon: 'UserPlus',
      color: 'bg-accent/10 text-accent',
      iconBg: 'bg-accent/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat?.title}</p>
              <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat?.iconBg}`}>
              <Icon name={stat?.icon} size={24} className={stat?.color?.split(' ')?.[1]} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;