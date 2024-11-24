import { ReactNode } from 'react';

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  callBackAction?: (data: any) => void;
  data?: any;
  children?: ReactNode;
}
