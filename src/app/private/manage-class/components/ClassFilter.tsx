import { Formik } from 'formik';
import { Box, Center, Flex, VStack } from '@chakra-ui/react';
import FormInput from '_components/formInput/FormInput';
import { FullDropdown } from '_components/dropdown/components/FullDropDown';
import React from 'react';
import { initialClassValues } from '../interface/class';
import { TYPES } from '_store/src';
import { useTranslation } from 'react-i18next';
import Button from '_components/button/Button';

const ClassFilter = ({ onSubmit, onReset, isLoading }: any) => {
  const formikRef = React.useRef<any>();
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={initialClassValues}
      onSubmit={onSubmit}
      enableReinitialize
      onReset={onReset}
      innerRef={formikRef}>
      {({ values, handleSubmit, resetForm, setFieldValue }) => (
        <Box p={'10px 20px 20px 10px'}>
          <VStack spacing={8} alignItems={'flex-start'}>
            <Flex width={'100%'} gap={8}>
              <FormInput
                required
                name={'name'}
                label={'MANAGE_CLASSES.FORMS.NAME'}
                placeholder={'MANAGE_CLASSES.FORMS.NAME'}
              />
              <FormInput
                required
                name={'amount'}
                label={'MANAGE_CLASSES.FORMS.AMOUNT'}
                placeholder={'MANAGE_CLASSES.FORMS.AMOUNT'}
              />
            </Flex>
            <FullDropdown
              name={'grade'}
              listItems={TYPES.CONSTANTS.COMMON.cycleOptions}
              placeholder={t('STUDENT.GRADE')}
              label={t('STUDENT.GRADE')}
              setFieldValue={setFieldValue}
              selectedValue={values?.grade}
              bindItemValue={'value'}
              bindItemLabel={'label'}
            />
          </VStack>
          <Center gap={'20px'} mt={'30px'}>
            <Button variant={'secondary'} onClick={() => resetForm()}>
              {JSON.stringify(values) !== JSON.stringify(initialClassValues)
                ? t('COMMON.RESET')
                : t('COMMON.CANCEL')}
            </Button>
            <Button
              variant={'primary'}
              isLoading={isLoading}
              onClick={() => handleSubmit()}>
              {t('COMMON.VALIDATE')}
            </Button>
          </Center>
        </Box>
      )}
    </Formik>
  );
};

export default ClassFilter;
