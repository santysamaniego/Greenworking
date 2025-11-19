import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentViewModal = ({ isOpen, onClose, document }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  if (!isOpen || !document) return null;

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleDownload = () => {
    // Mock download functionality
    const link = document?.createElement('a');
    link.href = document?.fileUrl;
    link.download = `${document?.type}_${document?.employeeName}.pdf`;
    link?.click();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString)?.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'expired':
        return 'text-error bg-red-50 border-red-200';
      case 'expiring':
        return 'text-warning bg-amber-50 border-amber-200';
      case 'valid':
        return 'text-success bg-emerald-50 border-emerald-200';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-lg max-w-6xl w-full max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground">{document?.type}</h2>
              <p className="text-sm text-muted-foreground">{document?.employeeName}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(document?.status)}`}>
              {document?.status}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                iconName="ZoomOut"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.5}
              />
              <span className="text-sm font-medium px-2 min-w-[60px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <Button
                variant="ghost"
                size="sm"
                iconName="ZoomIn"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
              />
            </div>

            {/* Download Button */}
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={handleDownload}
            >
              Descargar
            </Button>

            {/* Close Button */}
            <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
          </div>
        </div>

        {/* Document Info */}
        <div className="px-4 py-3 bg-muted/50 border-b border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-muted-foreground">Fecha de Subida:</span>
              <p className="text-foreground">{formatDate(document?.uploadDate)}</p>
            </div>
            {document?.expirationDate && (
              <div>
                <span className="font-medium text-muted-foreground">Fecha de Vencimiento:</span>
                <p className="text-foreground">{formatDate(document?.expirationDate)}</p>
              </div>
            )}
            <div>
              <span className="font-medium text-muted-foreground">Tamaño:</span>
              <p className="text-foreground">{document?.fileSize || '2.4 MB'}</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Formato:</span>
              <p className="text-foreground">{document?.fileFormat || 'PDF'}</p>
            </div>
          </div>
        </div>

        {/* Document Viewer */}
        <div className="flex-1 overflow-auto bg-slate-100">
          <div className="flex justify-center p-4">
            <div 
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
            >
              {document?.fileUrl ? (
                <Image
                  src={document?.fileUrl}
                  alt={`Documento ${document?.type} de ${document?.employeeName}`}
                  className="max-w-none"
                  style={{ width: '794px', height: '1123px' }} // A4 proportions
                />
              ) : (
                <div className="w-[794px] h-[1123px] flex items-center justify-center bg-white">
                  <div className="text-center">
                    <Icon name="FileText" size={64} className="text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium text-foreground">Vista previa no disponible</p>
                    <p className="text-sm text-muted-foreground">
                      El documento se puede descargar para visualizar
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page Navigation (for multi-page documents) */}
        {document?.totalPages > 1 && (
          <div className="flex items-center justify-center space-x-4 p-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <span className="text-sm text-muted-foreground">
              Página {currentPage} de {document?.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, document?.totalPages))}
              disabled={currentPage === document?.totalPages}
            >
              Siguiente
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentViewModal;