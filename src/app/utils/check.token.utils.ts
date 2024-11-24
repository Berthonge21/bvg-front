import { STORAGE_CURRENT_USER } from '_store/src/modules/common/auth/constants';

export function getTokenOrThrow(): string {
  const token = localStorage.getItem(STORAGE_CURRENT_USER);
  if (!token) {
    throw new Error('No token provided');
  }
  return token;
}
