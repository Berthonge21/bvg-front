'use client';
import React, { Suspense } from 'react';
import ProtectedRoute from '_app/layout/ProtectedRoute';
import Loader from '_components/Loader/Loader';

const ManageStudentTable = React.lazy(
  () => import('_private/manage-students/components/ManageStudentTable'),
);

const ManageStudents = () => {
  return (
    <ProtectedRoute>
      <Suspense fallback={<Loader show />}>
        <ManageStudentTable />
      </Suspense>
    </ProtectedRoute>
  );
};

export default ManageStudents;
