'use client';

import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import CommonDataTable from '_components/data-table/components/CommonDataTable';
import { ColumnsDataTable } from '_components/data-table/types/data-table.type';
import Button from '_components/button/Button';
import { useTranslation } from 'react-i18next';
import { HeaderPage } from '_components/header-page/HeaderPage';
import { APP_ROUTES } from '_app/config/routes';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { PacksModule } from '_store/src/modules';
import { TYPES } from '_store/src';
import {
  ActivateInfoModal,
  DeleteInfoModal,
  DetailInfoModal,
} from '_components/modal';
import RenderDetailInfo from '../components/RenderDetailInfo';

const ListPacks = () => {
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    entityPacks,
    isLoading,
    addPackSuccess,
    updatePackSuccess,
    deletePackSuccess,
  } = useSelector(PacksModule.selectors.packsSelector);
  const navigate = useRouter();
  const [selectedData, setSelectedData] = useState<any>({});
  const [openActivateModal, setOpenActivateModal] = useState<any>(false);
  const [openDetailModal, setOpenDetailModal] = useState<any>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<any>(false);

  const onActivateOrDeactivate = (data: any) => {
    const request: TYPES.MODELS.PACKS.IPacks = {
      id: data?.id,
      ...data,
      status: data?.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
    };

    dispatch(PacksModule.actions.updatePackRequestAction(request));
    setOpenActivateModal(false);
  };
  const onDeleteModule = (data: any) => {
    const request: TYPES.MODELS.PACKS.IPacks = {
      id: data?.id,
    };
    dispatch(PacksModule.actions.deletePackRequestAction(request));
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    dispatch(PacksModule.actions.getAllPackRequestAction());
    if (addPackSuccess || updatePackSuccess || deletePackSuccess) {
      dispatch(PacksModule.actions.clearCreatePack());
      dispatch(PacksModule.actions.clearUpdatePack());
      dispatch(PacksModule.actions.clearDeletePack());
      dispatch(PacksModule.actions.clearPacksList());
    }
  }, [addPackSuccess, updatePackSuccess, deletePackSuccess]);

  const tableColumns: ColumnsDataTable[] = [
    {
      header: 'select',
      accessor: 'select',
    },
    {
      header: 'Name',
      accessor: 'name',
      cell: (value: string) => value,
    },
    {
      header: 'Price',
      accessor: 'price',
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
          name: 'edit',
          handleClick: (data: any) => {
            navigate.push(
              `${APP_ROUTES.PRIVATE.BACK_OFFICE.OFFERS_ADD_EDIT}?requestId=${data.id}`,
            );
          },
          isShown: true,
        },
        {
          name: 'view',
          handleClick: (data: any) => {
            setOpenDetailModal(true);
            setSelectedData(data);
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

  const handleRowSelection = (selectedRows: any) => {
    setSelectedRows(selectedRows);
  };

  return (
    <Box position={'relative'} mt={'50px'}>
      <Text fontSize="18px" fontWeight="bold">
        {t('OFFERS.LIST')}
      </Text>
      <Box
        padding="5"
        borderWidth="1px"
        borderRadius="lg"
        mt={'30px'}
        borderColor="gray.200">
        <HeaderPage
          redirectToCreate={() =>
            navigate.push(APP_ROUTES.PRIVATE.BACK_OFFICE.OFFERS_ADD_EDIT)
          }
          hasPermissionToCreate
        />
        <CommonDataTable
          data={entityPacks?.content}
          columns={tableColumns}
          isLoading={isLoading}
          handleRowSelection={handleRowSelection}
          hidePagination
        />
        <ActivateInfoModal
          data={selectedData}
          isOpen={!!openActivateModal}
          onClose={() => setOpenActivateModal(null)}
          callBackAction={onActivateOrDeactivate}
        />
        <DetailInfoModal
          isOpen={!!openDetailModal}
          onClose={() => setOpenDetailModal(null)}
          data={selectedData}>
          <RenderDetailInfo data={selectedData} />
        </DetailInfoModal>
        <DeleteInfoModal
          data={selectedData}
          isOpen={!!openDeleteModal}
          onClose={() => setOpenDeleteModal(null)}
          callBackAction={onDeleteModule}
        />
      </Box>
    </Box>
  );
};

export default ListPacks;
