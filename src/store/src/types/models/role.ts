export interface IRoleDto {
  id?: string;
  name?: string;
  schoolId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  content?: any[];
  page?: number;
  pageSize?: number;
}

export interface IRoleState {
  entityRole: IRoleDto[];
  isLoading: boolean;
  createRole: boolean;
  updateRole: boolean;
  deleteRole: boolean;
  error: any;
}
