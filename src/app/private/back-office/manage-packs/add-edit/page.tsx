'use client';

import ProtectedRoute from '_app/layout/ProtectedRoute';
import PackForm from '../../manage-packs/components/PackForm';

const AddEditPackPage = () => {
  return (
    <ProtectedRoute>
      <PackForm />
    </ProtectedRoute>
  );
};

export default AddEditPackPage;
