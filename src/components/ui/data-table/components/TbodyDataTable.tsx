import React, { FC, memo } from 'react';
import DataTableAction from './DataTableAction';
import { Tbody } from '@chakra-ui/react';
import { TbodyDataTableProps } from '../types/data-table.type';
import { useDataTable } from '../hooks/useDataTable';
import { StyledTd, StyledTr } from '_theme/dataTableStyles';

const TbodyDataTable: FC<TbodyDataTableProps> = ({
  table,
  minH,
  _actions,
  selectedRows,
  setSelectedRows,
  legendList,
  statusSelector,
  ...rest
}) => {
  const { getBorderColor } = useDataTable();
  return (
    <Tbody minH={minH ?? '35rem'}>
      {table?.getRowModel()?.rows?.map((row: any, eltIndex: number) => {
        return (
          <StyledTr key={eltIndex}>
            {row?.getVisibleCells()?.map((cell: any, index: number) => {
              const meta: any = cell.column.columnDef.meta;
              return (
                <StyledTd
                  className="customTable"
                  key={index}
                  isNumeric={meta?.isNumeric}
                  style={
                    cell.id?.includes('_action')
                      ? {
                          maxWidth: 'unset',
                          minWidth: 80,
                          width: 80,
                        }
                      : {
                          width:
                            cell?.column?.getSize() !== 150
                              ? cell?.column?.getSize()
                              : 100,
                          overflow: 'hidden',
                        }
                  }
                  _before={
                    rest.trWithBorderLeft && index === 0
                      ? {
                          top: '30px',
                          content: '""',
                          position: 'absolute',
                          left: '2.4px',
                          height: '11px',
                          width: '4px',
                          background: `${getBorderColor(
                            statusSelector
                              ? row?.original[statusSelector]
                              : row?.original.status,
                            legendList,
                          )}`,
                          transform: 'translate(-50%, -13%)',
                          borderRadius: '7px',
                          boxShadow: `0px 3px 6px 0px ${getBorderColor(
                            statusSelector
                              ? row?.original[statusSelector]
                              : row?.original.status,
                            legendList,
                          )}`,
                        }
                      : {
                          content: '""',
                        }
                  }>
                  <DataTableAction
                    cell={cell}
                    _actions={_actions}
                    row={row}
                    eltIndex={eltIndex}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                  />
                </StyledTd>
              );
            })}
          </StyledTr>
        );
      })}
    </Tbody>
  );
};
export default TbodyDataTable;
