import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const UniformDistribution = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedItems, setSelectedItems] = useState({});
  const [deliveryDate, setDeliveryDate] = useState('');

  const employees = [
    { value: 'emp001', label: 'Carlos Rodríguez - Técnico' },
    { value: 'emp002', label: 'María González - Supervisora' },
    { value: 'emp003', label: 'Juan Pérez - Operario' },
    { value: 'emp004', label: 'Ana Martínez - Coordinadora' },
    { value: 'emp005', label: 'Luis Fernández - Técnico Senior' }
  ];

  const uniformItems = [
    { id: 'pants', name: 'Pantalones', sizes: Array.from({length: 21}, (_, i) => ({ value: `${40 + i}`, label: `Talle ${40 + i}` })) },
    { id: 'polo', name: 'Polo Shirts', sizes: [
      { value: 'S', label: 'S' }, { value: 'M', label: 'M' }, { value: 'L', label: 'L' },
      { value: 'XL', label: 'XL' }, { value: 'XXL', label: 'XXL' }, { value: 'XXXL', label: 'XXXL' }
    ]},
    { id: 'tshirt', name: 'Remeras', sizes: [
      { value: 'S', label: 'S' }, { value: 'M', label: 'M' }, { value: 'L', label: 'L' },
      { value: 'XL', label: 'XL' }, { value: 'XXL', label: 'XXL' }, { value: 'XXXL', label: 'XXXL' }
    ]},
    { id: 'sweatshirt', name: 'Buzos', sizes: [
      { value: 'S', label: 'S' }, { value: 'M', label: 'M' }, { value: 'L', label: 'L' },
      { value: 'XL', label: 'XL' }, { value: 'XXL', label: 'XXL' }, { value: 'XXXL', label: 'XXXL' }
    ]},
    { id: 'jacket', name: 'Camperas', sizes: [
      { value: 'S', label: 'S' }, { value: 'M', label: 'M' }, { value: 'L', label: 'L' },
      { value: 'XL', label: 'XL' }, { value: 'XXL', label: 'XXL' }, { value: 'XXXL', label: 'XXXL' }
    ]},
    { id: 'shoes', name: 'Calzado', sizes: Array.from({length: 12}, (_, i) => ({ value: `${39 + i}`, label: `Talle ${39 + i}` })) }
  ];

  const uniformAssignments = [
    {
      id: 1,
      employee: 'Carlos Rodríguez',
      employeeId: 'EMP001',
      items: [
        { type: 'Pantalones', size: '42', quantity: 2 },
        { type: 'Polo Shirts', size: 'L', quantity: 3 },
        { type: 'Calzado', size: '43', quantity: 1 }
      ],
      deliveryDate: '15/11/2025',
      status: 'Entregado'
    },
    {
      id: 2,
      employee: 'María González',
      employeeId: 'EMP002',
      items: [
        { type: 'Pantalones', size: '40', quantity: 2 },
        { type: 'Remeras', size: 'M', quantity: 4 },
        { type: 'Camperas', size: 'M', quantity: 1 }
      ],
      deliveryDate: '12/11/2025',
      status: 'Entregado'
    },
    {
      id: 3,
      employee: 'Juan Pérez',
      employeeId: 'EMP003',
      items: [
        { type: 'Pantalones', size: '44', quantity: 3 },
        { type: 'Buzos', size: 'XL', quantity: 2 }
      ],
      deliveryDate: '18/11/2025',
      status: 'Pendiente'
    }
  ];

  const handleItemSelection = (itemId, field, value) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: {
        ...prev?.[itemId],
        [field]: value
      }
    }));
  };

  const handleAssignUniform = () => {
    if (!selectedEmployee || !deliveryDate) return;
    
    const hasSelectedItems = Object.values(selectedItems)?.some(item => 
      item?.selected && item?.size && item?.quantity
    );
    
    if (!hasSelectedItems) return;
    
    console.log('Asignando uniformes:', {
      employee: selectedEmployee,
      items: selectedItems,
      deliveryDate
    });
    
    // Reset form
    setSelectedEmployee('');
    setSelectedItems({});
    setDeliveryDate('');
  };

  return (
    <div className="space-y-6">
      {/* Assignment Form */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Shirt" size={20} className="mr-2 text-primary" />
          Asignar Uniformes
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Select
              label="Empleado"
              placeholder="Seleccionar empleado"
              options={employees}
              value={selectedEmployee}
              onChange={setSelectedEmployee}
              searchable
              required
            />
            
            <Input
              label="Fecha de Entrega"
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e?.target?.value)}
              required
              className="mt-4"
            />
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Seleccionar Prendas</h4>
            {uniformItems?.map(item => (
              <div key={item?.id} className="flex items-center space-x-3 p-3 bg-muted rounded-md">
                <input
                  type="checkbox"
                  id={item?.id}
                  checked={selectedItems?.[item?.id]?.selected || false}
                  onChange={(e) => handleItemSelection(item?.id, 'selected', e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <label htmlFor={item?.id} className="flex-1 text-sm font-medium text-foreground">
                  {item?.name}
                </label>
                
                {selectedItems?.[item?.id]?.selected && (
                  <>
                    <select
                      value={selectedItems?.[item?.id]?.size || ''}
                      onChange={(e) => handleItemSelection(item?.id, 'size', e?.target?.value)}
                      className="px-2 py-1 text-sm border border-border rounded-md bg-background"
                    >
                      <option value="">Talle</option>
                      {item?.sizes?.map(size => (
                        <option key={size?.value} value={size?.value}>{size?.label}</option>
                      ))}
                    </select>
                    
                    <input
                      type="number"
                      min="1"
                      max="10"
                      placeholder="Cant."
                      value={selectedItems?.[item?.id]?.quantity || ''}
                      onChange={(e) => handleItemSelection(item?.id, 'quantity', e?.target?.value)}
                      className="w-16 px-2 py-1 text-sm border border-border rounded-md bg-background"
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <Button
            variant="default"
            onClick={handleAssignUniform}
            iconName="Plus"
            iconPosition="left"
            disabled={!selectedEmployee || !deliveryDate}
          >
            Asignar Uniformes
          </Button>
        </div>
      </div>
      {/* Assignments Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Package" size={20} className="mr-2 text-primary" />
            Asignaciones de Uniformes
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
                  Prendas Asignadas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Fecha Entrega
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
              {uniformAssignments?.map((assignment) => (
                <tr key={assignment?.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-foreground">{assignment?.employee}</div>
                      <div className="text-sm text-muted-foreground">{assignment?.employeeId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {assignment?.items?.map((item, index) => (
                        <div key={index} className="text-sm text-foreground">
                          {item?.type} - Talle {item?.size} (x{item?.quantity})
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {assignment?.deliveryDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      assignment?.status === 'Entregado' 
                        ? 'bg-green-100 text-green-800' :'bg-yellow-100 text-yellow-800'
                    }`}>
                      {assignment?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" iconName="Eye">
                        Ver
                      </Button>
                      <Button variant="ghost" size="sm" iconName="Edit">
                        Editar
                      </Button>
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

export default UniformDistribution;