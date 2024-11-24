import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { TYPES } from '_store/src';
import { ModuleManagement } from '_store/src/modules';
import { ColumnsDataTable } from '_components/data-table/types/data-table.type';
import Button from '_components/button/Button';
import { APP_ROUTES } from '_app/config/routes';
import { Box, Text } from '@chakra-ui/react';
import { HeaderPage } from '_components/header-page/HeaderPage';
import { Filter } from '_components/filter/Filter';
import ManageModuleFilter from '../../manage-modules/components/ManageModuleFilter';
import CommonDataTable from '_components/data-table/components/CommonDataTable';
import {
  ActivateInfoModal,
  DeleteInfoModal,
  DetailInfoModal,
} from '_components/modal';
import RenderModuleDetailInfo from '_private/back-office/manage-modules/components/RenderModuleDetailInfo';
import BoxContainer from '_components/container/BoxContainer';

const ModuleManagementListTable = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [openActivateModal, setOpenActivateModal] = useState<any>(false);
  const [openDetailModal, setOpenDetailModal] = useState<any>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<any>(false);
  // const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(
    TYPES.CONSTANTS.COMMON.INITIAL_PAGE,
  );
  const [valuesFilter, setValuesFilter] =
    useState<TYPES.MODELS.MODULE_MANAGEMENT.ModuleDto>({});

  const {
    isLoading,
    isUpdateSuccess,
    isDeleteSuccess,
    isCreateSuccess,
    entityModule,
  } = useSelector(ModuleManagement.selectors.moduleManagementSelector);

  const getModuleList = (page: number) => {
    const requestData: TYPES.MODELS.MODULE_MANAGEMENT.ModuleDto = {
      page,
      pageSize: TYPES.CONSTANTS.COMMON.PAGE_SIZE,
    };
    dispatch(
      ModuleManagement.actions.moduleManagementFindAllRequestAction(
        requestData,
      ),
    );
  };

  useEffect(() => {
    getModuleList(currentPage);
    if (isUpdateSuccess || isDeleteSuccess || isCreateSuccess) {
      dispatch(ModuleManagement.actions.moduleManagementClearUpdateModule());
      dispatch(ModuleManagement.actions.moduleManagementClearDeleteModule());
      dispatch(ModuleManagement.actions.moduleManagementClearCreateModule());
      dispatch(ModuleManagement.actions.moduleManagementClearList());
    }
  }, [isDeleteSuccess, isUpdateSuccess, isCreateSuccess]);

  const onActivateOrDeactivate = (data: any) => {
    const request: TYPES.MODELS.MODULE_MANAGEMENT.ModuleDto = {
      id: data?.id,
      ...data,
      status: data?.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
    };

    dispatch(
      ModuleManagement.actions.moduleManagementUpdateRequestAction(request),
    );
    setOpenActivateModal(false);
  };

  const onDeleteModule = (data: any) => {
    const request: TYPES.MODELS.MODULE_MANAGEMENT.ModuleDto = {
      id: data?.id,
      ...data,
    };
    dispatch(
      ModuleManagement.actions.moduleManagementDeleteRequestAction(request),
    );
    setOpenDeleteModal(false);
  };

  const tableColumns: ColumnsDataTable[] = [
    // { header: 'select', accessor: 'select' },
    { header: 'Name', accessor: 'name', cell: (value: string) => value },
    {
      header: 'Status',
      accessor: 'status',
      cell: (input: string) => (
        <Button width="100%" color={'white'} status={input}>
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
          name: 'edit',
          handleClick: (data: any) =>
            navigate.push(
              `${APP_ROUTES.PRIVATE.BACK_OFFICE.MODULES_ADD_EDIT}?requestId=${data.id}`,
            ),
          isShown: true,
        },
        {
          name: 'view',
          handleClick: (data: any) => {
            setSelectedData(data);
            setOpenDetailModal(true);
          },
          isShown: true,
        },
        {
          name: (data: any) =>
            data.status === 'ACTIVE' ? 'deactivate' : 'activate',
          handleClick: (data: any) => {
            setSelectedData(data);
            setOpenActivateModal(true);
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

  // const handleRowSelection = (selectedRows: any) => {
  //   setSelectedRows(selectedRows);
  // };

  const onFilter = (values: any) => {
    setValuesFilter(values);
    const request: TYPES.MODELS.MODULE_MANAGEMENT.ModuleDto = {
      name: values?.name,
      status: values?.status,
      page: TYPES.CONSTANTS.COMMON.INITIAL_PAGE,
      pageSize: TYPES.CONSTANTS.COMMON.PAGE_SIZE,
    };
    dispatch(
      ModuleManagement.actions.moduleManagementFindAllRequestAction(request),
    );
    setCurrentPage(TYPES.CONSTANTS.COMMON.INITIAL_PAGE);
  };

  const onResetFilter = () => {
    setValuesFilter({});
    setCurrentPage(TYPES.CONSTANTS.COMMON.INITIAL_PAGE);
    getModuleList(TYPES.CONSTANTS.COMMON.INITIAL_PAGE);
  };

  const paginationAction = (payload: number) => {
    const request: TYPES.MODELS.MODULE_MANAGEMENT.ModuleDto = {
      name: valuesFilter?.name,
      status: valuesFilter?.status,
      page: payload,
      pageSize: TYPES.CONSTANTS.COMMON.PAGE_SIZE,
    };
    dispatch(
      ModuleManagement.actions.moduleManagementFindAllRequestAction(request),
    );
    setCurrentPage(payload);
  };

  return (
    <BoxContainer title={'SIDE_BAR.MANAGE_MODULE'}>
      <HeaderPage
        redirectToCreate={() =>
          navigate.push(APP_ROUTES.PRIVATE.BACK_OFFICE.MODULES_ADD_EDIT)
        }
        withFilterIcon
        hasPermissionToCreate>
        <Filter>
          <ManageModuleFilter
            onSubmit={onFilter}
            onReset={onResetFilter}
            isLoading={isLoading}
          />
        </Filter>
      </HeaderPage>

      <CommonDataTable
        data={entityModule?.content}
        columns={tableColumns}
        totalPage={entityModule?.totalPages}
        currentPage={currentPage}
        isLoading={isLoading}
        onLazyLoad={paginationAction}
        lazy
      />
      <ActivateInfoModal
        data={selectedData}
        isOpen={!!openActivateModal}
        onClose={() => setOpenActivateModal(null)}
        callBackAction={onActivateOrDeactivate}
      />
      <DetailInfoModal
        data={selectedData}
        isOpen={!!openDetailModal}
        onClose={() => setOpenDetailModal(null)}>
        <RenderModuleDetailInfo data={selectedData} />
      </DetailInfoModal>
      <DeleteInfoModal
        data={selectedData}
        isOpen={!!openDeleteModal}
        onClose={() => setOpenDeleteModal(null)}
        callBackAction={onDeleteModule}
      />
    </BoxContainer>
  );
};

export default ModuleManagementListTable;
