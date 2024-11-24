'use client';

import ListPacks from '../manage-packs/components/ListPacks';
import ProtectedRoute from '_app/layout/ProtectedRoute';

const PacksComponent = () => {
  return (
    <ProtectedRoute>
      <ListPacks />
    </ProtectedRoute>
  );
};

export default PacksComponent;
