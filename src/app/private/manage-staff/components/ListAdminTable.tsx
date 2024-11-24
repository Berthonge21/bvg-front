'use client';
import { Box, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HeaderPage } from '_components/header-page/HeaderPage';
import { Filter } from '_components/filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import CommonDataTable from '_components/data-table/components/CommonDataTable';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '_app/config/routes';
import { CollaboratorModule } from '_store/src/modules';
import { UTILS } from '_store/src';
import { AppModulesPermission } from '_store/src/utils/AppModulesPermission';
import usePermission from '_app/hooks/usePermission';

const ListAdminTable = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { hasFeatureAccess } = usePermission();
  const { entityCollaborator } = useSelector(
    CollaboratorModule.selectors.collaboratorManagementSelector,
  );

  const columns: any = [
    {
      header: 'Matricule',
      accessor: 'matricule',
      cell: (value: string) => value,
    },
    {
      header: 'First Name',
      accessor: 'firstName',
      cell: (value: string) => value,
    },
    {
      header: 'Last Name',
      accessor: 'lastName',
      cell: (value: string) => value,
    },
    {
      header: 'Email',
      accessor: 'email',
      cell: (value: string) => value,
      disable: true,
    },

    {
      header: 'Phone',
      accessor: 'phone',
      cell: (value: string) => value,
    },
    {
      header: 'Salary',
      accessor: 'salary',
      cell: (value: string) => UTILS.amountFullFormatCurrency(+value),
    },
    // {
    //   header: 'Contract Type',
    //   accessor: 'contractType',
    //   cell: (value: string) => value,
    // },
    // {
    //   header: 'Payment Status',
    //   accessor: 'paymentStatus',
    //   cell: (value: string) => value,
    // },
    {
      header: 'Action',
      accessor: 'action',
      actions: [
        {
          name: 'edit',
          handleClick: () => {},
          isShown: hasFeatureAccess(
            AppModulesPermission.MANAGE_STUDENT_TRANSACTION.name,
            AppModulesPermission.MANAGE_STUDENT_TRANSACTION.UPDATE_TRANSACTION,
          ),
        },
        {
          name: 'pay',
          handleClick: () => {},
          isShown: true,
        },
        {
          name: 'view',
          handleClick: () => {},
          isShown: true,
        },
        {
          name: 'delete',
          handleClick: () => {},
          isShown: hasFeatureAccess(
            AppModulesPermission.MANAGE_STUDENT_TRANSACTION.name,
            AppModulesPermission.MANAGE_STUDENT_TRANSACTION.DELETE_TRANSACTION,
          ),
        },
      ],
    },
  ];

  useEffect(() => {
    if (entityCollaborator?.content?.length === 0) {
      dispatch(CollaboratorModule.actions.getCollaboratorRequestAction({}));
    }
  }, []);

  return (
    <Box position={'relative'} mt={'50px'}>
      <Text fontSize="18px" fontWeight="bold">
        {t('SIDE_BAR.MANAGE_ADMIN')}
      </Text>
      <HeaderPage
        redirectToCreate={() =>
          router.push(
            `${APP_ROUTES.PRIVATE.CLIENT.MANAGE_STAFF.ADMIN.ADD_EDIT}?type=ADMIN`,
          )
        }
        withFilterIcon
        hasPermissionToCreate
        refreshCallback={() => {}}>
        <Filter>Filter staff</Filter>
      </HeaderPage>
      <CommonDataTable
        data={entityCollaborator?.content}
        columns={columns}
        isLoading={false}
      />
    </Box>
  );
};

export default ListAdminTable;
