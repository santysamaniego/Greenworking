import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationSidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    {
      label: 'Panel de Control',
      path: '/employee-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Vista general de empleados'
    },
    {
      label: 'Gestión de Empleados',
      path: '/employee-profile',
      icon: 'Users',
      tooltip: 'Perfiles individuales de empleados'
    },
    {
      label: 'Documentos',
      path: '/document-management',
      icon: 'FileText',
      tooltip: 'Gestión de documentación'
    },
    {
      label: 'Equipamiento',
      path: '/equipment-distribution',
      icon: 'Package',
      tooltip: 'Distribución de equipos y uniformes'
    }
  ];

  const isActive = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-mobile-nav bg-card p-2 rounded-md shadow-soft border border-border"
        aria-label="Abrir menú de navegación"
      >
        <Icon name="Menu" size={24} />
      </button>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-mobile-backdrop"
          onClick={closeMobileMenu}
        />
      )}
      {/* Sidebar */}
      <nav
        className={`
          fixed top-0 left-0 h-full bg-card border-r border-border z-sidebar
          transition-transform duration-300 ease-out
          ${isCollapsed ? 'w-16' : 'w-sidebar'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center px-nav-item py-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Icon name="Building2" size={20} color="white" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-foreground">GreenWorking</span>
                  <span className="text-xs text-muted-foreground">HRMS</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 py-4">
            <ul className="space-y-1 px-2">
              {menuItems?.map((item) => (
                <li key={item?.path}>
                  <Link
                    to={item?.path}
                    onClick={closeMobileMenu}
                    className={`
                      group flex items-center px-3 py-2.5 rounded-md text-nav font-medium
                      transition-smooth focus-ring
                      ${isActive(item?.path)
                        ? 'bg-primary text-primary-foreground shadow-soft'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }
                    `}
                    title={isCollapsed ? item?.tooltip : undefined}
                  >
                    <Icon
                      name={item?.icon}
                      size={20}
                      className={`
                        ${isCollapsed ? 'mx-auto' : 'mr-3'}
                        ${isActive(item?.path) ? 'text-primary-foreground' : ''}
                      `}
                    />
                    {!isCollapsed && (
                      <span className="truncate">{item?.label}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collapse Toggle (Desktop Only) */}
          {onToggle && (
            <div className="hidden lg:block p-4 border-t border-border">
              <button
                onClick={onToggle}
                className="w-full flex items-center justify-center p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-smooth focus-ring"
                aria-label={isCollapsed ? 'Expandir sidebar' : 'Contraer sidebar'}
              >
                <Icon
                  name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
                  size={20}
                />
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavigationSidebar;