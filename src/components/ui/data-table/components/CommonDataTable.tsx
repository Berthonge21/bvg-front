import React, { memo, useState } from 'react';
import {
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { VStack, Center, Box, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import CustomSkeleton from '../../custom-skeleton';
import {
  ActionsType,
  DataTableProps,
  ISelectedRows,
} from '../types/data-table.type';
import TheadDataTable from './TheadDataTable';
import TbodyDataTable from './TbodyDataTable';
import PaginationDataTable from './PaginationDataTable';
import ExportButton from '_components/export-button/ExportButton';
import { hexToRGB } from '_theme/colors';
import NoDataFound from '_components/no-data-found/NoDataFound';
import { scrollbarStyle, StyledTable } from '_theme/dataTableStyles';

const CommonDataTable = memo<DataTableProps<any>>(
  ({
    data,
    columns,
    title,
    minH,
    hasBorder = false,
    enableSort = false,
    hidePagination = false,
    lazy = false,
    pageIndex = 0,
    pageSize = 5,
    handleRowSelection,
    theadNbeLines,
    ...rest
  }) => {
    if (rest.isLoading) {
      return (
        <Center minH="30rem">
          <CustomSkeleton type={'table'} tableRows={5} />
        </Center>
      );
    }

    // When logout
    if (data === undefined) {
      return null;
    }

    const { t } = useTranslation();
    const [selectedRows, setSelectedRows] = React.useState<ISelectedRows>({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const columnHelper: any = createColumnHelper<typeof data>();
    const _actions: any = columns?.filter(
      (_col: any) => _col?.actions?.length,
    )[0];
    const displayedColumns =
      _actions &&
      _actions?.actions?.filter((act: ActionsType) => act?.isShown)?.length ===
        0
        ? columns?.filter(col => col?.header !== 'Actions')
        : columns;
    const _columns: any = displayedColumns?.map((column: any) => {
      const accessor = column?.accessor;
      return columnHelper.accessor(accessor, {
        cell: (info: any) => {
          if (accessor === 'fullObject') {
            if (
              typeof column?.cell(info?.row?.original) === 'string' ||
              typeof column?.cell(info?.row?.original) === 'object'
            ) {
              return column?.cell(info?.row?.original);
            }
            throw new Error(
              'Check your output format in cell column, it should be a string or object',
            );
          }
          return typeof column?.cell === 'function'
            ? column?.cell(info.getValue())
            : info.getValue(); // For only header/accessor
        },
        header: column?.header,
        size: column?.size, // Set size column
        disabled: column?.disabled, // Disabled column
      });
    });

    React.useEffect(() => {
      handleRowSelection?.(Object.values(selectedRows));
    }, [selectedRows]);

    const table: any = useReactTable({
      columns: _columns,
      data,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      initialState: {
        pagination: {
          pageIndex,
          pageSize,
        },
      },
      state: {
        sorting,
      },
    });

    if (!rest.isLoading && !table?.getRowModel()?.rows?.length) {
      return <NoDataFound />;
    }
    return (
      <Box w="100%">
        <VStack alignItems="start" w="100%">
          {title && (
            <Text
              fontWeight="bold"
              fontSize="17px"
              textAlign="left"
              mb="1rem"
              mt="2rem">
              {title}
            </Text>
          )}
          <Box
            w="100%"
            minH={minH ?? '100%'}
            display="flex"
            flexDir="column"
            justifyContent="space-between"
            {...(hasBorder && {
              borderRadius: 8,
              border: '2px',
              borderColor: 'gray.200',
              padding: 3,
              ...rest,
            })}
            overflow="auto"
            sx={scrollbarStyle}>
            <StyledTable
              variant="simple"
              colorScheme={hexToRGB('lightGray', 0.1, 500)}
              maxWidth={'100%'}>
              <TheadDataTable
                table={table}
                enableSort={enableSort}
                t={t}
                selectedRows={selectedRows}
                lazy={lazy}
                setSelectedRows={setSelectedRows}
                lines={theadNbeLines}
              />
              <TbodyDataTable
                table={table}
                minH={minH}
                _actions={_actions}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                legendList={rest.legendList}
                trWithBorderLeft={rest.trWithBorderLeft}
                statusSelector={rest.statusSelector}
              />
            </StyledTable>

            {!hidePagination && (
              <PaginationDataTable
                table={table}
                totalPage={rest.totalPage}
                pageSize={pageSize}
                currentPage={rest.currentPage}
                lazy={lazy}
                onLazyLoad={rest.onLazyLoad}
              />
            )}
          </Box>
        </VStack>
        {rest.exportCallback && (
          <ExportButton exportCallback={rest.exportCallback} />
        )}
      </Box>
    );
  },
);
export default CommonDataTable;
