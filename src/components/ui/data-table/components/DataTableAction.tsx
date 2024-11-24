import React, { memo } from 'react';
import { DataTableActionProps } from '../types/data-table.type';
import ActionButtons from './ActionButtons';
import { flexRender } from '@tanstack/react-table';
import { Flex, Box } from '@chakra-ui/react';
import { OtherCheckbox } from '_components/checkbox/OtherCheckbox';

const DataTableAction = memo<DataTableActionProps>(
  ({ cell, _actions, row, eltIndex, selectedRows, setSelectedRows }) => {
    return (
      <>
        <Box>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Box>
        {cell.id?.includes('select') && (
          <Flex justifyContent={'start'} className={'tableCheckbox'}>
            <OtherCheckbox
              key={eltIndex}
              isChecked={selectedRows[eltIndex] ?? false}
              isDisabled={cell.column.columnDef.disabled?.({
                ...row?.original,
                rowId: row?.id,
              })}
              onChange={() => {
                const newSelectedRows = { ...selectedRows };
                if (newSelectedRows[eltIndex]) {
                  delete newSelectedRows[eltIndex];
                } else {
                  newSelectedRows[eltIndex] = cell.row.original;
                }
                setSelectedRows(newSelectedRows);
              }}
            />
          </Flex>
        )}
        {cell.id?.includes('_action') && (
          <ActionButtons
            uniqueIdentifier={'uniqueIdentifier'}
            actions={_actions?.actions}
            data={{ ...row?.original, rowId: row?.id }}
          />
        )}
      </>
    );
  },
);
export default DataTableAction;
