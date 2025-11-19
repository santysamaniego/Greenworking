import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ComputerAssignment = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedComputer, setSelectedComputer] = useState('');
  const [assignmentDate, setAssignmentDate] = useState('');
  const [notes, setNotes] = useState('');

  const employees = [
    { value: 'emp001', label: 'Carlos Rodríguez - Técnico' },
    { value: 'emp002', label: 'María González - Supervisora' },
    { value: 'emp003', label: 'Juan Pérez - Operario' },
    { value: 'emp004', label: 'Ana Martínez - Coordinadora' },
    { value: 'emp005', label: 'Luis Fernández - Técnico Senior' }
  ];

  const availableComputers = [
    { value: 'comp001', label: 'Dell Latitude 5520 - #DL001' },
    { value: 'comp002', label: 'HP EliteBook 840 - #HP002' },
    { value: 'comp003', label: 'Lenovo ThinkPad E14 - #LN003' },
    { value: 'comp004', label: 'Dell Inspiron 15 - #DL004' }
  ];

  const computerAssignments = [
    {
      id: 1,
      employee: 'Carlos Rodríguez',
      employeeId: 'EMP001',
      computer: 'Dell Latitude 5520',
      serialNumber: 'DL001',
      assignmentDate: '10/11/2025',
      status: 'Asignado',
      condition: 'Excelente',
      notes: 'Equipo nuevo para desarrollo'
    },
    {
      id: 2,
      employee: 'María González',
      employeeId: 'EMP002',
      computer: 'HP EliteBook 840',
      serialNumber: 'HP002',
      assignmentDate: '08/11/2025',
      status: 'Asignado',
      condition: 'Bueno',
      notes: 'Reemplazo por actualización'
    },
    {
      id: 3,
      employee: 'Ana Martínez',
      employeeId: 'EMP004',
      computer: 'Lenovo ThinkPad E14',
      serialNumber: 'LN005',
      assignmentDate: '05/11/2025',
      status: 'Reportado',
      condition: 'Dañado',
      notes: 'Pantalla rota - En proceso de reemplazo'
    }
  ];

  const handleAssignComputer = () => {
    if (!selectedEmployee || !selectedComputer || !assignmentDate) return;
    
    console.log('Asignando computadora:', {
      employee: selectedEmployee,
      computer: selectedComputer,
      assignmentDate,
      notes
    });
    
    // Reset form
    setSelectedEmployee('');
    setSelectedComputer('');
    setAssignmentDate('');
    setNotes('');
  };

  const handleReportIssue = (assignmentId, issueType) => {
    console.log('Reportando incidencia:', { assignmentId, issueType });
  };

  return (
    <div className="space-y-6">
      {/* Assignment Form */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Laptop" size={20} className="mr-2 text-primary" />
          Asignar Computadora
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
              label="Computadora Disponible"
              placeholder="Seleccionar equipo"
              options={availableComputers}
              value={selectedComputer}
              onChange={setSelectedComputer}
              searchable
              required
            />
          </div>
          
          <div className="space-y-4">
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
              placeholder="Observaciones sobre la asignación"
              value={notes}
              onChange={(e) => setNotes(e?.target?.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <Button
            variant="default"
            onClick={handleAssignComputer}
            iconName="Plus"
            iconPosition="left"
            disabled={!selectedEmployee || !selectedComputer || !assignmentDate}
          >
            Asignar Computadora
          </Button>
        </div>
      </div>
      {/* Policy Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <Icon name="AlertTriangle" size={20} className="text-yellow-600 mr-3 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800">Política de Equipos</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Cada empleado puede tener asignada únicamente una computadora. En casos de robo, daño o pérdida, 
              se debe generar un reporte de incidencia antes de asignar un nuevo equipo.
            </p>
          </div>
        </div>
      </div>
      {/* Assignments Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Monitor" size={20} className="mr-2 text-primary" />
            Asignaciones de Computadoras
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
                  Equipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Fecha Asignación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Condición
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-border">
              {computerAssignments?.map((assignment) => (
                <tr key={assignment?.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-foreground">{assignment?.employee}</div>
                      <div className="text-sm text-muted-foreground">{assignment?.employeeId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-foreground">{assignment?.computer}</div>
                      <div className="text-sm text-muted-foreground">#{assignment?.serialNumber}</div>
                    </div>
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      assignment?.condition === 'Excelente' ?'bg-green-100 text-green-800' 
                        : assignment?.condition === 'Bueno' ?'bg-blue-100 text-blue-800' :'bg-red-100 text-red-800'
                    }`}>
                      {assignment?.condition}
                    </span>
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

export default ComputerAssignment;
