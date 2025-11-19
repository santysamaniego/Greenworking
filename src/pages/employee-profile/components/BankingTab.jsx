import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BankingTab = ({ employee, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    cbu: employee?.banking?.cbu || '',
    bankName: employee?.banking?.bankName || '',
    accountType: employee?.banking?.accountType || '',
    coden: employee?.benefits?.coden || '',
    socialSecurity: employee?.benefits?.socialSecurity || '',
    healthInsurance: employee?.benefits?.healthInsurance || ''
  });

  const handleSave = () => {
    onUpdate({
      banking: {
        cbu: formData?.cbu,
        bankName: formData?.bankName,
        accountType: formData?.accountType
      },
      benefits: {
        coden: formData?.coden,
        socialSecurity: formData?.socialSecurity,
        healthInsurance: formData?.healthInsurance
      }
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      cbu: employee?.banking?.cbu || '',
      bankName: employee?.banking?.bankName || '',
      accountType: employee?.banking?.accountType || '',
      coden: employee?.benefits?.coden || '',
      socialSecurity: employee?.benefits?.socialSecurity || '',
      healthInsurance: employee?.benefits?.healthInsurance || ''
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
          <h3 className="text-lg font-medium text-foreground">Editar Información Bancaria y Beneficios</h3>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Guardar
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Banking Information */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-foreground border-b border-border pb-2">
              Información Bancaria
            </h4>
            <Input
              label="CBU"
              value={formData?.cbu}
              onChange={(e) => handleChange('cbu', e?.target?.value)}
              placeholder="0000000000000000000000"
              maxLength={22}
            />
            <Input
              label="Banco"
              value={formData?.bankName}
              onChange={(e) => handleChange('bankName', e?.target?.value)}
              placeholder="Nombre del banco"
            />
            <Input
              label="Tipo de Cuenta"
              value={formData?.accountType}
              onChange={(e) => handleChange('accountType', e?.target?.value)}
              placeholder="Caja de Ahorro / Cuenta Corriente"
            />
          </div>

          {/* Benefits Information */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-foreground border-b border-border pb-2">
              Beneficios y Seguridad Social
            </h4>
            <Input
              label="CODEN"
              value={formData?.coden}
              onChange={(e) => handleChange('coden', e?.target?.value)}
              placeholder="Número CODEN"
            />
            <Input
              label="Obra Social"
              value={formData?.socialSecurity}
              onChange={(e) => handleChange('socialSecurity', e?.target?.value)}
              placeholder="Nombre de la obra social"
            />
            <Input
              label="Seguro de Salud"
              value={formData?.healthInsurance}
              onChange={(e) => handleChange('healthInsurance', e?.target?.value)}
              placeholder="Información del seguro"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">Información Bancaria y Beneficios</h3>
        <Button
          variant="outline"
          iconName="Edit"
          iconPosition="left"
          onClick={() => setIsEditing(true)}
        >
          Editar
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Banking Information */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="CreditCard" size={20} className="text-primary" />
            <h4 className="text-md font-medium text-foreground">Información Bancaria</h4>
          </div>

          <div className="space-y-4">
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Hash" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">CBU</span>
              </div>
              <p className="text-foreground font-medium font-data">
                {employee?.banking?.cbu || 'No especificado'}
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Building" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Banco</span>
              </div>
              <p className="text-foreground font-medium">
                {employee?.banking?.bankName || 'No especificado'}
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Wallet" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Tipo de Cuenta</span>
              </div>
              <p className="text-foreground font-medium">
                {employee?.banking?.accountType || 'No especificado'}
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Information */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Shield" size={20} className="text-primary" />
            <h4 className="text-md font-medium text-foreground">Beneficios y Seguridad Social</h4>
          </div>

          <div className="space-y-4">
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="FileText" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">CODEN</span>
              </div>
              <p className="text-foreground font-medium font-data">
                {employee?.benefits?.coden || 'No especificado'}
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Heart" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Obra Social</span>
              </div>
              <p className="text-foreground font-medium">
                {employee?.benefits?.socialSecurity || 'No especificado'}
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Cross" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Seguro de Salud</span>
              </div>
              <p className="text-foreground font-medium">
                {employee?.benefits?.healthInsurance || 'No especificado'}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Additional Benefits */}
      <div className="border-t border-border pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Gift" size={20} className="text-primary" />
          <h4 className="text-md font-medium text-foreground">Beneficios Adicionales</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-muted/50 border border-border rounded-lg p-4 text-center">
            <Icon name="Car" size={24} className="mx-auto text-primary mb-2" />
            <h5 className="font-medium text-foreground">Transporte</h5>
            <p className="text-sm text-muted-foreground">Subsidio de transporte</p>
          </div>

          <div className="bg-muted/50 border border-border rounded-lg p-4 text-center">
            <Icon name="Utensils" size={24} className="mx-auto text-primary mb-2" />
            <h5 className="font-medium text-foreground">Alimentación</h5>
            <p className="text-sm text-muted-foreground">Tickets de comida</p>
          </div>

          <div className="bg-muted/50 border border-border rounded-lg p-4 text-center">
            <Icon name="GraduationCap" size={24} className="mx-auto text-primary mb-2" />
            <h5 className="font-medium text-foreground">Capacitación</h5>
            <p className="text-sm text-muted-foreground">Cursos internos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankingTab;
