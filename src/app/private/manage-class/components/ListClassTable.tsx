'use client';

import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { ColumnsDataTable } from '_components/data-table/types/data-table.type';
import { Box, Text } from '@chakra-ui/react';
import { HeaderPage } from '_components/header-page/HeaderPage';
import { APP_ROUTES } from '_app/config/routes';
import { Filter } from '_components/filter/Filter';
import CommonDataTable from '_components/data-table/components/CommonDataTable';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ClassModule,
  AuthModule,
  CollaboratorModule,
  SchoolModule,
} from '_store/src/modules';
import { TYPES, UTILS } from '_store/src';
import ClassFilter from '_private/manage-class/components/ClassFilter';
import { DeleteInfoModal } from '_components/modal';
import CustomTooltip from '_components/CustomTooltip/CustomTooltip';
import { isEmpty } from 'lodash';

const ListClassTable = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const getDynamicSchoolId = useSelector(SchoolModule.selectors.getSchoolId);
  const { currentUser } = useSelector(AuthModule.selectors.authSelector);
  const { entityCollaborator } = useSelector(
    CollaboratorModule.selectors.collaboratorManagementSelector,
  );
  const [valuesFilter, setValuesFilter] =
    useState<TYPES.MODELS.CLASS_MANAGEMENT.IClassDto>({});
  const [openDeleteModal, setOpenDeleteModal] = useState<any>(false);
  const [selectedData, setSelectedData] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(
    TYPES.CONSTANTS.COMMON.INITIAL_PAGE,
  );
  const { entityClass, isLoading, isDeleteSuccess } = useSelector(
    ClassModule.selectors.classManagementSelector,
  );

  const getClassData = (page: number) => {
    const request: TYPES.MODELS.CLASS_MANAGEMENT.IClassDto = {
      schoolId: getDynamicSchoolId,
      page,
      pageSize: TYPES.CONSTANTS.COMMON.PAGE_SIZE,
    };
    dispatch(ClassModule.actions.getAllClassesRequestAction(request));
  };

  const paginationAction = (payload: number) => {
    const request: TYPES.MODELS.CLASS_MANAGEMENT.IClassDto = {
      schoolId: getDynamicSchoolId,
      name: valuesFilter?.name,
      grade: valuesFilter?.grade,
      classAmount: valuesFilter?.classAmount,
      page: payload,
      pageSize: TYPES.CONSTANTS.COMMON.PAGE_SIZE,
    };
    dispatch(ClassModule.actions.getAllClassesRequestAction(request));
    setCurrentPage(payload);
  };
  const onFilter = (values: any) => {
    setValuesFilter(values);
    const request: TYPES.MODELS.CLASS_MANAGEMENT.IClassDto = {
      schoolId: getDynamicSchoolId,
      name: values.name,
      grade: values.grade,
      classAmount: parseFloat(values.amount),
    };
    dispatch(ClassModule.actions.getAllClassesRequestAction(request));
    setCurrentPage(TYPES.CONSTANTS.COMMON.INITIAL_PAGE);
  };

  const onReset = () => {
    setValuesFilter({});
    getClassData(currentPage);
    setCurrentPage(TYPES.CONSTANTS.COMMON.INITIAL_PAGE);
  };

  useEffect(() => {
    if (isEmpty(entityClass)) {
      getClassData(currentPage);
    }
    if (isDeleteSuccess) {
      dispatch(ClassModule.actions.clearAllActions());
      dispatch(ClassModule.actions.clearClassesList());
    }
  }, [isDeleteSuccess, entityClass]);

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

  const tableColumns: ColumnsDataTable[] = [
    { header: 'select', accessor: 'select' },
    { header: 'Class Name', accessor: 'name' },
    { header: 'Grade', accessor: 'grade' },
    { header: 'Class Amount', accessor: 'classAmount' },
    {
      header: 'Number of Student',
      accessor: 'students',
      cell: (value: any) => value?.length ?? 0,
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
              `${APP_ROUTES.PRIVATE.CLIENT.MANAGE_CLASSES.ADD_EDIT}?requestId=${data.id}`,
            );
          },
          isShown: true,
        },
        {
          name: 'view',
          handleClick: (data: any) => {
            router.push(
              `${APP_ROUTES.PRIVATE.CLIENT.MANAGE_CLASSES.DETAIL}?requestId=${data.id}`,
            );
          },
          isShown: true,
        },
        {
          name: 'delete',
          handleClick: (data: any) => {
            setSelectedData(data);
            setOpenDeleteModal(true);
          },
          isShown: true,
        },
      ],
    },
  ];

  return (
    <Box position={'relative'} mt={'50px'}>
      <Text fontSize="18px" fontWeight="bold">
        {t('SIDE_BAR.MANAGE_CLASSES')}
      </Text>
      <HeaderPage
        withFilterIcon
        showRefreshIcon
        refreshCallback={() => dispatch(ClassModule.actions.clearClassesList())}
        redirectToCreate={() =>
          router.push(APP_ROUTES.PRIVATE.CLIENT.MANAGE_CLASSES.ADD_EDIT)
        }>
        <Filter>
          <ClassFilter
            onSubmit={onFilter}
            onReset={onReset}
            isLoading={isLoading}
          />
        </Filter>
      </HeaderPage>
      <CommonDataTable
        data={prepareData(entityClass?.content)}
        columns={tableColumns}
        isLoading={isLoading}
        totalPage={entityClass?.totalPages}
        currentPage={currentPage}
        onLazyLoad={paginationAction}
        lazy
      />
      <DeleteInfoModal
        data={selectedData}
        isOpen={!!openDeleteModal}
        onClose={() => setOpenDeleteModal(null)}
        callBackAction={() => {
          dispatch(ClassModule.actions.deleteClassRequestAction(selectedData));
          setOpenDeleteModal(false);
        }}
      />
    </Box>
  );
};

export default ListClassTable;
