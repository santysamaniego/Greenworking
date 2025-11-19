import React, { useState } from 'react';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import UniformDistribution from './components/UniformDistribution';
import ComputerAssignment from './components/ComputerAssignment';
import PhoneAssignment from './components/PhoneAssignment';
import ToolsDistribution from './components/ToolsDistribution';
import EquipmentSearch from './components/EquipmentSearch';

const EquipmentDistribution = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('uniforms');
  const [searchFilters, setSearchFilters] = useState({});

  const breadcrumbPath = [
    { label: 'Panel de Control', path: '/employee-dashboard' },
    { label: 'Distribución de Equipamiento', path: '/equipment-distribution' }
  ];

  const handleNavigate = (path) => {
    console.log('Navigating to:', path);
    // Navigation logic here if needed
  };

  const tabs = [
    {
      id: 'uniforms',
      label: 'Uniformes',
      icon: 'Shirt',
      component: UniformDistribution
    },
    {
      id: 'computers',
      label: 'Computadoras',
      icon: 'Laptop',
      component: ComputerAssignment
    },
    {
      id: 'phones',
      label: 'Teléfonos',
      icon: 'Smartphone',
      component: PhoneAssignment
    },
    {
      id: 'tools',
      label: 'Herramientas',
      icon: 'Wrench',
      component: ToolsDistribution
    }
  ];

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleFilterChange = (filters) => {
    setSearchFilters(filters);
    console.log('Filtros aplicados:', filters);
  };

  const ActiveComponent = tabs?.find(tab => tab?.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={handleSidebarToggle}
      />
      <main className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-sidebar'
      } ml-0`}>
        <div className="p-6 lg:p-8">
          {/* Header Section */}
          <div className="mb-8">
            <BreadcrumbNavigation currentPath={breadcrumbPath} onNavigate={handleNavigate} />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Distribución de Equipamiento
                </h1>
                <p className="text-muted-foreground">
                  Gestión integral de uniformes, equipos tecnológicos y herramientas asignadas a empleados
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  iconName="FileText"
                  iconPosition="left"
                >
                  Generar Reporte
                </Button>
                
                <Button
                  variant="outline"
                  iconName="Settings"
                  iconPosition="left"
                >
                  Configuración
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Equipos</p>
                  <p className="text-2xl font-bold text-foreground">156</p>
                  <p className="text-xs text-green-600 mt-1">+12 este mes</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon name="Package" size={24} className="text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Asignados</p>
                  <p className="text-2xl font-bold text-foreground">89</p>
                  <p className="text-xs text-blue-600 mt-1">57% del total</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Disponibles</p>
                  <p className="text-2xl font-bold text-foreground">52</p>
                  <p className="text-xs text-gray-600 mt-1">33% del total</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Icon name="Archive" size={24} className="text-gray-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Incidencias</p>
                  <p className="text-2xl font-bold text-foreground">15</p>
                  <p className="text-xs text-red-600 mt-1">Requieren atención</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={24} className="text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <EquipmentSearch onFilterChange={handleFilterChange} />
          </div>

          {/* Tab Navigation */}
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="border-b border-border">
              <nav className="flex overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab?.id
                        ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} className="mr-2" />
                    {tab?.label}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {ActiveComponent && <ActiveComponent />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EquipmentDistribution;
