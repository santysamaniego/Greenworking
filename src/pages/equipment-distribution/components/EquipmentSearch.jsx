import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const EquipmentSearch = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [equipmentType, setEquipmentType] = useState('');
  const [status, setStatus] = useState('');
  const [employee, setEmployee] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const equipmentTypes = [
    { value: 'uniform', label: 'Uniformes' },
    { value: 'computer', label: 'Computadoras' },
    { value: 'phone', label: 'Teléfonos' },
    { value: 'tools', label: 'Herramientas' }
  ];

  const statusOptions = [
    { value: 'assigned', label: 'Asignado' },
    { value: 'available', label: 'Disponible' },
    { value: 'reported', label: 'Reportado' },
    { value: 'returned', label: 'Devuelto' },
    { value: 'overdue', label: 'Vencido' }
  ];

  const employees = [
    { value: 'emp001', label: 'Carlos Rodríguez' },
    { value: 'emp002', label: 'María González' },
    { value: 'emp003', label: 'Juan Pérez' },
    { value: 'emp004', label: 'Ana Martínez' },
    { value: 'emp005', label: 'Luis Fernández' }
  ];

  const handleSearch = () => {
    const filters = {
      searchTerm,
      equipmentType,
      status,
      employee,
      dateRange
    };
    
    if (onFilterChange) {
      onFilterChange(filters);
    }
    
    console.log('Aplicando filtros:', filters);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setEquipmentType('');
    setStatus('');
    setEmployee('');
    setDateRange({ from: '', to: '' });
    
    if (onFilterChange) {
      onFilterChange({});
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="Search" size={20} className="mr-2 text-primary" />
        Búsqueda y Filtros
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Search Term */}
        <Input
          label="Búsqueda General"
          type="text"
          placeholder="Buscar por empleado, equipo, serial..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
        />
        
        {/* Equipment Type */}
        <Select
          label="Tipo de Equipo"
          placeholder="Todos los tipos"
          options={equipmentTypes}
          value={equipmentType}
          onChange={setEquipmentType}
          clearable
        />
        
        {/* Status */}
        <Select
          label="Estado"
          placeholder="Todos los estados"
          options={statusOptions}
          value={status}
          onChange={setStatus}
          clearable
        />
        
        {/* Employee */}
        <Select
          label="Empleado"
          placeholder="Todos los empleados"
          options={employees}
          value={employee}
          onChange={setEmployee}
          searchable
          clearable
        />
        
        {/* Date Range From */}
        <Input
          label="Fecha Desde"
          type="date"
          value={dateRange?.from}
          onChange={(e) => setDateRange(prev => ({ ...prev, from: e?.target?.value }))}
        />
        
        {/* Date Range To */}
        <Input
          label="Fecha Hasta"
          type="date"
          value={dateRange?.to}
          onChange={(e) => setDateRange(prev => ({ ...prev, to: e?.target?.value }))}
        />
      </div>
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant="default"
          onClick={handleSearch}
          iconName="Search"
          iconPosition="left"
        >
          Buscar
        </Button>
        
        <Button
          variant="outline"
          onClick={handleClearFilters}
          iconName="X"
          iconPosition="left"
        >
          Limpiar Filtros
        </Button>
        
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
        >
          Exportar Resultados
        </Button>
      </div>
      {/* Quick Filter Chips */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm font-medium text-muted-foreground mb-2">Filtros Rápidos:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setStatus('assigned');
              handleSearch();
            }}
            className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
          >
            Equipos Asignados
          </button>
          
          <button
            onClick={() => {
              setStatus('overdue');
              handleSearch();
            }}
            className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition-colors"
          >
            Devoluciones Vencidas
          </button>
          
          <button
            onClick={() => {
              setStatus('available');
              handleSearch();
            }}
            className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors"
          >
            Equipos Disponibles
          </button>
          
          <button
            onClick={() => {
              setStatus('reported');
              handleSearch();
            }}
            className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full hover:bg-yellow-200 transition-colors"
          >
            Incidencias Reportadas
          </button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentSearch;