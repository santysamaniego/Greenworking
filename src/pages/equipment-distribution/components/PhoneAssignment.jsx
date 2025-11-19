import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PhoneAssignment = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedPhone, setSelectedPhone] = useState('');
  const [assignmentDate, setAssignmentDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notes, setNotes] = useState('');

  const employees = [
    { value: 'emp001', label: 'Carlos Rodríguez - Técnico' },
    { value: 'emp002', label: 'María González - Supervisora' },
    { value: 'emp003', label: 'Juan Pérez - Operario' },
    { value: 'emp004', label: 'Ana Martínez - Coordinadora' },
    { value: 'emp005', label: 'Luis Fernández - Técnico Senior' }
  ];

  const availablePhones = [
    { value: 'phone001', label: 'Samsung Galaxy A54 - #SG001' },
    { value: 'phone002', label: 'iPhone 13 - #IP002' },
    { value: 'phone003', label: 'Motorola Edge 40 - #MT003' },
    { value: 'phone004', label: 'Xiaomi Redmi Note 12 - #XM004' }
  ];

  const phoneAssignments = [
    {
      id: 1,
      employee: 'Carlos Rodríguez',
      employeeId: 'EMP001',
      phone: 'Samsung Galaxy A54',
      serialNumber: 'SG001',
      phoneNumber: '+54 11 1234-5678',
      assignmentDate: '12/11/2025',
      status: 'Asignado',
      condition: 'Excelente',
      plan: 'Corporativo 5GB'
    },
    {
      id: 2,
      employee: 'María González',
      employeeId: 'EMP002',
      phone: 'iPhone 13',
      serialNumber: 'IP002',
      phoneNumber: '+54 11 2345-6789',
      assignmentDate: '09/11/2025',
      status: 'Asignado',
      condition: 'Bueno',
      plan: 'Corporativo 10GB'
    },
    {
      id: 3,
      employee: 'Luis Fernández',
      employeeId: 'EMP005',
      phone: 'Motorola Edge 40',
      serialNumber: 'MT007',
      phoneNumber: '+54 11 3456-7890',
      assignmentDate: '01/11/2025',
      status: 'Reportado',
      condition: 'Perdido',
      plan: 'Corporativo 5GB'
    }
  ];

  const handleAssignPhone = () => {
    if (!selectedEmployee || !selectedPhone || !assignmentDate || !phoneNumber) return;
    
    console.log('Asignando teléfono:', {
      employee: selectedEmployee,
      phone: selectedPhone,
      assignmentDate,
      phoneNumber,
      notes
    });
    
    // Reset form
    setSelectedEmployee('');
    setSelectedPhone('');
    setAssignmentDate('');
    setPhoneNumber('');
    setNotes('');
  };

  const handleReportIssue = (assignmentId, issueType) => {
    console.log('Reportando incidencia telefónica:', { assignmentId, issueType });
  };

  return (
    <div className="space-y-6">
      {/* Assignment Form */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Smartphone" size={20} className="mr-2 text-primary" />
          Asignar Teléfono Móvil
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
              label="Teléfono Disponible"
              placeholder="Seleccionar dispositivo"
              options={availablePhones}
              value={selectedPhone}
              onChange={setSelectedPhone}
              searchable
              required
            />
          </div>
          
          <div className="space-y-4">
            <Input
              label="Número Telefónico"
              type="tel"
              placeholder="+54 11 1234-5678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e?.target?.value)}
              required
            />
            
            <Input
              label="Fecha de Asignación"
              type="date"
              value={assignmentDate}
              onChange={(e) => setAssignmentDate(e?.target?.value)}
              required
            />
            
            <Input
              label="Notas (Opcional)"
              type="text"
              placeholder="Plan corporativo, observaciones"
              value={notes}
              onChange={(e) => setNotes(e?.target?.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <Button
            variant="default"
            onClick={handleAssignPhone}
            iconName="Plus"
            iconPosition="left"
            disabled={!selectedEmployee || !selectedPhone || !assignmentDate || !phoneNumber}
          >
            Asignar Teléfono
          </Button>
        </div>
      </div>
      {/* Policy Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Icon name="Info" size={20} className="text-blue-600 mr-3 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-800">Política de Dispositivos Móviles</h4>
            <p className="text-sm text-blue-700 mt-1">
              Un empleado solo puede tener un teléfono corporativo asignado. Los reportes de robo, daño o pérdida 
              requieren documentación y aprobación antes de la asignación de un nuevo dispositivo.
            </p>
          </div>
        </div>
      </div>
      {/* Assignments Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Phone" size={20} className="mr-2 text-primary" />
            Asignaciones de Teléfonos
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
                  Dispositivo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Número
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Fecha Asignación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-border">
              {phoneAssignments?.map((assignment) => (
                <tr key={assignment?.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-foreground">{assignment?.employee}</div>
                      <div className="text-sm text-muted-foreground">{assignment?.employeeId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-foreground">{assignment?.phone}</div>
                      <div className="text-sm text-muted-foreground">#{assignment?.serialNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {assignment?.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {assignment?.assignmentDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      assignment?.status === 'Asignado' 
                        ? 'bg-green-100 text-green-800' 
                        : assignment?.status === 'Reportado' ?'bg-red-100 text-red-800' :'bg-gray-100 text-gray-800'
                    }`}>
                      {assignment?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {assignment?.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" iconName="Eye">
                        Ver
                      </Button>
                      {assignment?.status === 'Asignado' && (
                        <div className="relative group">
                          <Button variant="ghost" size="sm" iconName="AlertTriangle">
                            Reportar
                          </Button>
                          <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                            <div className="p-2 space-y-1">
                              <button
                                onClick={() => handleReportIssue(assignment?.id, 'theft')}
                                className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted rounded"
                              >
                                Robo
                              </button>
                              <button
                                onClick={() => handleReportIssue(assignment?.id, 'damage')}
                                className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted rounded"
                              >
                                Daño
                              </button>
                              <button
                                onClick={() => handleReportIssue(assignment?.id, 'loss')}
                                className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted rounded"
                              >
                                Pérdida
                              </button>
                            </div>
                          </div>
                        </div>
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

export default PhoneAssignment;