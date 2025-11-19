import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DocumentUploadModal = ({ isOpen, onClose, onUpload, documentToReplace = null }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [documentType, setDocumentType] = useState(documentToReplace?.type || '');
  const [employeeName, setEmployeeName] = useState(documentToReplace?.employeeName || '');
  const [expirationDate, setExpirationDate] = useState(documentToReplace?.expirationDate || '');
  const fileInputRef = useRef(null);

  const documentTypeOptions = [
    { value: 'criminal-background', label: 'Antecedentes Penales' },
    { value: 'medical-exam', label: 'Examen Médico Pre-ocupacional' },
    { value: 'arca-registration', label: 'Registro ARCA' },
    { value: 'education-diploma', label: 'Título Educativo Secundario' },
    { value: 'marriage-certificate', label: 'Certificado de Matrimonio' },
    { value: 'drivers-license', label: 'Licencia de Conducir' }
  ];

  const employeeOptions = [
    { value: 'juan-perez', label: 'Juan Pérez' },
    { value: 'maria-gonzalez', label: 'María González' },
    { value: 'carlos-rodriguez', label: 'Carlos Rodríguez' },
    { value: 'ana-martinez', label: 'Ana Martínez' },
    { value: 'luis-fernandez', label: 'Luis Fernández' }
  ];

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files)?.map(file => ({
      file,
      name: file?.name,
      size: file?.size,
      type: file?.type,
      preview: file?.type?.startsWith('image/') ? URL.createObjectURL(file) : null
    }));
    setSelectedFiles(prev => [...prev, ...fileArray]);
  };

  const handleFileInput = (e) => {
    if (e?.target?.files) {
      handleFiles(e?.target?.files);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev?.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (selectedFiles?.length > 0 && documentType && employeeName) {
      onUpload({
        files: selectedFiles,
        type: documentType,
        employeeName,
        expirationDate: expirationDate || null,
        isReplacement: !!documentToReplace
      });
      onClose();
      // Reset form
      setSelectedFiles([]);
      setDocumentType('');
      setEmployeeName('');
      setExpirationDate('');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {documentToReplace ? 'Reemplazar Documento' : 'Subir Nuevo Documento'}
          </h2>
          <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Document Type and Employee Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Tipo de Documento"
              options={documentTypeOptions}
              value={documentType}
              onChange={setDocumentType}
              required
              placeholder="Seleccionar tipo..."
            />
            
            <Select
              label="Empleado"
              options={employeeOptions}
              value={employeeName}
              onChange={setEmployeeName}
              required
              searchable
              placeholder="Seleccionar empleado..."
            />
          </div>

          {/* Expiration Date (conditional) */}
          {(documentType === 'drivers-license' || documentType === 'medical-exam') && (
            <Input
              label="Fecha de Vencimiento"
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e?.target?.value)}
              description="Requerido para licencias de conducir y exámenes médicos"
            />
          )}

          {/* File Upload Area */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-foreground">
              Archivos del Documento
            </label>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Icon name="Upload" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">
                Arrastra archivos aquí o haz clic para seleccionar
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Formatos soportados: PDF, JPG, PNG, DOCX (máx. 10MB por archivo)
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef?.current?.click()}
              >
                Seleccionar Archivos
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.docx"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          </div>

          {/* Selected Files Preview */}
          {selectedFiles?.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Archivos Seleccionados:</h4>
              <div className="space-y-2">
                {selectedFiles?.map((fileObj, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    {fileObj?.preview ? (
                      <img
                        src={fileObj?.preview}
                        alt={`Vista previa de ${fileObj?.name}`}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-background rounded flex items-center justify-center">
                        <Icon name="FileText" size={20} className="text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{fileObj?.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(fileObj?.size)}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      onClick={() => removeFile(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={selectedFiles?.length === 0 || !documentType || !employeeName}
            >
              {documentToReplace ? 'Reemplazar Documento' : 'Subir Documento'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentUploadModal;