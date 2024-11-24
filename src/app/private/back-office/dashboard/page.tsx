'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AuthModule } from '_store/src/modules';
import { useSelector } from 'react-redux';
import PackStats from '../dashboard/components/stats/PackStats';
import SchoolStats from '../dashboard/components/stats/SchoolStats';
import PacksList from '../dashboard/components/stats/packsList';
import RecentUsers from '../dashboard/components/users/RecentUsers';
import ProtectedRoute from '_app/layout/ProtectedRoute';

const DashboardPage = () => {
  const { t } = useTranslation();
  const currentUser = useSelector(AuthModule.selectors.getAuthUserSelector);

  return (
    <ProtectedRoute>
      <Box mt="20px" mb="20px">
        <Text fontSize="18px" fontWeight="bold" color={'black'}>
          {t('USERS.WELCOME_MESSAGE') +
            ' ' +
            currentUser?.firstName +
            ' ' +
            currentUser?.lastName?.toUpperCase()}
        </Text>
      </Box>
      <PackStats />
      <SchoolStats />
      <Flex mt="20px" mb="20px" width="100%" gap="20px">
        <PacksList />
        <RecentUsers />
      </Flex>
    </ProtectedRoute>
  );
};

export default DashboardPage;
