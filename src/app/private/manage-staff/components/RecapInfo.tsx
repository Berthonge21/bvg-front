import { InfoModal } from '_components/modal';
import Button from '_components/button/Button';
import { FC } from 'react';
import { IModalProps } from '_components/modal/interface/modalProps';
import { Box, Center, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const RecapInfo: FC<IModalProps> = ({
  isOpen,
  onClose,
  callBackAction,
  data,
}) => {
  const { t } = useTranslation();
  return (
    <InfoModal
      isOpen={isOpen}
      onClose={onClose}
      callBackAction={() => (callBackAction ? callBackAction(null) : null)}>
      <Box>
        <Box>
          <Text>
            Lors de lajout de{' '}
            {data?.employeeInfo?.firstName + ' ' + data?.employeeInfo?.lastName}{' '}
            un mot de passe sera automatiquement généré et sera envoyé à son à
            son adresse e-mail, afin quil puisse accéder à notre service digital
          </Text>
        </Box>
        <Center gap={'20px'} mt={'20px'}>
          <Button variant={'secondary'} withGradient onClick={() => onClose()}>
            {t('COMMON.CANCEL')}
          </Button>
          <Button
            variant={'success'}
            withGradient
            onClick={() => (callBackAction ? callBackAction(data) : null)}>
            {t('COMMON.CONFIRM')}
          </Button>
        </Center>
      </Box>
    </InfoModal>
  );
};

export default RecapInfo;
