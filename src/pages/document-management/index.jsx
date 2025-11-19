import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import DocumentCard from './components/DocumentCard';
import DocumentTypeFilter from './components/DocumentTypeFilter';
import DocumentUploadModal from './components/DocumentUploadModal';
import DocumentViewModal from './components/DocumentViewModal';
import ExpirationAlerts from './components/ExpirationAlerts';
import BulkUploadModal from './components/BulkUploadModal';

const DocumentManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocumentType, setSelectedDocumentType] = useState('all');
  const [sortBy, setSortBy] = useState('uploadDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documentToReplace, setDocumentToReplace] = useState(null);
  const [documents, setDocuments] = useState([]);

  // Mock documents data
  const mockDocuments = [
  {
    id: 1,
    type: 'Antecedentes Penales',
    employeeName: 'Juan Pérez',
    uploadDate: '2024-11-15',
    expirationDate: null,
    status: 'valid',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop',
    fileUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=1000&fit=crop',
    fileSize: '2.4 MB',
    fileFormat: 'PDF',
    totalPages: 1
  },
  {
    id: 2,
    type: 'Examen Médico Pre-ocupacional',
    employeeName: 'María González',
    uploadDate: '2024-11-10',
    expirationDate: '2024-12-01',
    status: 'expiring',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1b28c64d6-1763496251852.png",
    fileUrl: "https://images.unsplash.com/photo-1595994432291-82573ba1086d",
    fileSize: '1.8 MB',
    fileFormat: 'PDF',
    totalPages: 3
  },
  {
    id: 3,
    type: 'Registro ARCA',
    employeeName: 'Carlos Rodríguez',
    uploadDate: '2024-11-08',
    expirationDate: null,
    status: 'valid',
    thumbnail: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop',
    fileUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=1000&fit=crop',
    fileSize: '3.1 MB',
    fileFormat: 'PDF',
    totalPages: 2
  },
  {
    id: 4,
    type: 'Licencia de Conducir',
    employeeName: 'Ana Martínez',
    uploadDate: '2024-11-05',
    expirationDate: '2024-11-20',
    status: 'expired',
    thumbnail: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=200&fit=crop',
    fileUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=1000&fit=crop',
    fileSize: '1.2 MB',
    fileFormat: 'JPG',
    totalPages: 1
  },
  {
    id: 5,
    type: 'Título Educativo Secundario',
    employeeName: 'Luis Fernández',
    uploadDate: '2024-11-03',
    expirationDate: null,
    status: 'valid',
    thumbnail: "https://images.unsplash.com/photo-1708616601690-5b322e9ec088",
    fileUrl: "https://images.unsplash.com/photo-1708616601690-5b322e9ec088",
    fileSize: '2.7 MB',
    fileFormat: 'PDF',
    totalPages: 1
  },
  {
    id: 6,
    type: 'Certificado de Matrimonio',
    employeeName: 'María González',
    uploadDate: '2024-11-01',
    expirationDate: null,
    status: 'valid',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1df3a036f-1763496250488.png",
    fileUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_121ec9969-1763496251331.png",
    fileSize: '1.9 MB',
    fileFormat: 'PDF',
    totalPages: 1
  }];


  useEffect(() => {
    setDocuments(mockDocuments);
  }, []);

  const breadcrumbPath = [
  { label: 'Panel de Control', path: '/employee-dashboard' },
  { label: 'Gestión de Documentos', path: '/document-management' }];


  // Filter and sort documents
  const filteredDocuments = documents?.filter((doc) => {
    const matchesSearch = doc?.employeeName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    doc?.type?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesType = selectedDocumentType === 'all' ||
    doc?.type?.toLowerCase()?.includes(selectedDocumentType?.replace('-', ' '));
    return matchesSearch && matchesType;
  });

  const sortedDocuments = [...filteredDocuments]?.sort((a, b) => {
    let aValue = a?.[sortBy];
    let bValue = b?.[sortBy];

    if (sortBy === 'uploadDate' || sortBy === 'expirationDate') {
      aValue = new Date(aValue || '1900-01-01');
      bValue = new Date(bValue || '1900-01-01');
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Get expiring documents for alerts
  const expiringDocuments = documents?.filter((doc) => {
    if (!doc?.expirationDate) return false;
    const today = new Date();
    const expDate = new Date(doc.expirationDate);
    const diffTime = expDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30; // Show documents expiring in 30 days or less
  });

  // Document counts for filter
  const documentCounts = {
    all: documents?.length,
    criminalBackground: documents?.filter((d) => d?.type?.includes('Antecedentes'))?.length,
    medicalExam: documents?.filter((d) => d?.type?.includes('Médico'))?.length,
    arcaRegistration: documents?.filter((d) => d?.type?.includes('ARCA'))?.length,
    educationDiploma: documents?.filter((d) => d?.type?.includes('Título'))?.length,
    marriageCertificate: documents?.filter((d) => d?.type?.includes('Matrimonio'))?.length,
    driversLicense: documents?.filter((d) => d?.type?.includes('Licencia'))?.length
  };

  const handleViewDocument = (document) => {
    setSelectedDocument(document);
    setShowViewModal(true);
  };

  const handleReplaceDocument = (document) => {
    setDocumentToReplace(document);
    setShowUploadModal(true);
  };

  const handleDeleteDocument = (document) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el documento ${document?.type} de ${document?.employeeName}?`)) {
      setDocuments((prev) => prev?.filter((d) => d?.id !== document?.id));
    }
  };

  const handleUploadDocument = (uploadData) => {
    // Mock upload functionality
    const newDocument = {
      id: Date.now(),
      type: uploadData?.type,
      employeeName: uploadData?.employeeName,
      uploadDate: new Date()?.toISOString()?.split('T')?.[0],
      expirationDate: uploadData?.expirationDate,
      status: 'valid',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop',
      fileUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=1000&fit=crop',
      fileSize: '2.1 MB',
      fileFormat: 'PDF',
      totalPages: 1
    };

    if (uploadData?.isReplacement && documentToReplace) {
      setDocuments((prev) => prev?.map((d) =>
      d?.id === documentToReplace?.id ? { ...newDocument, id: documentToReplace?.id } : d
      ));
      setDocumentToReplace(null);
    } else {
      setDocuments((prev) => [...prev, newDocument]);
    }
  };

  const handleBulkUpload = (files) => {
    const newDocuments = files?.map((fileData, index) => ({
      id: Date.now() + index,
      type: fileData?.documentType,
      employeeName: fileData?.employeeName,
      uploadDate: new Date()?.toISOString()?.split('T')?.[0],
      expirationDate: fileData?.expirationDate || null,
      status: 'valid',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop',
      fileUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=1000&fit=crop',
      fileSize: '2.1 MB',
      fileFormat: 'PDF',
      totalPages: 1
    }));

    setDocuments((prev) => [...prev, ...newDocuments]);
  };

  const handleDismissAlert = (documentId) => {
    // Mock dismiss functionality - in real app, this would mark as dismissed in backend
    console.log('Dismissed alert for document:', documentId);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-sidebar'}`}>
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6">
            <BreadcrumbNavigation
              currentPath={breadcrumbPath}
              onNavigate={(path) => {}} />

            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold text-foreground mb-2">
                  Gestión de Documentos
                </h1>
                <p className="text-muted-foreground">
                  Centraliza la carga, visualización y seguimiento de toda la documentación de empleados
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Upload"
                  onClick={() => setShowBulkUploadModal(true)}>

                  Subida Masiva
                </Button>
                <Button
                  iconName="Plus"
                  onClick={() => setShowUploadModal(true)}>

                  Subir Documento
                </Button>
              </div>
            </div>
          </div>

          {/* Expiration Alerts */}
          <ExpirationAlerts
            expiringDocuments={expiringDocuments}
            onViewDocument={handleViewDocument}
            onDismissAlert={handleDismissAlert} />


          {/* Document Type Filter */}
          <DocumentTypeFilter
            selectedType={selectedDocumentType}
            onTypeChange={setSelectedDocumentType}
            documentCounts={documentCounts} />


          {/* Search and Sort Controls */}
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1 max-w-md">
                <Input
                  type="search"
                  placeholder="Buscar por empleado o tipo de documento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e?.target?.value)}
                  className="w-full" />

              </div>
              
              <div className="flex items-center space-x-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e?.target?.value)}
                  className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary">

                  <option value="uploadDate">Fecha de Subida</option>
                  <option value="expirationDate">Fecha de Vencimiento</option>
                  <option value="employeeName">Nombre del Empleado</option>
                  <option value="type">Tipo de Documento</option>
                </select>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'}
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>

                  {sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}
                </Button>
              </div>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Documentos ({sortedDocuments?.length})
              </h2>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span>Válido</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <span>Por vencer</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-error rounded-full"></div>
                  <span>Vencido</span>
                </div>
              </div>
            </div>

            {sortedDocuments?.length > 0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedDocuments?.map((document) =>
              <DocumentCard
                key={document?.id}
                document={document}
                onView={handleViewDocument}
                onReplace={handleReplaceDocument}
                onDelete={handleDeleteDocument} />

              )}
              </div> :

            <div className="text-center py-12">
                <Icon name="FileText" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No se encontraron documentos
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm || selectedDocumentType !== 'all' ? 'Intenta ajustar los filtros de búsqueda' : 'Comienza subiendo el primer documento'}
                </p>
                {!searchTerm && selectedDocumentType === 'all' &&
              <Button
                iconName="Plus"
                onClick={() => setShowUploadModal(true)}>

                    Subir Primer Documento
                  </Button>
              }
              </div>
            }
          </div>

          {/* Quick Actions */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/employee-profile"
              className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-smooth group">

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon name="Users" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Perfiles de Empleados</h3>
                  <p className="text-sm text-muted-foreground">Ver documentos por empleado</p>
                </div>
              </div>
            </Link>

            <Link
              to="/equipment-distribution"
              className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-smooth group">

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Icon name="Package" size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Equipamiento</h3>
                  <p className="text-sm text-muted-foreground">Gestionar equipos y uniformes</p>
                </div>
              </div>
            </Link>

            <Link
              to="/employee-dashboard"
              className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-smooth group">

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Icon name="LayoutDashboard" size={20} className="text-secondary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Panel de Control</h3>
                  <p className="text-sm text-muted-foreground">Vista general del sistema</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
      {/* Modals */}
      <DocumentUploadModal
        isOpen={showUploadModal}
        onClose={() => {
          setShowUploadModal(false);
          setDocumentToReplace(null);
        }}
        onUpload={handleUploadDocument}
        documentToReplace={documentToReplace} />

      <DocumentViewModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedDocument(null);
        }}
        document={selectedDocument} />

      <BulkUploadModal
        isOpen={showBulkUploadModal}
        onClose={() => setShowBulkUploadModal(false)}
        onBulkUpload={handleBulkUpload} />

    </div>);

};

export default DocumentManagement;
