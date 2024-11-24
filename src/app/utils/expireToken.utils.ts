import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token: any) => {
  try {
    const { exp } = jwtDecode(token);
    if(exp && exp !== 0 ){
      return Date.now() >=  exp * 1000;
    }
  } catch (error) {
    return true;
  }
};
