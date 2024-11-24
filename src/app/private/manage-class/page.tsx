'use client';

import React, { Suspense } from 'react';
import ProtectedRoute from '_app/layout/ProtectedRoute';
import Loader from '_components/Loader/Loader';

const ListClassTable = React.lazy(
  () => import('_private/manage-class/components/ListClassTable'),
);

const ManageClassPage = () => {
  return (
    <ProtectedRoute>
      <Suspense fallback={<Loader show />}>
        <ListClassTable />
      </Suspense>
    </ProtectedRoute>
  );
};

export default ManageClassPage;
