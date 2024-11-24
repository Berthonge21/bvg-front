const CreateFeatureValues = {
  name: '',
  description: '',
};

export const initialModuleValues = {
  name: '',
  status: '',
  features: [CreateFeatureValues],
};

export interface IModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  callBackAction?: (data: any) => void;
  data: any;
}
