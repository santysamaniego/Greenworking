import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import EmployeeHeader from './components/EmployeeHeader';
import PersonalDataTab from './components/PersonalDataTab';
import DocumentsTab from './components/DocumentsTab';
import EquipmentTab from './components/EquipmentTab';
import BankingTab from './components/BankingTab';
import FamilyTab from './components/FamilyTab';
import EmploymentHistoryTab from './components/EmploymentHistoryTab';
import Icon from '../../components/AppIcon';

const EmployeeProfile = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  // Mock employee data
  const [employee, setEmployee] = useState({
    id: employeeId || 'EMP001',
    employeeId: 'EMP001',
    firstName: 'María Elena',
    lastName: 'Rodríguez',
    cuil: '27-35678901-4',
    dni: '35.678.901',
    email: 'maria.rodriguez@greenworking.com',
    phone: '+54 11 4567-8901',
    address: 'Av. Corrientes 1234, CABA',
    province: 'Buenos Aires',
    birthDate: '1985-03-15',
    startDate: '10/01/2022',
    status: 'active',
    inactiveDate: null,
    maritalStatus: 'married',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1aa0ed789-1763294166422.png",
    photoAlt: 'Professional headshot of Hispanic woman with shoulder-length dark hair wearing navy blazer',

    documents: {
      criminalBackground: {
        status: 'completed',
        uploadDate: '15/02/2022',
        expiryDate: '15/02/2025',
        photo: "https://img.rocket.new/generatedImages/rocket_gen_img_14e031a3b-1763496250164.png",
        photoAlt: 'Official criminal background check document with government seal and stamps'
      },
      medicalExam: {
        status: 'completed',
        uploadDate: '20/01/2022',
        expiryDate: '20/01/2024',
        photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1407a39f1-1763496254034.png",
        photoAlt: 'Medical examination report with doctor signature and clinic letterhead'
      },
      arcaRegistration: {
        status: 'completed',
        uploadDate: '25/01/2022',
        photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1c795ee49-1763496252162.png",
        photoAlt: 'ARCA registration certificate with official government stamps'
      },
      educationDiploma: {
        status: 'completed',
        uploadDate: '05/02/2022',
        photo: "https://images.unsplash.com/photo-1589330694653-ded6df03f754",
        photoAlt: 'High school diploma certificate with school seal and graduation date'
      },
      marriageCertificate: {
        status: 'completed',
        uploadDate: '12/02/2022',
        photo: "https://img.rocket.new/generatedImages/rocket_gen_img_18150f6d1-1763496255139.png",
        photoAlt: 'Marriage certificate with civil registry seal and official signatures'
      },
      driversLicense: {
        status: 'completed',
        uploadDate: '08/02/2022',
        expiryDate: '15/03/2027',
        photo: "https://img.rocket.new/generatedImages/rocket_gen_img_110e5df6c-1763496252419.png",
        photoAlt: 'Argentine drivers license showing photo ID and license categories'
      }
    },

    banking: {
      cbu: '0110599520000001234567',
      bankName: 'Banco Nación',
      accountType: 'Caja de Ahorro'
    },

    benefits: {
      coden: 'COD123456789',
      socialSecurity: 'OSDE',
      healthInsurance: 'Plan 210'
    },

    equipment: {
      uniforms: {
        pants: [
        { size: '42', deliveryDate: '15/01/2022', status: 'assigned' },
        { size: '42', deliveryDate: '20/08/2023', status: 'assigned' }],

        polo: [
        { size: 'M', deliveryDate: '15/01/2022', status: 'assigned' },
        { size: 'M', deliveryDate: '10/06/2023', status: 'assigned' }],

        tshirt: [
        { size: 'M', deliveryDate: '15/01/2022', status: 'assigned' }],

        sweatshirt: [
        { size: 'M', deliveryDate: '20/05/2023', status: 'assigned' }],

        jacket: [
        { size: 'M', deliveryDate: '15/11/2023', status: 'assigned' }],

        shoes: [
        { size: '38', deliveryDate: '15/01/2022', status: 'assigned' }]

      },
      computer: {
        model: 'Lenovo ThinkPad E14',
        serialNumber: 'LN123456789',
        assignedDate: '20/01/2022',
        status: 'assigned',
        notes: 'Equipo en excelente estado'
      },
      phone: {
        model: 'Samsung Galaxy A54',
        serialNumber: 'SM987654321',
        assignedDate: '25/01/2022',
        status: 'assigned',
        notes: 'Incluye plan corporativo'
      },
      tools: [
      {
        name: 'Kit de Herramientas Básicas',
        category: 'Mantenimiento',
        deliveryDate: '30/01/2022',
        status: 'assigned',
        serialNumber: 'KIT001234'
      },
      {
        name: 'Medidor Digital',
        category: 'Instrumentos',
        deliveryDate: '15/03/2022',
        status: 'assigned',
        serialNumber: 'MD789012'
      }]

    },

    family: {
      spouse: {
        name: 'Carlos Alberto Fernández',
        dni: '34.567.890',
        cuil: '20-34567890-1'
      },
      children: [
      {
        name: 'Sofía Rodríguez',
        dni: '45.678.901',
        birthDate: '2010-07-22',
        birthCertificate: true
      },
      {
        name: 'Mateo Rodríguez',
        dni: '46.789.012',
        birthDate: '2013-11-08',
        birthCertificate: true
      }]

    }
  });

  const breadcrumbPath = [
  { label: 'Panel de Control', path: '/employee-dashboard' },
  { label: 'Perfil de Empleado', path: '/employee-profile' },
  { label: `${employee?.firstName} ${employee?.lastName}` }];


  const tabs = [
  { id: 'personal', label: 'Datos Personales', icon: 'User' },
  { id: 'documents', label: 'Documentos', icon: 'FileText' },
  { id: 'equipment', label: 'Equipamiento', icon: 'Package' },
  { id: 'banking', label: 'Bancario y Beneficios', icon: 'CreditCard' },
  { id: 'family', label: 'Información Familiar', icon: 'Users' },
  { id: 'history', label: 'Historial Laboral', icon: 'Briefcase' }];


  const handleStatusChange = (newStatus) => {
    setEmployee((prev) => ({
      ...prev,
      status: newStatus,
      inactiveDate: newStatus === 'inactive' ? new Date()?.toLocaleDateString('es-AR') : null
    }));
  };

  const handleEmployeeUpdate = (updatedData) => {
    setEmployee((prev) => ({ ...prev, ...updatedData }));
  };

  const handleDocumentUpdate = (documentId, documentData) => {
    setEmployee((prev) => ({
      ...prev,
      documents: {
        ...prev?.documents,
        [documentId]: documentData
      }
    }));
  };

  const handleEquipmentUpdate = (type, itemId, equipmentData) => {
    console.log('Equipment update:', type, itemId, equipmentData);
    // Mock equipment update logic
  };

  const handleBreadcrumbNavigate = (path) => {
    navigate(path);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalDataTab employee={employee} onUpdate={handleEmployeeUpdate} />;
      case 'documents':
        return <DocumentsTab employee={employee} onDocumentUpdate={handleDocumentUpdate} />;
      case 'equipment':
        return <EquipmentTab employee={employee} onEquipmentUpdate={handleEquipmentUpdate} />;
      case 'banking':
        return <BankingTab employee={employee} onUpdate={handleEmployeeUpdate} />;
      case 'family':
        return <FamilyTab employee={employee} onUpdate={handleEmployeeUpdate} />;
      case 'history':
        return <EmploymentHistoryTab employee={employee} />;
      default:
        return <PersonalDataTab employee={employee} onUpdate={handleEmployeeUpdate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-sidebar'}`}>
        <div className="p-6 lg:p-8">
          <BreadcrumbNavigation currentPath={breadcrumbPath} onNavigate={handleBreadcrumbNavigate} />
          
          <EmployeeHeader
            employee={employee}
            onStatusChange={handleStatusChange}
            onEdit={() => setActiveTab('personal')} />


          {/* Tab Navigation */}
          <div className="bg-card border border-border rounded-lg mb-6">
            <div className="border-b border-border">
              <nav className="flex flex-wrap gap-1 p-1">
                {tabs?.map((tab) =>
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-md transition-smooth ${
                  activeTab === tab?.id ?
                  'bg-primary text-primary-foreground shadow-soft' :
                  'text-muted-foreground hover:text-foreground hover:bg-muted'}`
                  }>

                    <Icon name={tab?.icon} size={16} />
                    <span className="hidden sm:inline">{tab?.label}</span>
                  </button>
                )}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default EmployeeProfile;
