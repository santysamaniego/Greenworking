import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentsTab = ({ employee, onDocumentUpdate }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const documents = [
  {
    id: 'criminal_background',
    title: 'Antecedentes Penales',
    icon: 'Shield',
    status: employee?.documents?.criminalBackground?.status || 'pending',
    uploadDate: employee?.documents?.criminalBackground?.uploadDate,
    expiryDate: employee?.documents?.criminalBackground?.expiryDate,
    photo: employee?.documents?.criminalBackground?.photo,
    photoAlt: employee?.documents?.criminalBackground?.photoAlt
  },
  {
    id: 'medical_exam',
    title: 'Examen Médico Preocupacional',
    icon: 'Stethoscope',
    status: employee?.documents?.medicalExam?.status || 'pending',
    uploadDate: employee?.documents?.medicalExam?.uploadDate,
    expiryDate: employee?.documents?.medicalExam?.expiryDate,
    photo: employee?.documents?.medicalExam?.photo,
    photoAlt: employee?.documents?.medicalExam?.photoAlt
  },
  {
    id: 'arca_registration',
    title: 'Registro ARCA',
    icon: 'FileCheck',
    status: employee?.documents?.arcaRegistration?.status || 'pending',
    uploadDate: employee?.documents?.arcaRegistration?.uploadDate,
    photo: employee?.documents?.arcaRegistration?.photo,
    photoAlt: employee?.documents?.arcaRegistration?.photoAlt
  },
  {
    id: 'education_diploma',
    title: 'Título Secundario',
    icon: 'GraduationCap',
    status: employee?.documents?.educationDiploma?.status || 'pending',
    uploadDate: employee?.documents?.educationDiploma?.uploadDate,
    photo: employee?.documents?.educationDiploma?.photo,
    photoAlt: employee?.documents?.educationDiploma?.photoAlt
  },
  {
    id: 'marriage_certificate',
    title: 'Certificado de Matrimonio',
    icon: 'Heart',
    status: employee?.documents?.marriageCertificate?.status || 'not_applicable',
    uploadDate: employee?.documents?.marriageCertificate?.uploadDate,
    photo: employee?.documents?.marriageCertificate?.photo,
    photoAlt: employee?.documents?.marriageCertificate?.photoAlt,
    required: employee?.maritalStatus === 'married'
  },
  {
    id: 'drivers_license',
    title: 'Licencia de Conducir',
    icon: 'Car',
    status: employee?.documents?.driversLicense?.status || 'pending',
    uploadDate: employee?.documents?.driversLicense?.uploadDate,
    expiryDate: employee?.documents?.driversLicense?.expiryDate,
    photo: employee?.documents?.driversLicense?.photo,
    photoAlt: employee?.documents?.driversLicense?.photoAlt
  }];


  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-green-100 text-green-800', icon: 'CheckCircle', text: 'Completo' },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: 'Clock', text: 'Pendiente' },
      expired: { color: 'bg-red-100 text-red-800', icon: 'AlertTriangle', text: 'Vencido' },
      not_applicable: { color: 'bg-gray-100 text-gray-800', icon: 'Minus', text: 'No Aplica' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} className="mr-1" />
        {config?.text}
      </span>);

  };

  const handleDocumentClick = (document) => {
    if (document?.photo) {
      setSelectedDocument(document);
    }
  };

  const handleUpload = (documentId) => {
    // Mock upload functionality
    console.log('Uploading document:', documentId);
    onDocumentUpdate(documentId, {
      status: 'completed',
      uploadDate: new Date()?.toLocaleDateString('es-AR'),
      photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1867bcea5-1763496250832.png",
      photoAlt: 'Documento oficial escaneado con sellos y firmas'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">Documentación</h3>
        <Button
          variant="outline"
          iconName="Upload"
          iconPosition="left">

          Subir Documento
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents?.map((document) =>
        <div
          key={document?.id}
          className={`bg-muted/50 border border-border rounded-lg p-4 transition-smooth ${
          document?.photo ? 'cursor-pointer hover:bg-muted/70' : ''}`
          }
          onClick={() => handleDocumentClick(document)}>

            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={document?.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{document?.title}</h4>
                  {document?.required &&
                <span className="text-xs text-red-600">Requerido</span>
                }
                </div>
              </div>
              {getStatusBadge(document?.status)}
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              {document?.uploadDate &&
            <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={14} />
                  <span>Subido: {document?.uploadDate}</span>
                </div>
            }
              {document?.expiryDate &&
            <div className="flex items-center gap-2">
                  <Icon name="CalendarX" size={14} />
                  <span>Vence: {document?.expiryDate}</span>
                </div>
            }
              {document?.photo &&
            <div className="flex items-center gap-2">
                  <Icon name="Eye" size={14} />
                  <span>Click para ver documento</span>
                </div>
            }
            </div>

            {document?.status === 'pending' &&
          <div className="mt-3">
                <Button
              variant="outline"
              size="sm"
              iconName="Upload"
              iconPosition="left"
              onClick={(e) => {
                e?.stopPropagation();
                handleUpload(document?.id);
              }}
              fullWidth>

                  Subir Documento
                </Button>
              </div>
          }
          </div>
        )}
      </div>
      {/* Document Preview Modal */}
      {selectedDocument &&
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-medium text-foreground">
                {selectedDocument?.title}
              </h3>
              <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedDocument(null)}>

                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="p-4">
              <Image
              src={selectedDocument?.photo}
              alt={selectedDocument?.photoAlt}
              className="w-full h-auto rounded-lg" />

            </div>
          </div>
        </div>
      }
    </div>);

};

export default DocumentsTab;