export interface IStateModule {
  getReducers(): any;
  getSagas(): any;
  getRootKeyInStore(): string;
}

export interface ILoaderService {
  showLoader(): any;
  hideLoader(): any;
}
