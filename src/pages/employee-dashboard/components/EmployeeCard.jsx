import React from 'react';
import Image from '../../../components/AppImage';

import Button from '../../../components/ui/Button';

const EmployeeCard = ({ employee, onViewProfile, onEditEmployee }) => {
  const getStatusColor = (status) => {
    return status === 'active' ?'bg-success/10 text-success border-success/20' :'bg-error/10 text-error border-error/20';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No registrado';
    return new Date(dateString)?.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={employee?.photo}
              alt={employee?.photoAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate">
              {employee?.name} {employee?.surname}
            </h3>
            <p className="text-sm text-muted-foreground">ID: {employee?.employeeId}</p>
            <p className="text-sm text-muted-foreground">{employee?.province}</p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(employee?.status)}`}>
            {employee?.status === 'active' ? 'Activo' : 'Inactivo'}
          </span>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              iconName="Eye"
              onClick={() => onViewProfile(employee)}
              className="h-8 w-8 p-0"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Edit"
              onClick={() => onEditEmployee(employee)}
              className="h-8 w-8 p-0"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">CUIL:</span>
          <p className="font-medium text-foreground">{employee?.cuil}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Email:</span>
          <p className="font-medium text-foreground truncate">{employee?.email}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Fecha de Ingreso:</span>
          <p className="font-medium text-foreground">{formatDate(employee?.startDate)}</p>
        </div>
        {employee?.status === 'inactive' && employee?.inactiveDate && (
          <div>
            <span className="text-muted-foreground">Fecha de Baja:</span>
            <p className="font-medium text-error">{formatDate(employee?.inactiveDate)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;
