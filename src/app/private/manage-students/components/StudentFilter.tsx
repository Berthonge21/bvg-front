import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, VStack } from '@chakra-ui/react';
import { StudentModule } from '_store/src/modules';
import FormInput from '_components/formInput/FormInput';
import { FC } from 'react';
import { IFIlter } from '_app/interface/common.filter';
import { FullDropdown } from '_components/dropdown/components/FullDropDown';
import { TYPES } from '_store/src';

interface Props extends IFIlter {
  withClass?: boolean;
}

const StudentFilter: FC<Props> = ({ onSubmit, onReset, withClass = false }) => {
  const { t } = useTranslation();
  const { isLoading } = useSelector(StudentModule.selectors.studentSelector);

  return (
    <Formik
      initialValues={{ paymentStatus: '', lastName: '', firstName: '' }}
      onSubmit={onSubmit}
      enableReinitialize
      onReset={onReset}>
      {({ values, handleSubmit, resetForm, setFieldValue }) => (
        <Box>
          <VStack spacing={8} alignItems={'flex-start'}>
            <Flex width={'100%'} gap={8}>
              <FormInput
                name={'lastName'}
                label={t('STUDENT.LAST_NAME')}
                placeholder={t('STUDENT.LAST_NAME')}
              />
              <FormInput
                name={'firstName'}
                label={t('STUDENT.FIRST_NAME')}
                placeholder={t('STUDENT.FIRST_NAME')}
              />
              <FullDropdown
                name={'paymentStatus'}
                label={t('COMMON.PAYMENT_STATUS.TITLE')}
                placeholder={t('COMMON.PAYMENT_STATUS.TITLE')}
                listItems={TYPES.CONSTANTS.COMMON.paymentStatus}
                setFieldValue={setFieldValue}
                bindItemValue={'value'}
                bindItemLabel={'label'}
                selectedValue={values?.paymentStatus}
              />
            </Flex>
          </VStack>
          <Flex
            alignItems={'flex-end'}
            justifyContent={'flex-end'}
            gap={'20px'}
            mt={'30px'}>
            <Button
              color={'white'}
              bgColor={'secondary.500'}
              _hover={{ bgColor: 'secondary.500' }}
              onClick={() => resetForm()}>
              {JSON.stringify(values) !== JSON.stringify(values)
                ? t('COMMON.RESET')
                : t('COMMON.CANCEL')}
            </Button>
            <Button
              bgColor={'primary.500'}
              _hover={{ bgColor: 'primary.500' }}
              color={'white'}
              isLoading={isLoading}
              onClick={() => handleSubmit()}>
              {t('COMMON.VALIDATE')}
            </Button>
          </Flex>
        </Box>
      )}
    </Formik>
  );
};

export default StudentFilter;
