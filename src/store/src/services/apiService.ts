import axios, { AxiosRequestConfig } from 'axios';
import { APIObjectType } from '_store/src/endpoints';
import { store } from '_store/store';
import { authLogoutRequestAction } from '_store/src/modules/common/auth/actions';
import { getMessage, handleApiError } from '_utils/handleApis';
import { isTokenExpired } from '_utils/expireToken.utils';
import { CreateOutsideToast } from '_components/toast/Toast';
import { ToastPosition, ToastStatus } from '_components/toast/model/toast';
import { loaderService } from '_store/src/services/loader';

export const apiCall = async (
  { url, method, responseType = 'json' }: APIObjectType,
  data?: any,
  token?: string,
  params?: any,
  showLoader = true,
) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
  const config: AxiosRequestConfig = {
    method,
    url,
    headers,
    data: method === 'GET' ? null : data,
    params: method === 'GET' ? params : null,
    responseType: responseType === 'json' ? 'json' : 'text',
  };

  try {
    if (token && isTokenExpired(token)) {
      store.dispatch(authLogoutRequestAction());
      CreateOutsideToast({
        description: getMessage(
          'COMMON.SESSION_EXPIRED',
          'Session expirée. Veuillez vous reconnecter.',
        ),
        title: getMessage('COMMON.WARNING', 'Attention'),
        position: ToastPosition.TOP_RIGHT,
        status: ToastStatus.WARN,
        duration: 2000,
      });
      return Promise.reject({ status: 401, message: 'Session expired' });
    }
    if (showLoader) {
      loaderService.showLoader();
    }

    const response = await axios(config);

    if (showLoader) {
      await new Promise(resolve => setTimeout(resolve, 3000));
      loaderService.hideLoader();
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      handleApiError(error.response);
      return Promise.reject(error.response);
    } else {
      handleApiError({
        status: 500,
        data: { message: "Erreur inconnue lors de l'appel API" },
      });
      return Promise.reject({
        status: 500,
        message: "Erreur inconnue lors de l'appel API",
      });
    }
  } finally {
    if (showLoader) {
      setTimeout(() => {
        loaderService.hideLoader();
      }, 2000);
    }
  }
};
