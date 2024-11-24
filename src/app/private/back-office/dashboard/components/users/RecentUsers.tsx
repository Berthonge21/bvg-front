import { Box, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { UsersModule } from '_store/src/modules';
import CommonDataTable from '_components/data-table/components/CommonDataTable';
import { ColumnsDataTable } from '_components/data-table/types/data-table.type';
import Button from '_components/button/Button';
import { TYPES } from '_store/src';

const RecentUsers = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { entityUser } = useSelector(UsersModule.selectors.usersSelector);

  useEffect(() => {
    const requestData: TYPES.MODELS.USERS.IUserGetList = {
      page: TYPES.CONSTANTS.COMMON.INITIAL_PAGE,
      pageSize: TYPES.CONSTANTS.COMMON.PAGE_SIZE,
      roleType: TYPES.ENUMS.ROLE_TYPE.RoleType.PROMOTER,
    };
    dispatch(UsersModule.actions.usersFindAllRequestAction(requestData));
  }, []);

  const tableUserColumns: ColumnsDataTable[] = [
    {
      header: 'User Name',
      accessor: 'firstName',
      cell: (value: string) => value,
    },

    {
      header: 'Email',
      accessor: 'email',
      cell: (value: any) => value,
    },
    {
      header: 'Role',
      accessor: 'roleType',
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
  ];
  return (
    <Box
      width="100%"
      h="100%"
      bgColor="white"
      borderRadius="7px"
      borderWidth={2}
      borderColor="lightgray.500"
      p="3">
      <Box mt="10px" gap={'10px'} display={'flex'} flexDirection={'column'}>
        <Text fontSize="18px" fontWeight="bold">
          {t('USERS.RECENT_USERS')}
        </Text>
        <CommonDataTable
          data={entityUser?.content?.slice(0, 3)}
          columns={tableUserColumns}
          isLoading={false}
          hidePagination
        />
      </Box>
    </Box>
  );
};

export default RecentUsers;
