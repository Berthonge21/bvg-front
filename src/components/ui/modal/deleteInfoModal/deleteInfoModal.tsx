import { IModalProps } from '_components/modal/interface/modalProps';
import { Center, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { TrashIcon } from '_assets/svg';
import { hexToRGB } from '_theme/colors';
import { FC } from 'react';
import Modal from '_components/modal/Modal';

const DeleteInfoModal: FC<IModalProps> = ({
  data,
  isOpen,
  callBackAction,
  onClose,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onCallback={() => (callBackAction ? callBackAction(data) : null)}
      title={t('MODAL_ACTION.DELETE_TITLE', {
        name: data?.name || data?.firstName,
      })}
      renderIcon={() => (
        <TrashIcon width={20} height={20} fill={hexToRGB('primary', 1)} />
      )}
      renderContent={() => (
        <Center gap="10px" bgColor={'white'} height={'100%'}>
          <Text>
            {t('MODAL_ACTION.DELETE_MESSAGE', {
              name: data?.name || data?.firstName,
            })}
          </Text>
        </Center>
      )}
      confirmText="COMMON.VALIDATE"
      cancelText="COMMON.CANCEL"
    />
  );
};

export default DeleteInfoModal;
