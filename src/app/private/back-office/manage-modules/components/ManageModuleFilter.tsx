'use client';

import { Box, Button, Flex, HStack } from '@chakra-ui/react';

import { FullDropdown } from '_components/dropdown/components/FullDropDown';
import FormInput from '_components/formInput/FormInput';
import { Formik } from 'formik';
import { useRef } from 'react';
import { TYPES } from '_store/src';
import { useTranslation } from 'react-i18next';
import { initialModuleValues } from '../../manage-modules/interface/manage-module';

const ManageModuleFilter = ({ onSubmit, onReset, isLoading }: any) => {
  const { t } = useTranslation();
  const formikRef: any = useRef();

  return (
    <Formik
      initialValues={initialModuleValues}
      onSubmit={onSubmit}
      onReset={onReset}
      enableReinitialize
      innerRef={formikRef}>
      {({ values, handleSubmit, resetForm, setFieldValue }) => (
        <Box p={'10px 20px 20px 10px'}>
          <HStack spacing={8} alignItems={'flex-start'}>
            <FormInput
              name={'name'}
              label={'MANAGE_MODULE.NAME'}
              placeholder={'MANAGE_MODULE.NAME'}
            />
            <FullDropdown
              name={'status'}
              label={'MANAGE_MODULE.STATUS'}
              listItems={TYPES.CONSTANTS.STATUS.STATUS_OPTIONS}
              setFieldValue={setFieldValue}
              selectedValue={values?.status}
              bindItemValue={'statusCode'}
              bindItemLabel={'statusName'}
              placeholder={'MANAGE_MODULE.STATUS'}
              arrowIcon={false}
            />
          </HStack>
          <Box
            display="flex"
            alignItems="flex-end"
            justifyContent="flex-end"
            gap={'10px'}
            mt={'30px'}>
            <Flex gap={4}>
              <Button
                bgColor={'secondary.500'}
                _hover={{ bgColor: 'secondary.500' }}
                color={'white'}
                onClick={() => resetForm()}>
                {JSON.stringify(values) === JSON.stringify(initialModuleValues)
                  ? t('COMMON.CANCEL')
                  : t('COMMON.RESET')}
              </Button>
              <Button
                bgColor={'primary.500'}
                isLoading={isLoading}
                _hover={{ bgColor: 'primary.500' }}
                color={'white'}
                onClick={() => handleSubmit()}>
                {t('COMMON.VALIDATE')}
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default ManageModuleFilter;
