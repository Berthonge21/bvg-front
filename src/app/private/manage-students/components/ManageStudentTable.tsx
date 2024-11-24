'use client';
import { Box, Flex, Text } from '@chakra-ui/react';
import CommonDataTable from '_components/data-table/components/CommonDataTable';
import usePermission from '_app/hooks/usePermission';
import { HeaderPage } from '_components/header-page/HeaderPage';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { TYPES } from '_store/src';
import { Filter } from '_components/filter/Filter';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '_app/config/routes';
import {
  StudentModule,
  AuthModule,
  ClassModule,
  SchoolModule,
  CollaboratorModule,
} from '_store/src/modules';
import CustomTooltip from '_components/CustomTooltip/CustomTooltip';
import { UTILS } from '_store/src';
import { DeleteInfoModal, InfoModal } from '_components/modal';
import Badge from '_components/badge/Badge';
import StudentFilter from '_private/manage-students/components/StudentFilter';
import { ColumnsDataTable } from '_components/data-table/types/data-table.type';
import BoxContainer from '_components/container/BoxContainer';
import Button from '_components/button/Button';
import { isEmpty } from 'lodash';

const ManageStudentTable = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { entityStudent, isLoading, addStudent, updateStudent, deleteStudent } =
    useSelector(StudentModule.selectors.studentSelector);
  const { currentUser } = useSelector(AuthModule.selectors.authSelector);
  const { entityCollaborator } = useSelector(
    CollaboratorModule.selectors.collaboratorManagementSelector,
  );
  const getDynamicSchoolId = useSelector(SchoolModule.selectors.getSchoolId);
  const { entityClass } = useSelector(
    ClassModule.selectors.classManagementSelector,
  );
  const { hasFeatureAccess } = usePermission();
  const router = useRouter();
  const [selectedStudent, setSelectedStudent] =
    useState<TYPES.MODELS.STUDENTS.IStudentResponse | null>();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [valuesFilter, setValuesFilter] =
    useState<TYPES.MODELS.STUDENTS.IFilterStudent>({});
  const [currentPage, setCurrentPage] = useState(
    TYPES.CONSTANTS.COMMON.INITIAL_PAGE,
  );
  const [openInfoModal, setOpenInfoModal] = useState(false);

  const getStudentData = (page: number) => {
    const requestData: TYPES.MODELS.STUDENTS.IStudent = {
      schoolId: getDynamicSchoolId,
      page,
      pageSize: TYPES.CONSTANTS.COMMON.PAGE_SIZE,
    };
    dispatch(StudentModule.actions.getAllStudentRequestAction(requestData));
  };

  const getClassData = () => {
    const requestData: TYPES.MODELS.CLASS_MANAGEMENT.IClassDto = {
      schoolId: getDynamicSchoolId,
      page: TYPES.CONSTANTS.COMMON.INITIAL_PAGE,
      pageSize: TYPES.CONSTANTS.COMMON.FULL_PAGE_SIZE,
    };
    dispatch(ClassModule.actions.getAllClassesRequestAction(requestData));
  };

  const paginationAction = (payload: number) => {
    const request: TYPES.MODELS.STUDENTS.IFilterStudent = {
      schoolId: getDynamicSchoolId,
      lastName: valuesFilter?.lastName,
      firstName: valuesFilter?.firstName,
      page: payload,
      pageSize: TYPES.CONSTANTS.COMMON.PAGE_SIZE,
    };
    dispatch(StudentModule.actions.getAllStudentRequestAction(request));
    setCurrentPage(payload);
  };

  const onFilter = (values: any) => {
    setValuesFilter(values);
    const request: TYPES.MODELS.STUDENTS.IFilterStudent = {
      schoolId: getDynamicSchoolId,
      lastName: values?.lastName,
      firstName: values?.firstName,
      paymentStatus: values?.paymentStatus,
    };
    dispatch(StudentModule.actions.getAllStudentRequestAction(request));
    setCurrentPage(TYPES.CONSTANTS.COMMON.INITIAL_PAGE);
  };

  const onReset = () => {
    setValuesFilter({
      schoolId: getDynamicSchoolId,
      lastName: '',
      firstName: '',
      paymentStatus: undefined,
    });
    getStudentData(currentPage);
    setCurrentPage(TYPES.CONSTANTS.COMMON.INITIAL_PAGE);
  };

  useEffect(() => {
    if (isEmpty(entityStudent)) {
      getStudentData(TYPES.CONSTANTS.COMMON.INITIAL_PAGE);
    }
    if (isEmpty(entityClass?.content)) {
      if (entityClass?.content?.length === 0) {
        getClassData();
        setOpenInfoModal(true);
      }
    }
    getClassData();
    if (deleteStudent) {
      dispatch(StudentModule.actions.clearDeleteStudentRequestAction());
      setOpenDeleteModal(false);
    }
  }, [addStudent, updateStudent, deleteStudent, entityStudent]);

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
    {
      header: 'Class',
      accessor: 'class',
      cell: (info: any) => {
        return info?.map((item: any) => item.name);
      },
    },
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
          handleClick: (data: any) => {
            setSelectedStudent(data);
            setOpenDeleteModal(true);
          },
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
    <BoxContainer title={'SIDE_BAR.MANAGE_STUDENTS'}>
      <HeaderPage
        withFilterIcon
        showRefreshIcon
        refreshCallback={() =>
          dispatch(StudentModule.actions.clearAllStudentRequestAction())
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
          <StudentFilter onSubmit={onFilter} onReset={onReset} />
        </Filter>
      </HeaderPage>
      <CommonDataTable
        data={prepareData(
          Array.isArray(entityStudent?.content) ? entityStudent?.content : [],
        )}
        columns={tableColumns}
        onLazyLoad={paginationAction}
        totalPage={entityStudent?.totalPages}
        currentPage={currentPage}
        isLoading={isLoading}
      />
      <DeleteInfoModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        callBackAction={() => {
          dispatch(
            StudentModule.actions.deleteStudentRequestAction(selectedStudent),
          );
        }}
        data={selectedStudent}
      />
      <InfoModal
        isOpen={openInfoModal}
        onClose={() => setOpenInfoModal(false)}
        callBackAction={() => {}}>
        <Flex
          direction={'column'}
          width={'100%'}
          height={'100%'}
          bgColor={'red.500'}>
          <Text>{t('MODAL_ACTION.INFO_MESSAGE')}</Text>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            mt={'20px'}>
            <Button
              variant={'secondary'}
              width={'50%'}
              animation={'pulse'}
              onClick={() =>
                router.push(APP_ROUTES.PRIVATE.CLIENT.MANAGE_CLASSES.ADD_EDIT)
              }>
              {t('COMMON.VALIDATE')}
            </Button>
          </Box>
        </Flex>
      </InfoModal>
    </BoxContainer>
  );
};

export default ManageStudentTable;
