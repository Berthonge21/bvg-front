import { store } from '_store/store';
import { ILoaderService } from '_store/src/main/types';
import { BVGCommonModule } from '_store/src/modules';

class LoaderService implements ILoaderService {
  private isLoaderVisible = false;
  showLoader() {
    if (!this.isLoaderVisible) {
      this.isLoaderVisible = true;
      store.dispatch(BVGCommonModule.actions.showLoaderAction());
    }
  }
  hideLoader() {
    if (this.isLoaderVisible) {
      this.isLoaderVisible = false;
      store.dispatch(BVGCommonModule.actions.hideLoaderAction());
    }
  }
}

export const loaderService = new LoaderService();
