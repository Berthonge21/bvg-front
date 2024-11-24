'use client';

import React, { Suspense } from 'react';
import ProtectedRoute from '_app/layout/ProtectedRoute';
import Loader from '_components/Loader/Loader';

const ListAdminTable = React.lazy(
  () => import('_private/manage-staff/components/ListAdminTable'),
);

const page = () => {
  return (
    <ProtectedRoute>
      <Suspense fallback={<Loader show />}>
        <ListAdminTable />
      </Suspense>
    </ProtectedRoute>
  );
};

export default page;
