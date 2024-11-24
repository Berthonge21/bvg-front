import { IStateModule } from '_store/src/main/types';
import * as Constant from './constants';
import BVGCommonReducer from './reducer';

export class BVGCommonModule implements IStateModule {
  getRootKeyInStore(): string {
    return Constant.BVG_COMMON_KEY_IN_STORE;
  }
  getReducers() {
    return BVGCommonReducer;
  }
}

export const bvgCommonModuleInstance = new BVGCommonModule();
