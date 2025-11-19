import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentCard = ({ document, onView, onReplace, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'expired':
        return 'AlertCircle';
      case 'expiring':
        return 'Clock';
      case 'valid':
        return 'CheckCircle';
      default:
        return 'FileText';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString)?.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div
      className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-smooth"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Document Preview */}
      <div className="relative mb-3">
        <div className="w-full h-32 bg-muted rounded-md overflow-hidden">
          {document?.thumbnail ? (
            <Image
              src={document?.thumbnail}
              alt={`Vista previa del documento ${document?.type} de ${document?.employeeName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icon name="FileText" size={32} className="text-muted-foreground" />
            </div>
          )}
        </div>
        
        {/* Status Badge */}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(document?.status)}`}>
          <div className="flex items-center space-x-1">
            <Icon name={getStatusIcon(document?.status)} size={12} />
            <span className="capitalize">{document?.status}</span>
          </div>
        </div>
      </div>
      {/* Document Info */}
      <div className="space-y-2">
        <div>
          <h3 className="font-medium text-foreground truncate">{document?.type}</h3>
          <p className="text-sm text-muted-foreground truncate">{document?.employeeName}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div>
            <span className="block font-medium">Subido:</span>
            <span>{formatDate(document?.uploadDate)}</span>
          </div>
          {document?.expirationDate && (
            <div>
              <span className="block font-medium">Vence:</span>
              <span>{formatDate(document?.expirationDate)}</span>
            </div>
          )}
        </div>
      </div>
      {/* Actions */}
      {isHovered && (
        <div className="mt-3 flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            onClick={() => onView(document)}
            className="flex-1"
          >
            Ver
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Upload"
            onClick={() => onReplace(document)}
            className="flex-1"
          >
            Reemplazar
          </Button>
          <Button
            variant="destructive"
            size="sm"
            iconName="Trash2"
            onClick={() => onDelete(document)}
          >
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentCard;