import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ currentPath = [], onNavigate }) => {
  if (!currentPath || currentPath?.length === 0) return null;

  const handleClick = (path, index) => {
    if (onNavigate) {
      onNavigate(path, index);
    }
  };

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {currentPath?.map((item, index) => {
          const isLast = index === currentPath?.length - 1;
          const isClickable = item?.path && !isLast;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <Icon
                  name="ChevronRight"
                  size={16}
                  className="mx-2 text-border"
                />
              )}
              {isClickable ? (
                <Link
                  to={item?.path}
                  onClick={() => handleClick(item?.path, index)}
                  className="hover:text-foreground transition-micro focus-ring rounded px-1 py-0.5"
                >
                  {item?.label}
                </Link>
              ) : (
                <span
                  className={`px-1 py-0.5 ${
                    isLast ? 'text-foreground font-medium' : 'text-muted-foreground'
                  }`}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item?.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;