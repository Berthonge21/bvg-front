'use client';
import ModuleManagementListTable from './components/ModuleManagementListTable';
import ProtectedRoute from '_app/layout/ProtectedRoute';

const ModulePage = () => {
  return (
    <ProtectedRoute>
      <ModuleManagementListTable />
    </ProtectedRoute>
  );
};

export default ModulePage;
