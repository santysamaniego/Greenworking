import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ToolsDistribution = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedTool, setSelectedTool] = useState('');
  const [toolSpecification, setToolSpecification] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [expectedReturnDate, setExpectedReturnDate] = useState('');
  const [notes, setNotes] = useState('');

  const employees = [
    { value: 'emp001', label: 'Carlos Rodríguez - Técnico' },
    { value: 'emp002', label: 'María González - Supervisora' },
    { value: 'emp003', label: 'Juan Pérez - Operario' },
    { value: 'emp004', label: 'Ana Martínez - Coordinadora' },
    { value: 'emp005', label: 'Luis Fernández - Técnico Senior' }
  ];

  const toolCategories = [
    { value: 'electrical', label: 'Herramientas Eléctricas' },
    { value: 'manual', label: 'Herramientas Manuales' },
    { value: 'measurement', label: 'Instrumentos de Medición' },
    { value: 'safety', label: 'Equipos de Seguridad' },
    { value: 'specialized', label: 'Herramientas Especializadas' }
  ];

  const toolsDistributions = [
    {
      id: 1,
      employee: 'Carlos Rodríguez',
      employeeId: 'EMP001',
      tool: 'Taladro Percutor',
      specification: 'Bosch GSB 13 RE - 600W',
      serialNumber: 'BSH001',
      deliveryDate: '14/11/2025',
      expectedReturn: '28/11/2025',
      status: 'En Uso',
      condition: 'Excelente',
      category: 'Herramientas Eléctricas'
    },
    {
      id: 2,
      employee: 'Juan Pérez',
      employeeId: 'EMP003',
      tool: 'Multímetro Digital',
      specification: 'Fluke 117 - True RMS',
      serialNumber: 'FLK002',
      deliveryDate: '10/11/2025',
      expectedReturn: '24/11/2025',
      status: 'En Uso',
      condition: 'Bueno',
      category: 'Instrumentos de Medición'
    },
    {
      id: 3,
      employee: 'María González',
      employeeId: 'EMP002',
      tool: 'Casco de Seguridad',
      specification: '3M H-700 Series',
      serialNumber: '3M003',
      deliveryDate: '08/11/2025',
      expectedReturn: '08/12/2025',
      status: 'Devuelto',
      condition: 'Bueno',
      category: 'Equipos de Seguridad'
    },
    {
      id: 4,
      employee: 'Luis Fernández',
      employeeId: 'EMP005',
      tool: 'Soldadora Inverter',
      specification: 'Lincoln Electric 140A',
      serialNumber: 'LIN004',
      deliveryDate: '05/11/2025',
      expectedReturn: '19/11/2025',
      status: 'Vencido',
      condition: 'Excelente',
      category: 'Herramientas Especializadas'
    }
  ];

  const handleAssignTool = () => {
    if (!selectedEmployee || !selectedTool || !toolSpecification || !deliveryDate) return;
    
    console.log('Asignando herramienta:', {
      employee: selectedEmployee,
      tool: selectedTool,
      specification: toolSpecification,
      deliveryDate,
      expectedReturnDate,
      notes
    });
    
    // Reset form
    setSelectedEmployee('');
    setSelectedTool('');
    setToolSpecification('');
    setDeliveryDate('');
    setExpectedReturnDate('');
    setNotes('');
  };

  const handleReturnTool = (distributionId) => {
    console.log('Procesando devolución de herramienta:', distributionId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'En Uso':
        return 'bg-blue-100 text-blue-800';
      case 'Devuelto':
        return 'bg-green-100 text-green-800';
      case 'Vencido':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Assignment Form */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Wrench" size={20} className="mr-2 text-primary" />
          Asignar Herramientas
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Select
              label="Empleado"
              placeholder="Seleccionar empleado"
              options={employees}
              value={selectedEmployee}
              onChange={setSelectedEmployee}
              searchable
              required
            />
            
            <Select
              label="Categoría de Herramienta"
              placeholder="Seleccionar categoría"
              options={toolCategories}
              value={selectedTool}
              onChange={setSelectedTool}
              required
            />
            
            <Input
              label="Especificación de la Herramienta"
              type="text"
              placeholder="Marca, modelo, características"
              value={toolSpecification}
              onChange={(e) => setToolSpecification(e?.target?.value)}
              required
            />
          </div>
          
          <div className="space-y-4">
            <Input
              label="Fecha de Entrega"
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e?.target?.value)}
              required
            />
            
            <Input
              label="Fecha Esperada de Devolución"
              type="date"
              value={expectedReturnDate}
              onChange={(e) => setExpectedReturnDate(e?.target?.value)}
            />
            
            <Input
              label="Notas (Opcional)"
              type="text"
              placeholder="Condiciones de uso, observaciones"
              value={notes}
              onChange={(e) => setNotes(e?.target?.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <Button
            variant="default"
            onClick={handleAssignTool}
            iconName="Plus"
            iconPosition="left"
            disabled={!selectedEmployee || !selectedTool || !toolSpecification || !deliveryDate}
          >
            Asignar Herramienta
          </Button>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center">
            <Icon name="Tool" size={20} className="text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">En Uso</p>
              <p className="text-2xl font-bold text-foreground">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center">
            <Icon name="CheckCircle" size={20} className="text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Devueltas</p>
              <p className="text-2xl font-bold text-foreground">8</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center">
            <Icon name="AlertCircle" size={20} className="text-red-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Vencidas</p>
              <p className="text-2xl font-bold text-foreground">3</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center">
            <Icon name="Package" size={20} className="text-gray-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Disponibles</p>
              <p className="text-2xl font-bold text-foreground">25</p>
            </div>
          </div>
        </div>
      </div>
      {/* Distributions Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Hammer" size={20} className="mr-2 text-primary" />
            Distribución de Herramientas
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Empleado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Herramienta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Entrega
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Devolución Esperada
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-border">
              {toolsDistributions?.map((distribution) => (
                <tr key={distribution?.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-foreground">{distribution?.employee}</div>
                      <div className="text-sm text-muted-foreground">{distribution?.employeeId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-foreground">{distribution?.tool}</div>
                      <div className="text-sm text-muted-foreground">{distribution?.specification}</div>
                      <div className="text-xs text-muted-foreground">#{distribution?.serialNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {distribution?.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {distribution?.deliveryDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {distribution?.expectedReturn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(distribution?.status)}`}>
                      {distribution?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" iconName="Eye">
                        Ver
                      </Button>
                      {distribution?.status === 'En Uso' && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          iconName="RotateCcw"
                          onClick={() => handleReturnTool(distribution?.id)}
                        >
                          Devolver
                        </Button>
                      )}
                      {distribution?.status === 'Vencido' && (
                        <Button variant="ghost" size="sm" iconName="AlertTriangle">
                          Gestionar
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ToolsDistribution;