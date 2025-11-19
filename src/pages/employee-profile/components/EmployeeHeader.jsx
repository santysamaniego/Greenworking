import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmployeeHeader = ({ employee, onStatusChange, onEdit }) => {
  const getStatusBadge = (status) => {
    if (status === 'active') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <Icon name="CheckCircle" size={14} className="mr-1" />
          Activo
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <Icon name="XCircle" size={14} className="mr-1" />
        Inactivo
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative">
            <Image
              src={employee?.photo}
              alt={employee?.photoAlt}
              className="w-20 h-20 rounded-full object-cover border-2 border-border"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-card border-2 border-border rounded-full flex items-center justify-center">
              {employee?.status === 'active' ? (
                <Icon name="CheckCircle" size={14} className="text-green-600" />
              ) : (
                <Icon name="XCircle" size={14} className="text-red-600" />
              )}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <h1 className="text-2xl font-semibold text-foreground">
                {employee?.firstName} {employee?.lastName}
              </h1>
              {getStatusBadge(employee?.status)}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="Hash" size={16} />
                <span>ID: {employee?.employeeId}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CreditCard" size={16} />
                <span>CUIL: {employee?.cuil}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Mail" size={16} />
                <span>{employee?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={16} />
                <span>Inicio: {employee?.startDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={16} />
                <span>{employee?.province}</span>
              </div>
              {employee?.status === 'inactive' && employee?.inactiveDate && (
                <div className="flex items-center gap-2">
                  <Icon name="CalendarX" size={16} />
                  <span>Inactivo desde: {employee?.inactiveDate}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            iconName="Edit"
            iconPosition="left"
            onClick={onEdit}
          >
            Editar
          </Button>
          
          <Button
            variant={employee?.status === 'active' ? 'destructive' : 'success'}
            iconName={employee?.status === 'active' ? 'UserX' : 'UserCheck'}
            iconPosition="left"
            onClick={() => onStatusChange(employee?.status === 'active' ? 'inactive' : 'active')}
          >
            {employee?.status === 'active' ? 'Desactivar' : 'Activar'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHeader;