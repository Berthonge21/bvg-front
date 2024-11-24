import { ReactNode, FC } from 'react';
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Center,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { buttonCloseStyles, StyledCloseButton } from './modal.styles';
import { setFroastStyle } from '_theme/froastStyle';
import { hexToRGB } from '_theme/colors';
import { useTranslation } from 'react-i18next';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  renderContent: () => ReactNode;
  confirmText?: string;
  bgContent?: string;
  cancelText?: string;
  ignoreFooter?: boolean;
  maxW?: string;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  modalCloseButton?: boolean;
  isLoading?: boolean;
  renderIcon?: () => ReactNode;
  color?: string;
  onCallback?: () => void;
}

const Modal: FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  confirmText = 'Ok',
  cancelText = 'Close',
  renderContent,
  ignoreFooter,
  maxW,
  closeOnEsc = true,
  modalCloseButton = true,
  closeOnOverlayClick = true,
  bgContent,
  renderIcon,
  color,
  onCallback,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={true}
      closeOnEsc={closeOnEsc}
      closeOnOverlayClick={closeOnOverlayClick}>
      <ModalOverlay {...setFroastStyle('overlay', 0.3, '0')} />
      <ModalContent
        borderRadius={'12px'}
        maxW={maxW ? maxW : '600px'}
        bg={bgContent ? bgContent : 'white'}>
        {title && (
          <ModalHeader
            p={'12px'}
            color={color ?? 'primary'}
            alignItems={'center'}
            justifyContent={'center'}>
            {renderIcon && (
              <Flex gap={'10px'} alignItems={'center'}>
                <Box
                  bgColor={hexToRGB(color ?? 'primary', 0.1)}
                  p={2}
                  borderRadius={'50px'}>
                  <Flex
                    bgColor={hexToRGB(color ?? 'primary', 0.3)}
                    alignItems={'center'}
                    p={1}
                    borderRadius={'50px'}
                    width={'45px'}
                    height={'45px'}
                    justifyContent={'center'}>
                    {renderIcon()}
                  </Flex>
                </Box>
              </Flex>
            )}
          </ModalHeader>
        )}
        {modalCloseButton && <StyledCloseButton {...buttonCloseStyles} />}
        <ModalBody p={'12px'} borderRadius={'7px'}>
          <Box>
            {title && (
              <Text mb={'10px'} fontSize={'18px'} fontWeight={'bold'}>
                {t(title)}
              </Text>
            )}
            {renderContent()}
          </Box>
        </ModalBody>
        {!ignoreFooter && (
          <Center>
            <ModalFooter>
              <Button
                bgColor={'secondary.500'}
                colorScheme="secondary"
                me={3}
                onClick={onClose}>
                {t(cancelText)}
              </Button>
              <Button
                colorScheme={'primary'}
                onClick={onCallback}
                isLoading={isLoading}>
                {t(confirmText)}
              </Button>
            </ModalFooter>
          </Center>
        )}
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
