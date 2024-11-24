export interface ModuleDto {
  id?: string;
  name?: string;
  status?: string;
  features?: CreateFeatureDto[];
  permissions?: any[];
  packs?: any[];
  content?: any[];
  page?: number;
  pageSize?: number;
}

export interface CreateModuleDto {
  name: string;
  status?: string;
  features: CreateFeatureDto[];
}

export interface ModuleManagementState {
  entityModule: ModuleDto[];
  isLoading: boolean;
  isCreateSuccess: boolean;
  isUpdateSuccess: boolean;
  isDeleteSuccess: boolean;
  error: any;
}

export interface CreateFeatureDto {
  name: string;
  description?: string;
}
