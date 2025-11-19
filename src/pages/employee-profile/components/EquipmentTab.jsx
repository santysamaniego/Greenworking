import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EquipmentTab = ({ employee, onEquipmentUpdate }) => {
  const [activeSection, setActiveSection] = useState('uniforms');

  const uniformItems = [
    {
      id: 'pants',
      name: 'Pantalones',
      icon: 'Shirt',
      assigned: employee?.equipment?.uniforms?.pants || [],
      sizeRange: '40-60'
    },
    {
      id: 'polo',
      name: 'Camisas Polo',
      icon: 'Shirt',
      assigned: employee?.equipment?.uniforms?.polo || [],
      sizeRange: 'S-XXXL'
    },
    {
      id: 'tshirt',
      name: 'Remeras',
      icon: 'Shirt',
      assigned: employee?.equipment?.uniforms?.tshirt || [],
      sizeRange: 'S-XXXL'
    },
    {
      id: 'sweatshirt',
      name: 'Buzos',
      icon: 'Shirt',
      assigned: employee?.equipment?.uniforms?.sweatshirt || [],
      sizeRange: 'S-XXXL'
    },
    {
      id: 'jacket',
      name: 'Camperas',
      icon: 'Shirt',
      assigned: employee?.equipment?.uniforms?.jacket || [],
      sizeRange: 'S-XXXL'
    },
    {
      id: 'shoes',
      name: 'Calzado',
      icon: 'Footprints',
      assigned: employee?.equipment?.uniforms?.shoes || [],
      sizeRange: '39-50'
    }
  ];

  const devices = [
    {
      id: 'computer',
      name: 'Computadora',
      icon: 'Monitor',
      assigned: employee?.equipment?.computer,
      policy: 'single_device'
    },
    {
      id: 'phone',
      name: 'Teléfono Móvil',
      icon: 'Smartphone',
      assigned: employee?.equipment?.phone,
      policy: 'single_device'
    }
  ];

  const tools = employee?.equipment?.tools || [];

  const getStatusBadge = (status) => {
    const statusConfig = {
      assigned: { color: 'bg-green-100 text-green-800', icon: 'CheckCircle', text: 'Asignado' },
      returned: { color: 'bg-blue-100 text-blue-800', icon: 'RotateCcw', text: 'Devuelto' },
      lost: { color: 'bg-red-100 text-red-800', icon: 'AlertTriangle', text: 'Perdido' },
      damaged: { color: 'bg-orange-100 text-orange-800', icon: 'AlertCircle', text: 'Dañado' }
    };

    const config = statusConfig?.[status] || statusConfig?.assigned;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} className="mr-1" />
        {config?.text}
      </span>
    );
  };

  const handleAssignEquipment = (type, itemId) => {
    console.log('Assigning equipment:', type, itemId);
    onEquipmentUpdate(type, itemId, {
      assignedDate: new Date()?.toLocaleDateString('es-AR'),
      status: 'assigned'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">Equipamiento y Uniformes</h3>
        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
        >
          Asignar Equipo
        </Button>
      </div>
      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border">
        {[
          { id: 'uniforms', label: 'Uniformes', icon: 'Shirt' },
          { id: 'devices', label: 'Dispositivos', icon: 'Monitor' },
          { id: 'tools', label: 'Herramientas', icon: 'Wrench' }
        ]?.map((section) => (
          <button
            key={section?.id}
            onClick={() => setActiveSection(section?.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-smooth ${
              activeSection === section?.id
                ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={section?.icon} size={16} />
            {section?.label}
          </button>
        ))}
      </div>
      {/* Uniforms Section */}
      {activeSection === 'uniforms' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {uniformItems?.map((item) => (
            <div key={item?.id} className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={item?.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{item?.name}</h4>
                  <p className="text-xs text-muted-foreground">Talles: {item?.sizeRange}</p>
                </div>
              </div>

              {item?.assigned?.length > 0 ? (
                <div className="space-y-2">
                  {item?.assigned?.map((assignment, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-card rounded border">
                      <div className="text-sm">
                        <p className="font-medium">Talle: {assignment?.size}</p>
                        <p className="text-muted-foreground">Entregado: {assignment?.deliveryDate}</p>
                      </div>
                      {getStatusBadge(assignment?.status)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground mb-2">Sin asignaciones</p>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Plus"
                    iconPosition="left"
                    onClick={() => handleAssignEquipment('uniform', item?.id)}
                  >
                    Asignar
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Devices Section */}
      {activeSection === 'devices' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {devices?.map((device) => (
            <div key={device?.id} className="bg-muted/50 border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={device?.icon} size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-foreground">{device?.name}</h4>
                  <p className="text-sm text-muted-foreground">Política: Un dispositivo por empleado</p>
                </div>
              </div>

              {device?.assigned ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Estado:</span>
                    {getStatusBadge(device?.assigned?.status)}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Modelo:</span>
                      <p className="font-medium">{device?.assigned?.model}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Serie:</span>
                      <p className="font-medium">{device?.assigned?.serialNumber}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Asignado:</span>
                      <p className="font-medium">{device?.assigned?.assignedDate}</p>
                    </div>
                    {device?.assigned?.returnDate && (
                      <div>
                        <span className="text-muted-foreground">Devuelto:</span>
                        <p className="font-medium">{device?.assigned?.returnDate}</p>
                      </div>
                    )}
                  </div>
                  {device?.assigned?.notes && (
                    <div className="mt-3 p-3 bg-card rounded border">
                      <span className="text-sm text-muted-foreground">Notas:</span>
                      <p className="text-sm mt-1">{device?.assigned?.notes}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">No hay dispositivo asignado</p>
                  <Button
                    variant="outline"
                    iconName="Plus"
                    iconPosition="left"
                    onClick={() => handleAssignEquipment('device', device?.id)}
                  >
                    Asignar {device?.name}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Tools Section */}
      {activeSection === 'tools' && (
        <div className="space-y-4">
          {tools?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools?.map((tool, index) => (
                <div key={index} className="bg-muted/50 border border-border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Wrench" size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{tool?.name}</h4>
                      <p className="text-sm text-muted-foreground">{tool?.category}</p>
                    </div>
                    {getStatusBadge(tool?.status)}
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Entregado:</span>
                      <span className="font-medium">{tool?.deliveryDate}</span>
                    </div>
                    {tool?.serialNumber && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Serie:</span>
                        <span className="font-medium">{tool?.serialNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/50 rounded-lg border border-border">
              <Icon name="Wrench" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No hay herramientas asignadas</p>
              <Button
                variant="outline"
                iconName="Plus"
                iconPosition="left"
                onClick={() => handleAssignEquipment('tool', 'new')}
              >
                Asignar Herramienta
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EquipmentTab;