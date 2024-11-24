import {
  UseToastOptions,
  createStandaloneToast,
  ToastId,
} from '@chakra-ui/react';
import { ToastPosition, ToastStatus } from '_components/toast/model/toast';
import i18n from 'i18next';

const DEFAULT_TOAST_DURATION = 3000;
const defaultOptions = {
  position: ToastPosition.TOP,
  status: ToastStatus.ERROR,
  duration: DEFAULT_TOAST_DURATION,
  isClosable: true,
} as const;

let currentToast: ToastId | undefined;

export const CreateOutsideToast = ({
  description,
  title,
  status = ToastStatus.ERROR,
  ...options
}: UseToastOptions & { description: string }) => {
  const { toast } = createStandaloneToast();
  if (currentToast) {
    toast.close(currentToast);
  }

  const translatedDescription: string = i18n.t(description, {
    defaultValue: description,
  }) as string;

  // @ts-ignore
  const translatedTitle: string = i18n.t(title, {
    defaultValue: title,
  }) as string;

  currentToast = toast({
    ...defaultOptions,
    ...options,
    description: <Description description={translatedDescription} />,
    title: translatedTitle,
    status,
  });
};

const Description = ({ description }: { description: string }) => {
  return <>{description}</>;
};

export const notImplemented = () => {
  const description = i18n.t('COMMON.NOT_IMPLEMENTED') as string;
  const title = i18n.t('COMMON.INFO') as string;
  CreateOutsideToast({ description, title, status: ToastStatus.INFO });
};
