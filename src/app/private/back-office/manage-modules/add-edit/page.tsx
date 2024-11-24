'use client';

import ManageModuleForm from '../components/ManageModuleForm';
import ProtectedRoute from '_app/layout/ProtectedRoute';

const AddEditModule = () => {
  return (
    <ProtectedRoute>
      <ManageModuleForm />
    </ProtectedRoute>
  );
};

export default AddEditModule;
