import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { ColumnsDataTable } from '_components/data-table/types/data-table.type';
import { Box, Text } from '@chakra-ui/react';
import Button from '_components/button/Button';
import { HeaderPage } from '_components/header-page/HeaderPage';
import CommonDataTable from '_components/data-table/components/CommonDataTable';
import { UsersModule } from '_store/src/modules';
import { TYPES } from '_store/src';
import { Filter } from '_components/filter/Filter';
import { isEmpty } from 'lodash';

const UsersListTable = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { entityUser } = useSelector(UsersModule.selectors.usersSelector);

  const getUsersList = (page: number) => {
    const requestData: TYPES.MODELS.USERS.IUserGetList = {
      page,
      pageSize: TYPES.CONSTANTS.COMMON.PAGE_SIZE,
      roleType: TYPES.ENUMS.ROLE_TYPE.RoleType.PROMOTER,
    };
    dispatch(UsersModule.actions.usersFindAllRequestAction(requestData));
  };
  useEffect(() => {
    if (isEmpty(entityUser)) {
      getUsersList(TYPES.CONSTANTS.COMMON.INITIAL_PAGE);
    }
  }, [entityUser]);

  const tableUserColumns: ColumnsDataTable[] = [
    {
      header: 'select',
      accessor: 'select',
    },
    {
      header: 'User Name',
      accessor: 'firstName',
      cell: (value: string) => value,
    },
    {
      header: 'Role',
      accessor: 'roleType',
      cell: (value: any) => value,
    },
    {
      header: 'Email',
      accessor: 'email',
      cell: (value: any) => value,
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (input: string) => (
        <Button width="100%" color={'white'} withGradient status={input}>
          {input === 'ACTIVE'
            ? t('COMMON.STATUS.ACTIVE')
            : t('COMMON.STATUS.INACTIVATE')}
        </Button>
      ),
    },
    {
      header: 'COMMON.ACTION',
      accessor: 'action',
      actions: [
        {
          name: 'view',
          handleClick: () => {},
          isShown: true,
        },
        {
          name: (data: any) =>
            data.status === 'ACTIVE' ? 'deactivate' : 'activate',
          handleClick: () => {},
          isShown: true,
        },
        {
          name: 'delete',
          handleClick: () => {},
          isShown: true,
        },
      ],
    },
  ];

  return (
    <Box position={'relative'} mt={'50px'}>
      <Text fontSize="18px" fontWeight="bold">
        {t('USERS.LIST')}
      </Text>
      <Box
        padding="5"
        borderWidth="1px"
        borderRadius="lg"
        mt={'30px'}
        borderColor="gray.200">
        <HeaderPage
          hasPermissionToCreate
          withFilterIcon
          showRefreshIcon
          refreshCallback={() => dispatch(UsersModule.actions.usersClearList())}
          redirectToCreate={() => {}}>
          <Filter>Hello </Filter>
        </HeaderPage>
        <CommonDataTable
          data={entityUser?.content}
          columns={tableUserColumns}
          isLoading={false}
          hidePagination
        />
      </Box>
    </Box>
  );
};
export default UsersListTable;
