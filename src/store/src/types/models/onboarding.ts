export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  roleType: string;
  status: string;
}
export interface OnboardingState {
  currentUser: IUser | null;
  schoolInfo: ISchoolInfo | null;
  error: any;
  startOnboarding: boolean;
  stepOneSuccess: boolean;
  stepTwoSuccess: boolean;
  isSuccess: boolean;
  isLoading: boolean;
}

export type OnboardingSubmitPayload = {
  currentUser: IUser;
  schoolInfo: ISchoolInfo;
  packId?: string;
};

export interface ISchoolInfo {
  name: string;
  address: string;
  status: string;
  country: string;
  city: string;
}
