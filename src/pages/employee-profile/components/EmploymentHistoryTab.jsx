import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmploymentHistoryTab = ({ employee }) => {
  const employmentHistory = [
    {
      id: 1,
      position: 'Operario de Campo',
      department: 'Operaciones',
      startDate: '15/03/2023',
      endDate: null,
      status: 'current',
      supervisor: 'Carlos Mendoza',
      location: 'Buenos Aires',
      salary: '$450.000',
      notes: 'Promoción por excelente desempeño en tareas de campo'
    },
    {
      id: 2,
      position: 'Asistente de Campo',
      department: 'Operaciones',
      startDate: '10/01/2022',
      endDate: '14/03/2023',
      status: 'completed',
      supervisor: 'María González',
      location: 'Buenos Aires',
      salary: '$320.000',
      notes: 'Período de entrenamiento y desarrollo inicial'
    }
  ];

  const courses = [
    {
      id: 1,
      name: 'Seguridad e Higiene en el Trabajo',
      provider: 'GreenWorking Academy',
      completionDate: '25/08/2023',
      duration: '40 horas',
      certificate: true,
      status: 'completed'
    },
    {
      id: 2,
      name: 'Manejo de Equipos de Protección Personal',
      provider: 'Instituto de Capacitación Laboral',
      completionDate: '12/06/2023',
      duration: '20 horas',
      certificate: true,
      status: 'completed'
    },
    {
      id: 3,
      name: 'Primeros Auxilios Básicos',
      provider: 'Cruz Roja Argentina',
      completionDate: '05/04/2023',
      duration: '16 horas',
      certificate: true,
      status: 'completed'
    },
    {
      id: 4,
      name: 'Liderazgo y Trabajo en Equipo',
      provider: 'GreenWorking Academy',
      completionDate: null,
      duration: '30 horas',
      certificate: false,
      status: 'in_progress'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      current: { color: 'bg-green-100 text-green-800', icon: 'CheckCircle', text: 'Actual' },
      completed: { color: 'bg-blue-100 text-blue-800', icon: 'Clock', text: 'Finalizado' },
      in_progress: { color: 'bg-yellow-100 text-yellow-800', icon: 'Play', text: 'En Progreso' }
    };

    const config = statusConfig?.[status] || statusConfig?.completed;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} className="mr-1" />
        {config?.text}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">Historial Laboral y Capacitación</h3>
        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
        >
          Agregar Registro
        </Button>
      </div>
      {/* Employment History */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Icon name="Briefcase" size={20} className="text-primary" />
          <h4 className="text-md font-medium text-foreground">Historial de Posiciones</h4>
        </div>

        <div className="space-y-4">
          {employmentHistory?.map((position, index) => (
            <div key={position?.id} className="bg-muted/50 border border-border rounded-lg p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h5 className="text-lg font-medium text-foreground">{position?.position}</h5>
                    {getStatusBadge(position?.status)}
                  </div>
                  <p className="text-muted-foreground mb-1">{position?.department}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      <span>{position?.startDate} - {position?.endDate || 'Presente'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="MapPin" size={14} />
                      <span>{position?.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-semibold text-foreground">{position?.salary}</p>
                  <p className="text-sm text-muted-foreground">Salario mensual</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="User" size={14} />
                    <span>Supervisor</span>
                  </div>
                  <p className="font-medium text-foreground">{position?.supervisor}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Clock" size={14} />
                    <span>Duración</span>
                  </div>
                  <p className="font-medium text-foreground">
                    {position?.endDate 
                      ? `${Math.ceil((new Date(position.endDate.split('/').reverse().join('-')) - new Date(position.startDate.split('/').reverse().join('-'))) / (1000 * 60 * 60 * 24 * 30))} meses`
                      : `${Math.ceil((new Date() - new Date(position.startDate.split('/').reverse().join('-'))) / (1000 * 60 * 60 * 24 * 30))} meses`
                    }
                  </p>
                </div>
              </div>

              {position?.notes && (
                <div className="bg-card border border-border rounded p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="FileText" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Notas</span>
                  </div>
                  <p className="text-sm text-foreground">{position?.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Training and Courses */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="GraduationCap" size={20} className="text-primary" />
            <h4 className="text-md font-medium text-foreground">Capacitación y Cursos</h4>
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium">
              {courses?.filter(course => course?.status === 'completed')?.length} completados
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
          >
            Agregar Curso
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses?.map((course) => (
            <div key={course?.id} className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h5 className="font-medium text-foreground mb-1">{course?.name}</h5>
                  <p className="text-sm text-muted-foreground">{course?.provider}</p>
                </div>
                {getStatusBadge(course?.status)}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duración:</span>
                  <span className="font-medium">{course?.duration}</span>
                </div>
                
                {course?.completionDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completado:</span>
                    <span className="font-medium">{course?.completionDate}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Certificado:</span>
                  {course?.certificate ? (
                    <div className="flex items-center gap-1 text-green-600">
                      <Icon name="CheckCircle" size={14} />
                      <span className="text-xs font-medium">Disponible</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-gray-500">
                      <Icon name="Clock" size={14} />
                      <span className="text-xs font-medium">Pendiente</span>
                    </div>
                  )}
                </div>
              </div>

              {course?.certificate && course?.status === 'completed' && (
                <div className="mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                    fullWidth
                  >
                    Descargar Certificado
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Performance Summary */}
      <div className="bg-muted/50 border border-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h4 className="text-md font-medium text-foreground">Resumen de Desempeño</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Award" size={24} className="text-green-600" />
            </div>
            <h5 className="font-medium text-foreground">Tiempo en la Empresa</h5>
            <p className="text-2xl font-bold text-green-600">
              {Math.ceil((new Date() - new Date('2022-01-10')) / (1000 * 60 * 60 * 24 * 30))} meses
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="GraduationCap" size={24} className="text-blue-600" />
            </div>
            <h5 className="font-medium text-foreground">Cursos Completados</h5>
            <p className="text-2xl font-bold text-blue-600">
              {courses?.filter(course => course?.status === 'completed')?.length}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="TrendingUp" size={24} className="text-purple-600" />
            </div>
            <h5 className="font-medium text-foreground">Promociones</h5>
            <p className="text-2xl font-bold text-purple-600">1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmploymentHistoryTab;