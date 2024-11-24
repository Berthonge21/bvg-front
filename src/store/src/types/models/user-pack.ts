export interface IUserPackDto {
  packId?: string;
  content?: any[];
}

export interface IUserPackState {
  entityUserPack: IUserPackDto[];
  isLoading: boolean;
  isRenewSuccess: boolean;
  isPaySuccess: boolean;
  error: any;
}
