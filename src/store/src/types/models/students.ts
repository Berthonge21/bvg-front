export type IStudent = {
  schoolName?: string;
  schoolId?: string;
  userId?: string;
  classId?: string;
  totalDataPerPage?: number;
  page: number;
  pageSize: number;
  content?: any[];
};

export interface IFilterStudent {
  lastName?: string;
  firstName?: string;
  paymentStatus?: PaymentStatus;
  schoolId?: string;
  classId?: string;
  page?: number;
  pageSize?: number;
}

export interface ICreateStudent {
  id?: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  birthPlace?: string;
  sex?: string;
  studentAddress?: string;
  parentFirstName?: string;
  parentLastName?: string;
  parentPhone1?: string;
  parentPhone2?: string;
  parentEmail?: string;
  schoolId?: string;
  classId?: string;
  tuitionPayments?: [
    {
      expectAmount: number;
      restAmount: number;
      receivedAmount?: number;
      paymentDate?: string;
      paymentType?: paymentType;
      paymentStatus?: PaymentStatus;
      userId?: string;
    },
  ];
}

export interface IStudentResponse {
  student?: ICreateStudent[];
}

export interface ITransactionDto {
  id?: string;
  studentId?: string;
  paymentDate?: string;
  paymentType?: paymentType;
  paymentStatus?: PaymentStatus;
  expectAmount?: number;
  receivedAmount?: number;
  restAmount?: number;
  description?: string;
  months?: string;
  userId?: string;
  page?: number;
  pageSize?: number;
}

export interface ITransactionHistory {
  content?: ITransactionDto[];
  page?: number;
  pageSize?: number;
  studentId?: string;
  createTransaction?: boolean;
  updateTransaction?: boolean;
}

export interface IStudentState {
  entityStudent?: IStudent[];
  transactionHistory?: ITransactionHistory;
  isLoading?: boolean;
  addStudent?: boolean;
  updateStudent?: boolean;
  deleteStudent?: boolean;
  error?: any;
}

export type paymentType =
  | 'PAID'
  | 'NO_PAID'
  | 'INSTALLMENT_PAID'
  | 'INSCRIPTION_FEES';

export type PaymentStatus = 'PAID' | 'NO_PAID' | 'INSTALLMENT_PAID';
