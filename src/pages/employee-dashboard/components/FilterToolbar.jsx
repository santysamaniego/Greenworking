import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const FilterToolbar = ({
  searchTerm,
  onSearchChange,
  selectedProvince,
  onProvinceChange,
  sortOrder,
  onSortOrderChange,
  statusFilter,
  onStatusFilterChange,
  onClearFilters,
  onAddEmployee,
  onExportData
}) => {
  const provinceOptions = [
    { value: '', label: 'Todas las Provincias' },
    { value: 'Buenos Aires', label: 'Buenos Aires' },
    { value: 'Córdoba', label: 'Córdoba' },
    { value: 'Santa Fe', label: 'Santa Fe' },
    { value: 'Mendoza', label: 'Mendoza' },
    { value: 'Tucumán', label: 'Tucumán' },
    { value: 'Entre Ríos', label: 'Entre Ríos' },
    { value: 'Salta', label: 'Salta' },
    { value: 'Misiones', label: 'Misiones' },
    { value: 'Chaco', label: 'Chaco' },
    { value: 'Corrientes', label: 'Corrientes' },
    { value: 'Santiago del Estero', label: 'Santiago del Estero' },
    { value: 'San Juan', label: 'San Juan' },
    { value: 'Jujuy', label: 'Jujuy' },
    { value: 'Río Negro', label: 'Río Negro' },
    { value: 'Neuquén', label: 'Neuquén' },
    { value: 'Formosa', label: 'Formosa' },
    { value: 'Chubut', label: 'Chubut' },
    { value: 'San Luis', label: 'San Luis' },
    { value: 'Catamarca', label: 'Catamarca' },
    { value: 'La Rioja', label: 'La Rioja' },
    { value: 'La Pampa', label: 'La Pampa' },
    { value: 'Santa Cruz', label: 'Santa Cruz' },
    { value: 'Tierra del Fuego', label: 'Tierra del Fuego' }
  ];

  const sortOptions = [
    { value: 'asc', label: 'A-Z (Alfabético)' },
    { value: 'desc', label: 'Z-A (Alfabético)' },
    { value: 'newest', label: 'Más Recientes' },
    { value: 'oldest', label: 'Más Antiguos' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos los Estados' },
    { value: 'active', label: 'Solo Activos' },
    { value: 'inactive', label: 'Solo Inactivos' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
        <h2 className="text-xl font-semibold text-foreground">Panel de Empleados</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={onExportData}
          >
            Exportar Datos
          </Button>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={onAddEmployee}
          >
            Agregar Empleado
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Buscar por nombre, CUIL, email..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        <Select
          placeholder="Provincia"
          options={provinceOptions}
          value={selectedProvince}
          onChange={onProvinceChange}
        />

        <Select
          placeholder="Ordenar por"
          options={sortOptions}
          value={sortOrder}
          onChange={onSortOrderChange}
        />

        <Select
          placeholder="Estado"
          options={statusOptions}
          value={statusFilter}
          onChange={onStatusFilterChange}
        />

        <Button
          variant="outline"
          iconName="RotateCcw"
          onClick={onClearFilters}
          className="w-full"
        >
          Limpiar
        </Button>
      </div>
    </div>
  );
};

export default FilterToolbar;