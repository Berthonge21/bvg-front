export interface ICollaboratorDto {
  userId?: string;
  employeeInfo: EmployeeInfo;
  contractInfo?: Contract;
  content?: any[];
  page?: number;
  pageSize?: number;
}

export interface ICollaboratorState {
  entityCollaborator: EmployeeInfo[];
  isLoading: boolean;
  addCollaborator: boolean;
  error: any;
}

export interface EmployeeInfo {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  schoolId?: string;
  cinNumber?: string;
  salary?: number;
  sex?: string;
  cinType?: string;
  staffPost?: string;
  phone?: string;
  phone2?: string;
  address?: string;
  password?: string;
  features?: PermissionDto[];
  content?: any[];
  matricule?: string;
}

export interface Contract {
  id?: string;
  startDate?: string;
  endDate?: string;
  employeeId?: string;
  schoolId?: string;
  createdAt?: string;
  contractDuration?: number;
  contractType?: ContractType;
  periodicity?: ContractPeriodicity;
}

export interface PermissionDto {
  moduleName: string;
  featureName: string;
}

export type ContractType = 'CDD' | 'CDI' | 'INTERIM' | 'STAGE';
export type ContractPeriodicity =
  | 'MONTHLY'
  | 'QUARTERLY'
  | 'SEMIANNUAL'
  | 'ANNUAL';
