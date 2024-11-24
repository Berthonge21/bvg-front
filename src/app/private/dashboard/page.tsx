'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AuthModule } from '_store/src/modules';
import { useSelector } from 'react-redux';

const StudentByCycle = React.lazy(
  () => import('../dashboard/components/student/StudentByCycle'),
);
const StudentFinances = React.lazy(
  () => import('./components/finances/StudentFinances'),
);
const GlobalFinances = React.lazy(
  () => import('./components/finances/GlobalFinances'),
);
const SchoolStaff = React.lazy(
  () => import('./components/schoolStaff/SchoolStaff'),
);

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
      <StudentByCycle />
      <StudentFinances />
      <Flex gap={'20px'}>
        <GlobalFinances />
        <SchoolStaff />
      </Flex>
    </ProtectedRoute>
  );
};

export default DashboardPage;
