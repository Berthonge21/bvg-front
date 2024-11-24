import { useTranslation } from 'react-i18next';
import { hexToRGB } from '_theme/colors';
import { Eye } from '_assets/svg';
import { FC } from 'react';
import Modal from '_components/modal/Modal';
import { IModalProps } from '_components/modal/interface/modalProps';

const DetailInfoModal: FC<IModalProps> = ({
  data,
  isOpen,
  onClose,
  children,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ignoreFooter
      title={t('MODAL_ACTION.DETAILS_TITLE', { name: data?.name })}
      renderIcon={() => (
        <Eye width={20} height={20} fill={hexToRGB('primary', 1)} />
      )}
      renderContent={() => children}
    />
  );
};

export default DetailInfoModal;
