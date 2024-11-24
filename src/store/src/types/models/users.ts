export interface UserResponseDto {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  status?: string;
  phone?: string;
  address?: string;
  birthDate?: Date;
  roleType?: string;
  packId?: string;
  content?: any[];
  page?: number;
  pageSize?: number;
}

export interface IUserState {
  entityUser: UserResponseDto[];
  userStats: IUserPackStats[];
  schoolStats: any[];
  activeInactive: { activeUsers: number; inactiveUsers: number };
  isLoading: boolean;
  isCreateSuccess: boolean;
  isUpdateSuccess: boolean;
  isDeleteSuccess: boolean;
  isLoadingStats: boolean;
  isSchoolStatsLoading: boolean;
  isLoadingActiveInactive: boolean;
  errorStats: any;
  error: any;
}

export interface IUserPackStats {
  content: any[];
}

export interface IUserGetList {
  roleType: string;
  page?: number;
  pageSize?: number;
}
