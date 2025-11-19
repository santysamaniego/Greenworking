import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PersonalDataTab = ({ employee, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: employee?.firstName,
    lastName: employee?.lastName,
    cuil: employee?.cuil,
    email: employee?.email,
    phone: employee?.phone,
    address: employee?.address,
    province: employee?.province,
    birthDate: employee?.birthDate,
    dni: employee?.dni
  });

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: employee?.firstName,
      lastName: employee?.lastName,
      cuil: employee?.cuil,
      email: employee?.email,
      phone: employee?.phone,
      address: employee?.address,
      province: employee?.province,
      birthDate: employee?.birthDate,
      dni: employee?.dni
    });
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground">Editar Datos Personales</h3>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Guardar
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nombre"
            value={formData?.firstName}
            onChange={(e) => handleChange('firstName', e?.target?.value)}
            required
          />
          <Input
            label="Apellido"
            value={formData?.lastName}
            onChange={(e) => handleChange('lastName', e?.target?.value)}
            required
          />
          <Input
            label="CUIL"
            value={formData?.cuil}
            onChange={(e) => handleChange('cuil', e?.target?.value)}
            required
          />
          <Input
            label="DNI"
            value={formData?.dni}
            onChange={(e) => handleChange('dni', e?.target?.value)}
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData?.email}
            onChange={(e) => handleChange('email', e?.target?.value)}
            required
          />
          <Input
            label="Teléfono"
            type="tel"
            value={formData?.phone}
            onChange={(e) => handleChange('phone', e?.target?.value)}
          />
          <Input
            label="Fecha de Nacimiento"
            type="date"
            value={formData?.birthDate}
            onChange={(e) => handleChange('birthDate', e?.target?.value)}
          />
          <Input
            label="Provincia"
            value={formData?.province}
            onChange={(e) => handleChange('province', e?.target?.value)}
            required
          />
          <div className="md:col-span-2">
            <Input
              label="Dirección"
              value={formData?.address}
              onChange={(e) => handleChange('address', e?.target?.value)}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">Datos Personales</h3>
        <Button
          variant="outline"
          iconName="Edit"
          iconPosition="left"
          onClick={() => setIsEditing(true)}
        >
          Editar
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="User" size={16} />
            <span>Nombre Completo</span>
          </div>
          <p className="text-foreground font-medium">{employee?.firstName} {employee?.lastName}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="CreditCard" size={16} />
            <span>CUIL</span>
          </div>
          <p className="text-foreground font-medium">{employee?.cuil}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="IdCard" size={16} />
            <span>DNI</span>
          </div>
          <p className="text-foreground font-medium">{employee?.dni}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Mail" size={16} />
            <span>Email</span>
          </div>
          <p className="text-foreground font-medium">{employee?.email}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Phone" size={16} />
            <span>Teléfono</span>
          </div>
          <p className="text-foreground font-medium">{employee?.phone || 'No especificado'}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Calendar" size={16} />
            <span>Fecha de Nacimiento</span>
          </div>
          <p className="text-foreground font-medium">{employee?.birthDate || 'No especificado'}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="MapPin" size={16} />
            <span>Provincia</span>
          </div>
          <p className="text-foreground font-medium">{employee?.province}</p>
        </div>
        
        <div className="md:col-span-2 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Home" size={16} />
            <span>Dirección</span>
          </div>
          <p className="text-foreground font-medium">{employee?.address || 'No especificado'}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalDataTab;