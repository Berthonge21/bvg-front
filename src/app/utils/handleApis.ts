import { CreateOutsideToast } from '_components/toast/Toast';
import { ToastPosition, ToastStatus } from '_components/toast/model/toast';
import { getI18n } from 'react-i18next';
import { AlertStatus } from '@chakra-ui/react';

export const getMessage = (key: any, fallback: string) => {
  return getI18n().t(key) || fallback;
};

export const handleApiError = (response: any) => {
  const statusCode = response?.status || 500;
  const defaultMessage = getMessage(
    'COMMON.ERROR_CONNEXION',
    'Connection Error',
  );

  let description = '';
  const title = getMessage('COMMON.NOTIFICATION', 'Notification');
  switch (statusCode) {
    case 401:
      description =
        response?.data?.message ||
        getMessage('COMMON.UNAUTHORIZED', 'Unauthorized');
      break;
    case 404:
      description =
        response?.data?.message || getMessage('COMMON.NOT_FOUND', 'Not Found');
      break;
    case 403:
      description = getMessage('COMMON.FORBIDDEN', 'Forbidden');
      break;
    case 500:
      description = getMessage('COMMON.SERVER_ERROR', 'Server Error');
      break;
    default:
      description = response?.data?.message || defaultMessage;
      break;
  }

  CreateOutsideToast({
    description,
    title,
    position: ToastPosition.TOP_RIGHT,
    status: ToastStatus.ERROR,
  });
};

export const handleApiSuccess = (response: any, toastType?: AlertStatus) => {
  const statusCode = response?.message || response?.status;
  const defaultMessage = getMessage(
    'COMMON.SUCCESS_OPERATION',
    'Operation successful',
  );

  let description = '';
  const title = getMessage('COMMON.NOTIFICATION', 'Notification');
  switch (statusCode) {
    case 200:
      description =
        response?.message || getMessage('COMMON.SUCCESS', 'Success');
      break;
    case 201:
      description =
        response?.message || getMessage('COMMON.CREATED', 'Created');
      break;
    case 204:
      description = getMessage('COMMON.NO_CONTENT', 'No content');
      break;
    default:
      description = response?.message || defaultMessage;
      break;
  }

  CreateOutsideToast({
    description,
    title,
    position: ToastPosition.TOP_RIGHT,
    status: toastType ?? ToastStatus.SUCCESS,
  });
};
