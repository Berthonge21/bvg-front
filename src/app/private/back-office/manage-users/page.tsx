'use client';

import UsersListTable from '../manage-users/components/UsersListTable';
import ProtectedRoute from '_app/layout/ProtectedRoute';

const ManageUsersPage = () => {
  return (
    <ProtectedRoute>
      <UsersListTable />
    </ProtectedRoute>
  );
};

export default ManageUsersPage;
