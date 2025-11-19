import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FamilyTab = ({ employee, onUpdate }) => {
  const [isEditingSpouse, setIsEditingSpouse] = useState(false);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [spouseData, setSpouseData] = useState({
    name: employee?.family?.spouse?.name || '',
    dni: employee?.family?.spouse?.dni || '',
    cuil: employee?.family?.spouse?.cuil || ''
  });
  const [newChild, setNewChild] = useState({
    name: '',
    dni: '',
    birthDate: '',
    birthCertificate: null
  });

  const handleSpouseSave = () => {
    onUpdate({
      family: {
        ...employee?.family,
        spouse: spouseData
      }
    });
    setIsEditingSpouse(false);
  };

  const handleSpouseCancel = () => {
    setSpouseData({
      name: employee?.family?.spouse?.name || '',
      dni: employee?.family?.spouse?.dni || '',
      cuil: employee?.family?.spouse?.cuil || ''
    });
    setIsEditingSpouse(false);
  };

  const handleAddChild = () => {
    const updatedChildren = [...(employee?.family?.children || []), newChild];
    onUpdate({
      family: {
        ...employee?.family,
        children: updatedChildren
      }
    });
    setNewChild({ name: '', dni: '', birthDate: '', birthCertificate: null });
    setIsAddingChild(false);
  };

  const handleRemoveChild = (index) => {
    const updatedChildren = employee?.family?.children?.filter((_, i) => i !== index) || [];
    onUpdate({
      family: {
        ...employee?.family,
        children: updatedChildren
      }
    });
  };

  const isMarried = employee?.maritalStatus === 'married';
  const spouse = employee?.family?.spouse;
  const children = employee?.family?.children || [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">Información Familiar</h3>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            isMarried 
              ? 'bg-blue-100 text-blue-800' :'bg-gray-100 text-gray-800'
          }`}>
            {isMarried ? 'Casado/a' : 'Soltero/a'}
          </span>
        </div>
      </div>
      {/* Spouse Information */}
      {isMarried && (
        <div className="bg-muted/50 border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Icon name="Heart" size={20} className="text-primary" />
              <h4 className="text-md font-medium text-foreground">Información del Cónyuge</h4>
            </div>
            {!isEditingSpouse && (
              <Button
                variant="outline"
                size="sm"
                iconName="Edit"
                iconPosition="left"
                onClick={() => setIsEditingSpouse(true)}
              >
                Editar
              </Button>
            )}
          </div>

          {isEditingSpouse ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Nombre Completo"
                  value={spouseData?.name}
                  onChange={(e) => setSpouseData(prev => ({ ...prev, name: e?.target?.value }))}
                  required
                />
                <Input
                  label="DNI"
                  value={spouseData?.dni}
                  onChange={(e) => setSpouseData(prev => ({ ...prev, dni: e?.target?.value }))}
                  required
                />
                <Input
                  label="CUIL"
                  value={spouseData?.cuil}
                  onChange={(e) => setSpouseData(prev => ({ ...prev, cuil: e?.target?.value }))}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleSpouseCancel}>
                  Cancelar
                </Button>
                <Button onClick={handleSpouseSave}>
                  Guardar
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="User" size={16} />
                  <span>Nombre Completo</span>
                </div>
                <p className="text-foreground font-medium">{spouse?.name || 'No especificado'}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="IdCard" size={16} />
                  <span>DNI</span>
                </div>
                <p className="text-foreground font-medium font-data">{spouse?.dni || 'No especificado'}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="CreditCard" size={16} />
                  <span>CUIL</span>
                </div>
                <p className="text-foreground font-medium font-data">{spouse?.cuil || 'No especificado'}</p>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Children Information */}
      <div className="bg-muted/50 border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Icon name="Baby" size={20} className="text-primary" />
            <h4 className="text-md font-medium text-foreground">Hijos</h4>
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium">
              {children?.length}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={() => setIsAddingChild(true)}
          >
            Agregar Hijo
          </Button>
        </div>

        {/* Add Child Form */}
        {isAddingChild && (
          <div className="mb-6 p-4 bg-card border border-border rounded-lg">
            <h5 className="font-medium text-foreground mb-4">Agregar Nuevo Hijo</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Input
                label="Nombre Completo"
                value={newChild?.name}
                onChange={(e) => setNewChild(prev => ({ ...prev, name: e?.target?.value }))}
                required
              />
              <Input
                label="DNI"
                value={newChild?.dni}
                onChange={(e) => setNewChild(prev => ({ ...prev, dni: e?.target?.value }))}
                required
              />
              <Input
                label="Fecha de Nacimiento"
                type="date"
                value={newChild?.birthDate}
                onChange={(e) => setNewChild(prev => ({ ...prev, birthDate: e?.target?.value }))}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsAddingChild(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddChild}>
                Agregar
              </Button>
            </div>
          </div>
        )}

        {/* Children List */}
        {children?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children?.map((child, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="Baby" size={20} className="text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground">{child?.name}</h5>
                      <p className="text-sm text-muted-foreground">Hijo {index + 1}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    onClick={() => handleRemoveChild(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">DNI:</span>
                    <span className="font-medium font-data">{child?.dni}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nacimiento:</span>
                    <span className="font-medium">{child?.birthDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Partida de Nacimiento:</span>
                    {child?.birthCertificate ? (
                      <div className="flex items-center gap-2">
                        <Icon name="CheckCircle" size={16} className="text-green-600" />
                        <span className="text-green-600 text-xs">Subido</span>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Upload"
                        iconPosition="left"
                      >
                        Subir
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Baby" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No hay hijos registrados</p>
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setIsAddingChild(true)}
            >
              Agregar Primer Hijo
            </Button>
          </div>
        )}
      </div>
      {/* Family Documents */}
      <div className="bg-muted/50 border border-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="FileText" size={20} className="text-primary" />
          <h4 className="text-md font-medium text-foreground">Documentación Familiar</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isMarried && (
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon name="Heart" size={16} className="text-primary" />
                  <span className="font-medium">Certificado de Matrimonio</span>
                </div>
                {employee?.documents?.marriageCertificate ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Icon name="CheckCircle" size={12} className="mr-1" />
                    Subido
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Icon name="Clock" size={12} className="mr-1" />
                    Pendiente
                  </span>
                )}
              </div>
              {employee?.documents?.marriageCertificate ? (
                <div className="text-sm text-muted-foreground">
                  Subido: {employee?.documents?.marriageCertificate?.uploadDate}
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Upload"
                  iconPosition="left"
                  fullWidth
                >
                  Subir Certificado
                </Button>
              )}
            </div>
          )}

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icon name="Baby" size={16} className="text-primary" />
                <span className="font-medium">Partidas de Nacimiento</span>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {children?.filter(child => child?.birthCertificate)?.length}/{children?.length}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              {children?.length > 0 
                ? `${children?.filter(child => child?.birthCertificate)?.length} de ${children?.length} documentos subidos`
                : 'No hay hijos registrados'
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyTab;