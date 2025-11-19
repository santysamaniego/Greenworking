import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExpirationAlerts = ({ expiringDocuments, onViewDocument, onDismissAlert }) => {
  if (!expiringDocuments || expiringDocuments?.length === 0) return null;

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDaysUntilExpiration = (expirationDate) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getAlertType = (days) => {
    if (days < 0) return { type: 'expired', color: 'bg-red-50 border-red-200', icon: 'AlertCircle' };
    if (days <= 7) return { type: 'critical', color: 'bg-red-50 border-red-200', icon: 'AlertTriangle' };
    if (days <= 30) return { type: 'warning', color: 'bg-amber-50 border-amber-200', icon: 'Clock' };
    return { type: 'info', color: 'bg-blue-50 border-blue-200', icon: 'Info' };
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="AlertTriangle" size={20} className="text-warning" />
          <h3 className="text-lg font-semibold text-foreground">Alertas de Vencimiento</h3>
        </div>
        <span className="text-sm text-muted-foreground">
          {expiringDocuments?.length} documento{expiringDocuments?.length !== 1 ? 's' : ''} requiere{expiringDocuments?.length === 1 ? '' : 'n'} atención
        </span>
      </div>
      <div className="space-y-3">
        {expiringDocuments?.map((doc) => {
          const daysUntilExpiration = getDaysUntilExpiration(doc?.expirationDate);
          const alertInfo = getAlertType(daysUntilExpiration);

          return (
            <div
              key={doc?.id}
              className={`border rounded-lg p-4 ${alertInfo?.color}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Icon name={alertInfo?.icon} size={20} className="text-current mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground">{doc?.type}</h4>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{doc?.employeeName}</span>
                    </div>
                    
                    <p className="text-sm text-foreground mb-2">
                      {daysUntilExpiration < 0 
                        ? `Vencido hace ${Math.abs(daysUntilExpiration)} día${Math.abs(daysUntilExpiration) !== 1 ? 's' : ''}`
                        : daysUntilExpiration === 0
                        ? 'Vence hoy'
                        : `Vence en ${daysUntilExpiration} día${daysUntilExpiration !== 1 ? 's' : ''}`
                      }
                    </p>
                    
                    <p className="text-xs text-muted-foreground">
                      Fecha de vencimiento: {formatDate(doc?.expirationDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                    onClick={() => onViewDocument(doc)}
                  >
                    Ver
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={() => onDismissAlert(doc?.id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Summary Actions */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Documentos críticos: {expiringDocuments?.filter(doc => getDaysUntilExpiration(doc?.expirationDate) <= 7)?.length}
          </span>
          <Button variant="outline" size="sm" iconName="Download">
            Exportar Reporte
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpirationAlerts;