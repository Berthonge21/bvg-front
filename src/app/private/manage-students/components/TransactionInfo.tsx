'use client';

import BoxContainer from '_components/container/BoxContainer';
import { Formik } from 'formik';
import { Box, VStack, Text } from '@chakra-ui/react';
import StudentPersonalInfo from '_private/manage-students/components/StudentPersonalInfo';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CommonDataTable from '_components/data-table/components/CommonDataTable';
import { HeaderPage } from '_components/header-page/HeaderPage';
import { Filter } from '_components/filter/Filter';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  AuthModule,
  CollaboratorModule,
  StudentModule,
} from '_store/src/modules';
import { TYPES, UTILS } from '_store/src';
import { studentInitialValues } from '_private/manage-students/interface/students';
import Badge from '_components/badge/Badge';
import { APP_ROUTES } from '_app/config/routes';
import TransactionFilter from '_private/manage-students/components/TransactionFilter';
import usePermission from '_app/hooks/usePermission';
import CustomTooltip from '_components/CustomTooltip/CustomTooltip';

const TransactionInfo = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const requestId = useSearchParams().get('requestId');
  const { hasFeatureAccess } = usePermission();
  const { currentUser } = useSelector(AuthModule.selectors.authSelector);
  const { entityCollaborator } = useSelector(
    CollaboratorModule.selectors.collaboratorManagementSelector,
  );
  const router = useRouter();
  const formikRef: any = useRef();
  const [initialValues, setInitialValues] = useState(studentInitialValues);
  const { entityStudent, isLoading, transactionHistory } = useSelector(
    StudentModule.selectors.studentSelector,
  );
  const [currentPage, setCurrentPage] = useState(
    TYPES.CONSTANTS.COMMON.INITIAL_PAGE,
  );
  const [valuesFilter, setValuesFilter] =
    useState<TYPES.MODELS.STUDENTS.ITransactionDto>({
      studentId: requestId ?? undefined,
      months: '',
      page: TYPES.CONSTANTS.COMMON.INITIAL_PAGE,
      pageSize: TYPES.CONSTANTS.COMMON.PAGE_SIZE,
    });

  const existingStudent = entityStudent?.content?.find(
    (student: { id: string | null }) => student.id === requestId,
  );

  const getTransactionHistory = (page: number) => {
    const request: TYPES.MODELS.STUDENTS.ITransactionDto = {
      studentId: requestId ?? undefined,
      page: page,
      pageSize: TYPES.CONSTANTS.COMMON.PAGE_SIZE,
    };
    dispatch(StudentModule.actions.getTransactionHistoryRequestAction(request));
  };

  const paginationAction = (payload: number) => {
    const request: TYPES.MODELS.STUDENTS.ITransactionDto = {
      studentId: requestId ?? undefined,
      page: payload,
      pageSize: TYPES.CONSTANTS.COMMON.PAGE_SIZE,
      months: valuesFilter?.months,
    };
    dispatch(StudentModule.actions.getTransactionHistoryRequestAction(request));
    setCurrentPage(payload);
  };

  const onFilter = (values: any) => {
    setValuesFilter(values);
    const request: TYPES.MODELS.STUDENTS.ITransactionDto = {
      studentId: requestId ?? undefined,
      months: values?.months,
    };
    dispatch(StudentModule.actions.getTransactionHistoryRequestAction(request));
    setCurrentPage(TYPES.CONSTANTS.COMMON.INITIAL_PAGE);
  };

  const onReset = () => {
    setValuesFilter({
      studentId: '',
      page: 0,
      pageSize: 0,
    });
    getTransactionHistory(currentPage);
    setCurrentPage(TYPES.CONSTANTS.COMMON.INITIAL_PAGE);
  };

  useEffect(() => {
    if (requestId) {
      if (existingStudent) {
        setInitialValues({
          ...existingStudent,
          birthDate: UTILS.parseDateString(existingStudent?.birthDate),
        });
      }
    }
  }, [requestId, entityStudent]);

  useEffect(() => {
    if (requestId && entityStudent) {
      if (existingStudent) {
        setInitialValues({
          ...existingStudent,
          birthDate: UTILS.parseDateString(existingStudent?.birthDate),
        });
      }
      getTransactionHistory(TYPES.CONSTANTS.COMMON.INITIAL_PAGE);
    }
  }, [existingStudent, requestId]);

  const mappedTransactions = transactionHistory?.content?.map(
    (transaction: { paymentDate: string | number | Date; months: string }) => {
      const paymentMonth =
        transaction.months ??
        UTILS.getMonthFromDateString(
          transaction.paymentDate as typeof UTILS.APP_DATE_FORMAT,
        );
      return {
        ...transaction,
        months: paymentMonth,
      };
    },
  );

  const prepareData = (data: any[]) =>
    data?.map(item => ({
      ...item,
      createdInfo: {
        createdBy: item.createdBy,
        createdAt: item.createdAt,
      },
      updatedInfo: {
        updatedBy: item.updatedBy,
        updatedAt: item.updatedAt,
      },
    }));

  const tableColumns: any[] = [
    {
      header: 'months',
      accessor: 'months',
    },
    {
      header: 'payment type',
      accessor: 'paymentType',
      cell: (value: any) => {
        return (
          <Text>
            {value === TYPES.ENUMS.PAYMENT_STATUS.PaymentType.INSCRIPTION_FEES
              ? t('COMMON.PAYMENT_STATUS.INSCRIPTION_FEES')
              : t('COMMON.PAYMENT_STATUS.SCHOOLING')}
          </Text>
        );
      },
    },
    {
      header: 'Except amount',
      accessor: 'expectAmount',
      cell: (value: any) => {
        return <Text>{UTILS.amountFullFormatCurrency(value)}</Text>;
      },
    },
    {
      header: 'receive amount',
      accessor: 'receivedAmount',
      cell: (value: any) => {
        return <Text>{UTILS.amountFullFormatCurrency(value)}</Text>;
      },
    },
    {
      header: 'payment date',
      accessor: 'paymentDate',
    },
    {
      header: 'status',
      accessor: 'paymentStatus',
      cell: (value: any) => {
        return <Badge status={value} withText />;
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
            router.push(
              `${APP_ROUTES.PRIVATE.CLIENT.MANAGE_STUDENTS.TRANSACTION.ADD_EDIT}?transactionId=${data.id}`,
            );
          },
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
          isShown: true,
        },
      ],
    },
  ];

  return (
    <BoxContainer>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={() => {}}
        innerRef={formikRef}>
        {({ setFieldValue, values }) => (
          <Box>
            <VStack spacing={5} alignItems={'flex-start'}>
              <StudentPersonalInfo
                setFieldValue={setFieldValue}
                values={values}
                disabledForm
                bgColor={'white'}
              />
            </VStack>
          </Box>
        )}
      </Formik>
      <Box mt={'30px'}>
        <HeaderPage
          pageTitle={'STUDENT.TRANSACTION.TITLE'}
          withFilterIcon
          hasPermissionToCreate={hasFeatureAccess(
            UTILS.MODULES_PERMISSIONS.AppModulesPermission
              .MANAGE_STUDENT_TRANSACTION.name,
            UTILS.MODULES_PERMISSIONS.AppModulesPermission
              .MANAGE_STUDENT_TRANSACTION.CREATE_TRANSACTION,
          )}
          redirectToCreate={() => {
            router.push(
              `${APP_ROUTES.PRIVATE.CLIENT.MANAGE_STUDENTS.TRANSACTION.ADD_EDIT}?studentId=${existingStudent?.id}`,
            );
          }}>
          <Filter>
            <TransactionFilter onSubmit={onFilter} onReset={onReset} />
          </Filter>
        </HeaderPage>
        <CommonDataTable
          data={prepareData(
            Array.isArray(mappedTransactions) ? mappedTransactions : [],
          )}
          columns={tableColumns}
          totalPage={transactionHistory?.totalPages}
          currentPage={currentPage}
          onLazyLoad={paginationAction}
          lazy
          isLoading={isLoading}
        />
      </Box>
    </BoxContainer>
  );
};

export default TransactionInfo;
