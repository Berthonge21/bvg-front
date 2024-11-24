export interface IPacks {
  id?: string;
  name?: string;
  price?: number;
  status?: string;
  moduleIds?: any[];
  schools?: any[];
  users?: any[];
  payments?: any[];
  content?: any[];
  page?: number;
  pageSize?: number;
}

export interface PacksState {
  entityPacks: IPacks[];
  isLoadingPacks: boolean;
  addPackSuccess: boolean;
  updatePackSuccess: boolean;
  deletePackSuccess: boolean;
  error: any;
}
