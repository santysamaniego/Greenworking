import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkUploadModal = ({ isOpen, onClose, onBulkUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const employeeOptions = [
    { value: 'juan-perez', label: 'Juan Pérez' },
    { value: 'maria-gonzalez', label: 'María González' },
    { value: 'carlos-rodriguez', label: 'Carlos Rodríguez' },
    { value: 'ana-martinez', label: 'Ana Martínez' },
    { value: 'luis-fernandez', label: 'Luis Fernández' }
  ];

  const documentTypeOptions = [
    { value: 'criminal-background', label: 'Antecedentes Penales' },
    { value: 'medical-exam', label: 'Examen Médico Pre-ocupacional' },
    { value: 'arca-registration', label: 'Registro ARCA' },
    { value: 'education-diploma', label: 'Título Educativo Secundario' },
    { value: 'marriage-certificate', label: 'Certificado de Matrimonio' },
    { value: 'drivers-license', label: 'Licencia de Conducir' }
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
      id: Math.random()?.toString(36)?.substr(2, 9),
      file,
      name: file?.name,
      size: file?.size,
      type: file?.type,
      preview: file?.type?.startsWith('image/') ? URL.createObjectURL(file) : null,
      documentType: '',
      employeeName: '',
      expirationDate: '',
      status: 'pending'
    }));
    setSelectedFiles(prev => [...prev, ...fileArray]);
  };

  const handleFileInput = (e) => {
    if (e?.target?.files) {
      handleFiles(e?.target?.files);
    }
  };

  const updateFileMetadata = (fileId, field, value) => {
    setSelectedFiles(prev => prev?.map(file => 
      file?.id === fileId ? { ...file, [field]: value } : file
    ));
  };

  const removeFile = (fileId) => {
    setSelectedFiles(prev => prev?.filter(file => file?.id !== fileId));
  };

  const handleBulkUpload = async () => {
    const validFiles = selectedFiles?.filter(file => 
      file?.documentType && file?.employeeName
    );

    if (validFiles?.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= validFiles?.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setUploadProgress((i / validFiles?.length) * 100);
    }

    onBulkUpload(validFiles);
    setIsUploading(false);
    onClose();
    
    // Reset state
    setSelectedFiles([]);
    setUploadProgress(0);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const validFilesCount = selectedFiles?.filter(file => 
    file?.documentType && file?.employeeName
  )?.length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Subida Masiva de Documentos</h2>
          <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
        </div>

        <div className="p-6 space-y-6">
          {/* Upload Area */}
          {!isUploading && (
            <div className="space-y-4">
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
                  Arrastra múltiples archivos aquí
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Sube varios documentos a la vez y asigna metadatos individualmente
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
          )}

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-4">
              <div className="text-center">
                <Icon name="Upload" size={48} className="mx-auto text-primary mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">
                  Subiendo documentos...
                </p>
                <p className="text-sm text-muted-foreground">
                  {Math.round(uploadProgress)}% completado
                </p>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Files List */}
          {selectedFiles?.length > 0 && !isUploading && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">
                  Archivos Seleccionados ({selectedFiles?.length})
                </h3>
                <p className="text-sm text-muted-foreground">
                  {validFilesCount} de {selectedFiles?.length} listos para subir
                </p>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {selectedFiles?.map((fileObj) => (
                  <div key={fileObj?.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      {/* File Preview */}
                      <div className="flex-shrink-0">
                        {fileObj?.preview ? (
                          <img
                            src={fileObj?.preview}
                            alt={`Vista previa de ${fileObj?.name}`}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                            <Icon name="FileText" size={24} className="text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      {/* File Info and Metadata */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <p className="font-medium text-foreground truncate">{fileObj?.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(fileObj?.size)}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Select
                            label="Tipo de Documento"
                            options={documentTypeOptions}
                            value={fileObj?.documentType}
                            onChange={(value) => updateFileMetadata(fileObj?.id, 'documentType', value)}
                            placeholder="Seleccionar tipo..."
                            className="text-sm"
                          />
                          
                          <Select
                            label="Empleado"
                            options={employeeOptions}
                            value={fileObj?.employeeName}
                            onChange={(value) => updateFileMetadata(fileObj?.id, 'employeeName', value)}
                            placeholder="Seleccionar empleado..."
                            searchable
                            className="text-sm"
                          />
                        </div>

                        {(fileObj?.documentType === 'drivers-license' || fileObj?.documentType === 'medical-exam') && (
                          <input
                            type="date"
                            placeholder="Fecha de vencimiento"
                            value={fileObj?.expirationDate}
                            onChange={(e) => updateFileMetadata(fileObj?.id, 'expirationDate', e?.target?.value)}
                            className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        )}
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="X"
                        onClick={() => removeFile(fileObj?.id)}
                      />
                    </div>

                    {/* Validation Status */}
                    <div className="mt-3 pt-3 border-t border-border">
                      {fileObj?.documentType && fileObj?.employeeName ? (
                        <div className="flex items-center space-x-2 text-success">
                          <Icon name="CheckCircle" size={16} />
                          <span className="text-sm">Listo para subir</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-warning">
                          <Icon name="AlertCircle" size={16} />
                          <span className="text-sm">Completa los campos requeridos</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          {!isUploading && (
            <div className="flex justify-end space-x-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                onClick={handleBulkUpload}
                disabled={validFilesCount === 0}
              >
                Subir {validFilesCount} Documento{validFilesCount !== 1 ? 's' : ''}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkUploadModal;
