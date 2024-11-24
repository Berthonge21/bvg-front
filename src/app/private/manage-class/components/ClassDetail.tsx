'use client';

import BoxContainer from '_components/container/BoxContainer';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { cardStyle, formBoxStyle } from '_theme/cardStyle';
import { useDispatch, useSelector } from 'react-redux';
import {
  AuthModule,
  ClassModule,
  CollaboratorModule,
  SchoolModule,
  StudentModule,
} from '_store/src/modules';
import { UTILS, TYPES } from '_store/src';
import { useTranslation } from 'react-i18next';
import { useRouter, useSearchParams } from 'next/navigation';
import { ColumnsDataTable } from '_components/data-table/types/data-table.type';
import CustomTooltip from '_components/CustomTooltip/CustomTooltip';
import Badge from '_components/badge/Badge';
import { APP_ROUTES } from '_app/config/routes';
import React, { useEffect, useState } from 'react';
import usePermission from '_app/hooks/usePermission';
import CommonDataTable from '_components/data-table/components/CommonDataTable';
import { HeaderPage } from '_components/header-page/HeaderPage';
import { Filter } from '_components/filter/Filter';
import StudentFilter from '_private/manage-students/components/StudentFilter';
import { isEmpty } from 'lodash';

const ClassDetail = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { hasFeatureAccess } = usePermission();
  const requestId = useSearchParams().get('requestId');
  const getDynamicSchoolId = useSelector(SchoolModule.selectors.getSchoolId);
  const { currentUser } = useSelector(AuthModule.selectors.authSelector);
  const { entityCollaborator } = useSelector(
    CollaboratorModule.selectors.collaboratorManagementSelector,
  );
  const [valuesFilter, setValuesFilter] =
    useState<TYPES.MODELS.CLASS_MANAGEMENT.IFilterStudent>({
      studentFilter: {
        lastName: '',
        firstName: '',
        paymentStatus: '',
      },
      schoolId: getDynamicSchoolId,
      id: requestId ?? undefined,
    });
  const [currentPage, setCurrentPage] = useState(
    TYPES.CONSTANTS.COMMON.INITIAL_PAGE,
  );

  const { entityClass, isLoading } = useSelector(
    ClassModule.selectors.classManagementSelector,
  );

  const getClassData = (page: number) => {
    const request: TYPES.MODELS.CLASS_MANAGEMENT.IClassDto = {
      schoolId: getDynamicSchoolId,
      id: requestId ?? undefined,
      page,
      pageSize: TYPES.CONSTANTS.COMMON.PAGE_SIZE,
    };
    dispatch(ClassModule.actions.getAllClassesRequestAction(request));
  };

  const paginationAction = (payload: number) => {
    const request: TYPES.MODELS.CLASS_MANAGEMENT.IFilterStudent = {
      studentFilter: {
        lastName: valuesFilter?.studentFilter?.lastName,
        firstName: valuesFilter?.studentFilter?.firstName,
        sex: valuesFilter?.studentFilter?.sex,
        parentPhone1: valuesFilter?.studentFilter?.parentPhone1,
        paymentStatus: valuesFilter?.studentFilter?.paymentStatus,
      },
      schoolId: getDynamicSchoolId,
      id: requestId ?? undefined,
      page: payload,
      pageSize: TYPES.CONSTANTS.COMMON.PAGE_SIZE,
    };
    dispatch(ClassModule.actions.getAllClassesRequestAction(request));
    setCurrentPage(payload);
  };

  const onFilter = (values: any) => {
    setValuesFilter(values);
    const request: TYPES.MODELS.CLASS_MANAGEMENT.IFilterStudent = {
      studentFilter: {
        lastName: values?.lastName,
        firstName: values?.firstName,
        sex: values?.sex,
        parentPhone1: values?.parentPhone1,
        paymentStatus: values?.paymentStatus,
      },
      schoolId: getDynamicSchoolId,
      id: requestId ?? undefined,
    };
    dispatch(ClassModule.actions.getAllClassesRequestAction(request));
    setCurrentPage(TYPES.CONSTANTS.COMMON.INITIAL_PAGE);
  };

  const onReset = () => {
    setValuesFilter({
      studentFilter: {
        lastName: '',
        firstName: '',
        sex: '',
        parentPhone1: '',
        paymentStatus: '',
      },
      schoolId: getDynamicSchoolId,
      id: requestId ?? undefined,
    });
    getClassData(currentPage);
    setCurrentPage(TYPES.CONSTANTS.COMMON.INITIAL_PAGE);
  };

  useEffect(() => {
    if (requestId || isEmpty(entityClass?.length)) {
      getClassData(currentPage);
    }
  }, [requestId, entityClass?.length]);

  const prepareData = (data: any[]) =>
    Array.isArray(data)
      ? data.map(item => ({
          ...item,
          createdInfo: {
            createdBy: item?.createdBy,
            createdAt: item?.createdAt,
          },
          updatedInfo: {
            updatedBy: item?.updatedBy,
            updatedAt: item?.updatedAt,
          },
        }))
      : [];

  const studentTableColumns: ColumnsDataTable[] = [
    { header: 'select', accessor: 'select' },

    {
      header: 'Name',
      accessor: 'lastName',
    },
    {
      header: 'Address',
      accessor: 'studentAddress',
      cell: (input: any) => {
        return (
          <CustomTooltip label={input}>
            <Text isTruncated cursor="pointer">
              {input}
            </Text>
          </CustomTooltip>
        );
      },
    },
    {
      header: ' Payment Status',
      accessor: 'tuitionPayments',
      cell: (value: any) => {
        return (
          <>
            {value?.map((item: any, index: number) => (
              <Badge key={index} status={item?.paymentStatus} withText />
            ))}
          </>
        );
      },
    },
    ...(currentUser?.roleType === TYPES.ENUMS.ROLE_TYPE.RoleType.PROMOTER
      ? [
          {
            header: 'Cree par',
            accessor: 'createdInfo',
            cell: (value: { createdBy: string; createdAt: string }) => {
              const { createdBy, createdAt } = value;
              const userName =
                createdBy === currentUser?.id
                  ? 'moi'
                  : UTILS.findDynamicIdInList(createdBy, entityCollaborator)
                      ?.firstName;
              return (
                <CustomTooltip
                  label={
                    'Created by ' +
                    userName +
                    ' ' +
                    UTILS.formatDateFormAuditTable(createdAt) +
                    ' a ' +
                    UTILS.getTimeValue(createdAt)
                  }>
                  <Text isTruncated cursor="pointer">
                    {UTILS.formatDateFormAuditTable(createdAt)} {userName}
                  </Text>
                </CustomTooltip>
              );
            },
          },
          {
            header: 'Modifié par',
            accessor: 'updatedInfo',
            cell: (value: { updatedBy: string; updatedAt: string }) => {
              const { updatedBy, updatedAt } = value;
              if (!updatedBy) {
                return '-';
              }
              const userName =
                updatedBy === currentUser?.id
                  ? 'moi'
                  : UTILS.findDynamicIdInList(updatedBy, entityCollaborator)
                      ?.firstName;
              return (
                <CustomTooltip
                  label={
                    'Modifié par ' +
                    userName +
                    ' ' +
                    UTILS.formatDateFormAuditTable(updatedAt) +
                    ' a ' +
                    UTILS.getTimeValue(updatedAt)
                  }>
                  <Text isTruncated cursor="pointer">
                    {UTILS.formatDateFormAuditTable(updatedAt)} {userName}
                  </Text>
                </CustomTooltip>
              );
            },
          },
        ]
      : []),
    {
      header: 'COMMON.ACTION',
      accessor: 'action',
      actions: [
        {
          name: 'edit',
          handleClick: (data: any) => {
            router?.push(
              `${APP_ROUTES.PRIVATE.CLIENT.MANAGE_STUDENTS.ADD_EDIT}?requestId=${data.id}`,
            );
          },
          isShown: hasFeatureAccess(
            UTILS.MODULES_PERMISSIONS.AppModulesPermission.MANAGE_STUDENTS.name,
            UTILS.MODULES_PERMISSIONS.AppModulesPermission.MANAGE_STUDENTS
              .UPDATE_STUDENT,
          ),
        },
        {
          name: 'view',
          handleClick: (data: any) => {},
          isShown: true,
        },
        {
          name: 'pay',
          handleClick: (data: any) => {
            router?.push(
              `${APP_ROUTES.PRIVATE.CLIENT.MANAGE_STUDENTS.TRANSACTION.INFO}?requestId=${data.id}`,
            );
          },
          isShown: hasFeatureAccess(
            UTILS.MODULES_PERMISSIONS.AppModulesPermission
              .MANAGE_STUDENT_TRANSACTION.name,
            UTILS.MODULES_PERMISSIONS.AppModulesPermission
              .MANAGE_STUDENT_TRANSACTION.CREATE_TRANSACTION,
          ),
        },

        {
          name: 'delete',
          handleClick: (data: any) => {},
          isShown: hasFeatureAccess(
            UTILS.MODULES_PERMISSIONS.AppModulesPermission.MANAGE_STUDENTS.name,
            UTILS.MODULES_PERMISSIONS.AppModulesPermission.MANAGE_STUDENTS
              .DELETE_STUDENT,
          ),
        },
      ],
    },
  ];

  return (
    <BoxContainer title={'Class Detail'}>
      {entityClass?.content?.length > 0 ? (
        <Box {...cardStyle}>
          {entityClass?.content?.map((item: any, index: number) => (
            <Box {...formBoxStyle} key={index} bgColor={'white'}>
              <VStack alignItems={'flex-start'} spacing={4}>
                <Flex alignItems={'center'} gap={4}>
                  <Text fontWeight={'bold'} fontSize={'18px'}>
                    {t('STUDENT.CLASS_NAME')} :
                  </Text>
                  <Text fontWeight={'light'} fontSize={'16px'}>
                    {item?.name}
                  </Text>
                </Flex>
                <Flex alignItems={'center'} gap={4}>
                  <Text fontWeight={'bold'} fontSize={'18px'}>
                    {t('STUDENT.GRADE')} :
                  </Text>
                  <Text fontWeight={'light'} fontSize={'16px'}>
                    {t('BAR_CHART.' + item?.grade)}
                  </Text>
                </Flex>
                <Flex alignItems={'center'} gap={4}>
                  <Text fontWeight={'bold'} fontSize={'18px'}>
                    {t('MANAGE_CLASSES.AMOUNT_BY_MONTHS')} :
                  </Text>
                  <Text fontWeight={'light'} fontSize={'16px'}>
                    {UTILS.amountFullFormatCurrency(item?.classAmount)}
                  </Text>
                </Flex>
                <Flex alignItems={'center'} gap={4}>
                  <Text fontWeight={'bold'} fontSize={'18px'}>
                    {t('MANAGE_CLASSES.STUDENT_TOTAL')} :
                  </Text>
                  <Text fontWeight={'light'} fontSize={'16px'}>
                    {item?.students?.length}
                  </Text>
                </Flex>
              </VStack>
            </Box>
          ))}
        </Box>
      ) : null}
      <Box mt={'30px'}>
        <HeaderPage
          pageTitle={'MANAGE_CLASSES.STUDENT_LIST'}
          withFilterIcon
          showRefreshIcon
          refreshCallback={() =>
            dispatch(ClassModule.actions.clearClassesList())
          }
          hasPermissionToCreate={hasFeatureAccess(
            UTILS.MODULES_PERMISSIONS.AppModulesPermission.MANAGE_STUDENTS.name,
            UTILS.MODULES_PERMISSIONS.AppModulesPermission.MANAGE_STUDENTS
              .CREATE_STUDENT,
          )}
          redirectToCreate={() =>
            router.push(APP_ROUTES.PRIVATE.CLIENT.MANAGE_STUDENTS.ADD_EDIT)
          }>
          <Filter>
            <StudentFilter onReset={onReset} onSubmit={onFilter} />
          </Filter>
        </HeaderPage>
        <CommonDataTable
          data={prepareData(
            Array.isArray(entityClass?.content?.[0]?.students)
              ? entityClass?.content[0]?.students
              : [],
          )}
          columns={studentTableColumns}
          currentPage={currentPage}
          totalPage={entityClass?.totalPages}
          lazy
          onLazyLoad={paginationAction}
          isLoading={isLoading}
        />
      </Box>
    </BoxContainer>
  );
};

export default ClassDetail;
