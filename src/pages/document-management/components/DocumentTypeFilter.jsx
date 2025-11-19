import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentTypeFilter = ({ selectedType, onTypeChange, documentCounts }) => {
  const documentTypes = [
    { 
      id: 'all', 
      label: 'Todos los Documentos', 
      icon: 'Files',
      count: documentCounts?.all || 0
    },
    { 
      id: 'criminal-background', 
      label: 'Antecedentes Penales', 
      icon: 'Shield',
      count: documentCounts?.criminalBackground || 0
    },
    { 
      id: 'medical-exam', 
      label: 'Examen Médico', 
      icon: 'Heart',
      count: documentCounts?.medicalExam || 0
    },
    { 
      id: 'arca-registration', 
      label: 'Registro ARCA', 
      icon: 'FileCheck',
      count: documentCounts?.arcaRegistration || 0
    },
    { 
      id: 'education-diploma', 
      label: 'Título Educativo', 
      icon: 'GraduationCap',
      count: documentCounts?.educationDiploma || 0
    },
    { 
      id: 'marriage-certificate', 
      label: 'Certificado de Matrimonio', 
      icon: 'Heart',
      count: documentCounts?.marriageCertificate || 0
    },
    { 
      id: 'drivers-license', 
      label: 'Licencia de Conducir', 
      icon: 'Car',
      count: documentCounts?.driversLicense || 0
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Filtrar por Tipo de Documento</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {documentTypes?.map((type) => (
          <Button
            key={type?.id}
            variant={selectedType === type?.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => onTypeChange(type?.id)}
            className="flex flex-col items-center p-3 h-auto"
          >
            <Icon name={type?.icon} size={20} className="mb-2" />
            <span className="text-xs font-medium text-center leading-tight">{type?.label}</span>
            <span className="text-xs opacity-75 mt-1">({type?.count})</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DocumentTypeFilter;