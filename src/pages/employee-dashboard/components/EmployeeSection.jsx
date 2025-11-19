import React from 'react';
import EmployeeCard from './EmployeeCard';
import Icon from '../../../components/AppIcon';

const EmployeeSection = ({ 
  title, 
  employees, 
  icon, 
  emptyMessage, 
  onViewProfile, 
  onEditEmployee 
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={icon} size={20} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <span className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-sm font-medium">
          {employees?.length}
        </span>
      </div>
      {employees?.length === 0 ? (
        <div className="bg-muted/50 border border-border rounded-lg p-8 text-center">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {employees?.map((employee) => (
            <EmployeeCard
              key={employee?.id}
              employee={employee}
              onViewProfile={onViewProfile}
              onEditEmployee={onEditEmployee}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeSection;