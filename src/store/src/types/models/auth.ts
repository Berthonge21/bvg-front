export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  createdAt?: Date;
  address?: string;
  status?: Status;
  birthDate?: Date;
  roleType?: string;
  schools: any[];
  school?: any;
}

export interface AuthState {
  currentUser: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  confirmPassword: any;
  updatePassword: any;
  updatePasswordFailure: any;
  forgotPassword: any;
  error: any;
}
export type AuthPayload = {
  currentUser: User;
};
export type AuthErrorPayload = any;
export interface PasswordPayload {
  password: string;
}

export interface ForgotParams {
  email: string;
}

export interface ForgotPasswordPayload {
  params: ForgotParams;
}
