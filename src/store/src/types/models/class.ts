export interface IClassDto {
  id?: string;
  name?: string;
  grade?: string;
  classAmount?: number;
  schoolId?: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  page?: number;
  pageSize?: number;
}

export interface IFilterStudent extends IClassDto {
  studentFilter: {
    firstName?: string;
    lastName?: string;
    sex?: string;
    parentPhone1?: string;
    paymentStatus?: string;
  };
}

export interface IClassResponseDto {
  content?: any[];
}

export interface IClassState {
  entityClass: IClassResponseDto[];
  isLoading: boolean;
  isCreateSuccess: boolean;
  isUpdateSuccess: boolean;
  isDeleteSuccess: boolean;
  error: any;
}
