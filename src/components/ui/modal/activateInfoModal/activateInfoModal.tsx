import { IModalProps } from '../interface/modalProps';
import { Center, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, ShutDownIcon } from '_assets/svg';
import { hexToRGB } from '_theme/colors';
import { FC } from 'react';
import Modal from '_components/modal/Modal';

const ActivateInfoModal: FC<IModalProps> = ({
  data,
  isOpen,
  onClose,
  callBackAction,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onCallback={() => (callBackAction ? callBackAction(data) : null)}
      title={
        data?.status === 'ACTIVE'
          ? t('MODAL_ACTION.DEACTIVATE_TITLE', {
              name: data?.name,
            })
          : t('MODAL_ACTION.ACTIVATE_TITLE', {
              name: data?.name,
            })
      }
      renderIcon={() => {
        return data?.status !== 'ACTIVE' ? (
          <CheckCircle width={20} height={20} fill={hexToRGB('primary', 1)} />
        ) : (
          <ShutDownIcon width={20} height={20} fill={hexToRGB('primary', 1)} />
        );
      }}
      renderContent={() => (
        <Center gap="10px" bgColor={'white'} height={'100%'}>
          <Text>
            {data?.status !== 'ACTIVE'
              ? t('MODAL_ACTION.ACTIVATE_MESSAGE', {
                  name: data?.name ?? '',
                })
              : t('MODAL_ACTION.DEACTIVATE_MESSAGE', {
                  name: data?.name ?? '',
                })}
          </Text>
        </Center>
      )}
      confirmText="COMMON.VALIDATE"
      cancelText="COMMON.CANCEL"
    />
  );
};

export default ActivateInfoModal;
