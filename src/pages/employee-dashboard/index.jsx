import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import FilterToolbar from './components/FilterToolbar';
import StatsOverview from './components/StatsOverview';
import EmployeeSection from './components/EmployeeSection';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock employee data
  const mockEmployees = [
  {
    id: 1,
    name: 'María Elena',
    surname: 'González',
    employeeId: 'EMP001',
    cuil: '27-12345678-9',
    email: 'maria.gonzalez@greenworking.com',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_140b53516-1763294767826.png",
    photoAlt: 'Mujer profesional sonriente con cabello castaño en traje azul marino',
    province: 'Buenos Aires',
    status: 'active',
    startDate: '2023-03-15',
    inactiveDate: null
  },
  {
    id: 2,
    name: 'Carlos Alberto',
    surname: 'Rodríguez',
    employeeId: 'EMP002',
    cuil: '20-87654321-0',
    email: 'carlos.rodriguez@greenworking.com',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_182cbb743-1763294559045.png",
    photoAlt: 'Hombre profesional con barba y camisa blanca sonriendo',
    province: 'Córdoba',
    status: 'active',
    startDate: '2022-11-08',
    inactiveDate: null
  },
  {
    id: 3,
    name: 'Ana Sofía',
    surname: 'Martínez',
    employeeId: 'EMP003',
    cuil: '27-11223344-5',
    email: 'ana.martinez@greenworking.com',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1efea8232-1763295833460.png",
    photoAlt: 'Mujer joven con cabello rubio y blusa blanca en oficina moderna',
    province: 'Santa Fe',
    status: 'active',
    startDate: '2023-07-22',
    inactiveDate: null
  },
  {
    id: 4,
    name: 'Roberto',
    surname: 'Fernández',
    employeeId: 'EMP004',
    cuil: '20-55667788-1',
    email: 'roberto.fernandez@greenworking.com',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1a86a28a9-1763293403745.png",
    photoAlt: 'Hombre maduro con cabello gris y traje oscuro en ambiente profesional',
    province: 'Mendoza',
    status: 'inactive',
    startDate: '2021-05-10',
    inactiveDate: '2023-10-15'
  },
  {
    id: 5,
    name: 'Lucía',
    surname: 'Torres',
    employeeId: 'EMP005',
    cuil: '27-99887766-3',
    email: 'lucia.torres@greenworking.com',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1499f72d3-1763301757259.png",
    photoAlt: 'Mujer profesional con cabello negro y chaqueta gris sonriendo',
    province: 'Buenos Aires',
    status: 'active',
    startDate: '2023-09-01',
    inactiveDate: null
  },
  {
    id: 6,
    name: 'Diego',
    surname: 'Morales',
    employeeId: 'EMP006',
    cuil: '20-44332211-7',
    email: 'diego.morales@greenworking.com',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1029d6e5b-1763294328891.png",
    photoAlt: 'Hombre joven con barba y camisa azul en oficina contemporánea',
    province: 'Tucumán',
    status: 'inactive',
    startDate: '2022-02-14',
    inactiveDate: '2023-08-30'
  },
  {
    id: 7,
    name: 'Valentina',
    surname: 'López',
    employeeId: 'EMP007',
    cuil: '27-66778899-2',
    email: 'valentina.lopez@greenworking.com',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_16bae0d31-1763297867855.png",
    photoAlt: 'Mujer profesional con cabello castaño claro y blazer negro',
    province: 'Córdoba',
    status: 'active',
    startDate: '2023-11-10',
    inactiveDate: null
  },
  {
    id: 8,
    name: 'Sebastián',
    surname: 'Herrera',
    employeeId: 'EMP008',
    cuil: '20-33445566-8',
    email: 'sebastian.herrera@greenworking.com',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1ee8368a3-1763294237898.png",
    photoAlt: 'Hombre profesional con gafas y camisa blanca sonriendo',
    province: 'Santa Fe',
    status: 'active',
    startDate: '2023-06-05',
    inactiveDate: null
  }];


  const breadcrumbPath = [
  { label: 'Panel de Control', path: '/employee-dashboard' }];


  // Filter and sort employees
  const filteredEmployees = useMemo(() => {
    let filtered = mockEmployees?.filter((employee) => {
      const matchesSearch = searchTerm === '' ||
      employee?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      employee?.surname?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      employee?.cuil?.includes(searchTerm) ||
      employee?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      employee?.employeeId?.toLowerCase()?.includes(searchTerm?.toLowerCase());

      const matchesProvince = selectedProvince === '' || employee?.province === selectedProvince;

      const matchesStatus = statusFilter === 'all' || employee?.status === statusFilter;

      return matchesSearch && matchesProvince && matchesStatus;
    });

    // Sort employees
    filtered?.sort((a, b) => {
      switch (sortOrder) {
        case 'asc':
          return `${a?.name} ${a?.surname}`?.localeCompare(`${b?.name} ${b?.surname}`);
        case 'desc':
          return `${b?.name} ${b?.surname}`?.localeCompare(`${a?.name} ${a?.surname}`);
        case 'newest':
          return new Date(b.startDate) - new Date(a.startDate);
        case 'oldest':
          return new Date(a.startDate) - new Date(b.startDate);
        default:
          return 0;
      }
    });

    return filtered;
  }, [mockEmployees, searchTerm, selectedProvince, sortOrder, statusFilter]);

  // Separate active and inactive employees
  const activeEmployees = filteredEmployees?.filter((emp) => emp?.status === 'active');
  const inactiveEmployees = filteredEmployees?.filter((emp) => emp?.status === 'inactive');

  // Calculate statistics
  const stats = useMemo(() => {
    const currentMonth = new Date()?.getMonth();
    const currentYear = new Date()?.getFullYear();

    const newThisMonth = mockEmployees?.filter((emp) => {
      const startDate = new Date(emp.startDate);
      return startDate?.getMonth() === currentMonth && startDate?.getFullYear() === currentYear;
    })?.length;

    return {
      total: mockEmployees?.length,
      active: mockEmployees?.filter((emp) => emp?.status === 'active')?.length,
      inactive: mockEmployees?.filter((emp) => emp?.status === 'inactive')?.length,
      newThisMonth
    };
  }, [mockEmployees]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedProvince('');
    setSortOrder('asc');
    setStatusFilter('all');
  };

  const handleAddEmployee = () => {
    navigate('/employee-profile');
  };

  const handleViewProfile = (employee) => {
    navigate(`/employee-profile?id=${employee?.id}`);
  };

  const handleEditEmployee = (employee) => {
    navigate(`/employee-profile?id=${employee?.id}&edit=true`);
  };

  const handleExportData = () => {
    // Mock export functionality
    const csvContent = [
    ['ID', 'Nombre', 'Apellido', 'CUIL', 'Email', 'Provincia', 'Estado', 'Fecha Ingreso', 'Fecha Baja']?.join(','),
    ...filteredEmployees?.map((emp) => [
    emp?.employeeId,
    emp?.name,
    emp?.surname,
    emp?.cuil,
    emp?.email,
    emp?.province,
    emp?.status === 'active' ? 'Activo' : 'Inactivo',
    emp?.startDate,
    emp?.inactiveDate || '']?.
    join(','))]?.
    join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link?.setAttribute('href', url);
    link?.setAttribute('download', `empleados_${new Date()?.toISOString()?.split('T')?.[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-sidebar'}`}>
        <div className="p-6 lg:p-8 pt-20 lg:pt-8">
          <BreadcrumbNavigation
            currentPath={breadcrumbPath}
            onNavigate={(path) => navigate(path)} />

          
          <FilterToolbar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedProvince={selectedProvince}
            onProvinceChange={setSelectedProvince}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onClearFilters={handleClearFilters}
            onAddEmployee={handleAddEmployee}
            onExportData={handleExportData} />


          <StatsOverview stats={stats} />

          {statusFilter === 'all' || statusFilter === 'active' ?
          <EmployeeSection
            title="Empleados Activos"
            employees={activeEmployees}
            icon="UserCheck"
            emptyMessage="No se encontraron empleados activos con los filtros aplicados."
            onViewProfile={handleViewProfile}
            onEditEmployee={handleEditEmployee} /> :

          null}

          {statusFilter === 'all' || statusFilter === 'inactive' ?
          <EmployeeSection
            title="Empleados Inactivos"
            employees={inactiveEmployees}
            icon="UserX"
            emptyMessage="No se encontraron empleados inactivos con los filtros aplicados."
            onViewProfile={handleViewProfile}
            onEditEmployee={handleEditEmployee} /> :

          null}
        </div>
      </main>
    </div>);

};

export default EmployeeDashboard;
