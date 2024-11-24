import { ColumnDef } from '@tanstack/react-table';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

export type ActionsType = {
  name: string | ((data: any) => string);
  titleIcon?: string;
  handleClick: (data: any) => void;
  isDisabled?: (data: any) => boolean;
  isShown?: boolean | ((data: any) => boolean);
  isChecked?: (data: any) => boolean;
};

export interface ColumnsDataTable {
  header: string; // Name of column to be show in list
  accessor: string | 'fullObject'; // Value of column to be bind of list: value(amount, date) or full for get all rows (object)
  cell?: (x?: any) => EmotionJSX.Element | string | Date | undefined; // For custom show column (add tooltip, add concat...)
  actions?: ActionsType[]; // For multiple actions
  disabled?: (data?: any) => boolean;
}

/**
 * data: List of data (required)
 * columns: list of columns (required)
 * title: title of DataTable (optional)
 * minH: minimum of height (optional)
 * enableSort: enable sort (optional)
 * removePagination: for remove pagination (optional)
 * lazy: For call WebService or get all data (optional)
 * onLazyLoad: callback lazy loading
 * totalPage: total page with lazy loading (optional)
 * pageIndex: index page (default 0) (optional)
 * pageSize : page size (default 5) (optional)
 * isLoading: for show loader (optional)
 * trWithBorderLeft For add left border color
 * statusSelector: name of column for color
 * exportCallback: for export callback
 * handleRowSelection: to save List of selectedRows to can use it in ExportList
 * theadNbeLine: number of line for thead before elipse css
 */
export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
  title?: string;
  minH?: string;
  hasBorder?: boolean;
  enableSort?: boolean;
  hidePagination?: boolean;
  lazy?: boolean;
  totalPage?: number;
  onLazyLoad?: (index: number) => void;
  currentPage?: number;
  pageIndex?: number;
  pageSize?: number;
  isLoading?: boolean;
  trWithBorderLeft?: boolean;
  legendList?: any;
  statusSelector?: string;
  exportCallback?: (data: string) => void;
  handleRowSelection?: (data: any) => void;
  theadNbeLines?: number;
};

export type DataTableActionProps = {
  cell: any;
  _actions: any;
  row: any;
  eltIndex: any;
  selectedRows: any;
  setSelectedRows: any;
};

export type TheadDataTableProps = {
  table: any;
  enableSort: boolean;
  t: any;
  selectedRows: ISelectedRows;
  lazy: boolean;
  setSelectedRows: (data: any) => void;
  lines?: number;
};

export type TbodyDataTableProps = {
  table: any;
  minH: any;
  _actions: any;
  selectedRows: any;
  setSelectedRows: any;
  trWithBorderLeft?: boolean;
  legendList?: any;
  statusSelector?: string;
  lines?: number;
};

export interface PaginationProps {
  table: any;
  totalPage?: number;
  pageSize: number;
  currentPage?: number; // Used with lazy
  lazy: boolean;
  onLazyLoad?: (index: number) => void;
}

export interface ISelectedRows {
  status?: boolean;
  data?: any;
}
