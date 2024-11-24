import React from 'react';
import { IModalProps } from '_components/modal/interface/modalProps';
import { Center } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { hexToRGB } from '_theme/colors';
import { FC } from 'react';
import Modal from '_components/modal/Modal';
import { InfoIcon } from '@chakra-ui/icons';

interface InfoModalProps extends IModalProps {
  children: React.ReactNode;
}

const DeleteInfoModal: FC<InfoModalProps> = ({
  isOpen,
  callBackAction,
  onClose,
  children,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      color={'blue'}
      onCallback={() => (callBackAction ? callBackAction(null) : null)}
      title={t('COMMON.INFORMATION')}
      ignoreFooter
      renderIcon={() => <InfoIcon fill={hexToRGB('primary', 1)} />}
      renderContent={() => (
        <Center gap="10px" bgColor={'white'} height={'100%'}>
          {children}
        </Center>
      )}
    />
  );
};

export default DeleteInfoModal;
