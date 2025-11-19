import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import DocumentManagement from './pages/document-management';
import EmployeeDashboard from './pages/employee-dashboard';
import EmployeeProfile from './pages/employee-profile';
import EquipmentDistribution from './pages/equipment-distribution';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<EmployeeDashboard />} />
        <Route path="/document-management" element={<DocumentManagement />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee-profile" element={<EmployeeProfile />} />
        <Route path="/equipment-distribution" element={<EquipmentDistribution />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
