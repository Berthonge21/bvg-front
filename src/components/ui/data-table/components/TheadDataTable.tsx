import React, { memo } from 'react';
import { chakra, Box, Flex, Thead } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { TheadDataTableProps } from '../types/data-table.type';
import ClampLines from '_components/data-table/components/ClampLines';
import { OtherCheckbox } from '_components/checkbox/OtherCheckbox';
import { StyledTh, StyledTr } from '_theme/dataTableStyles';

const TheadDataTable = memo<TheadDataTableProps>(
  ({
    table,
    enableSort,
    t,
    selectedRows,
    lazy,
    setSelectedRows,
    lines = 2,
  }) => {
    return (
      <Thead boxShadow={'0px 10px 30px 0px rgba(110, 124, 124, 0.10)'}>
        {table?.getHeaderGroups()?.map((headerGroup: any, indexTh: number) => (
          <StyledTr className={'first-tr'} key={indexTh}>
            {headerGroup.headers.map((header: any, index: number) => {
              const meta: any = header.column.columnDef.meta;
              const translateLabel: string = t(
                header.column.columnDef.header + '',
              );
              const showIcon = lazy
                ? table.getRowModel().rows.length > 0 &&
                  Object.keys(selectedRows).length ===
                    table.getRowModel().rows.length
                : Object.keys(table.getRowModel().rowsById).length > 0 &&
                  Object.keys(selectedRows).length ===
                    Object.keys(table.getRowModel().rowsById).length;

              return (
                <StyledTh
                  minWidth={header.column.id != 'select' ? '116px' : '0px'}
                  key={index}
                  onClick={
                    enableSort
                      ? header.column.getToggleSortingHandler()
                      : () => {}
                  }
                  isNumeric={meta?.isNumeric}
                  className={`array-title ${header.column.id == 'select' ? 'th-select' : ''}`}>
                  {header.column.id != 'select' ? (
                    <Box>
                      <ClampLines text={t(translateLabel)} lines={lines} />
                      <chakra.span
                        pl={header.column.getIsSorted() ? '4' : 'unset'}>
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === 'desc' ? (
                            <TriangleDownIcon aria-label="sorted descending" />
                          ) : (
                            <TriangleUpIcon aria-label="sorted ascending" />
                          )
                        ) : null}
                      </chakra.span>
                    </Box>
                  ) : (
                    <Flex justifyContent={'start'}>
                      <OtherCheckbox
                        onChange={(e: any) => {
                          const checked = e.target.checked;
                          const newSelectedRows: any = {};
                          if (checked) {
                            if (lazy) {
                              table
                                .getRowModel()
                                .rows.forEach(
                                  ({ original }: any, eltIndex: number) => {
                                    newSelectedRows[eltIndex] = original;
                                  },
                                );
                            } else {
                              for (let [eltIndex, original] of Object.entries(
                                table.getRowModel().rowsById,
                              )) {
                                // @ts-ignore
                                newSelectedRows[eltIndex] = original?.original;
                              }
                            }
                          }
                          setSelectedRows(newSelectedRows);
                        }}
                      />
                    </Flex>
                  )}
                </StyledTh>
              );
            })}
          </StyledTr>
        ))}
      </Thead>
    );
  },
);
export default TheadDataTable;
