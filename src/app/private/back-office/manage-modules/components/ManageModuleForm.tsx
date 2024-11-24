'use client';

import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, FieldArray, FormikValues } from 'formik';
import FormInput from '_components/formInput/FormInput';
import { hexToRGB } from '_theme/colors';
import { CloseIcon } from '@chakra-ui/icons';
import { initialModuleValues } from '../../manage-modules/interface/manage-module';
import { useDispatch, useSelector } from 'react-redux';
import { ModuleManagement } from '_store/src/modules';
import { TYPES } from '_store/src';
import { useRouter, useSearchParams } from 'next/navigation';
import Switch from '_components/switch/Switch';

const ManageModuleForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useRouter();
  const formikRef: any = useRef();
  const requestId = useSearchParams().get('requestId');
  const [initialValues, setInitialValues] = useState<any>(initialModuleValues);
  const { isLoading, isUpdateSuccess, isCreateSuccess, entityModule } =
    useSelector(ModuleManagement.selectors.moduleManagementSelector);

  useEffect(() => {
    if (requestId) {
      const request = {
        id: requestId,
      };
      dispatch(
        ModuleManagement.actions.moduleManagementFindByIdRequestAction(request),
      );
    }
  }, [requestId]);

  useEffect(() => {
    if (entityModule && requestId) {
      setInitialValues({
        name: entityModule.name,
        status:
          entityModule.status ??
          formikRef.current?.setFieldValue('status', 'INACTIVE'),
        features: entityModule.features || [],
      });
    }
  }, [entityModule, requestId]);

  const onSubmit = (values: FormikValues) => {
    const request: TYPES.MODELS.MODULE_MANAGEMENT.CreateModuleDto = {
      name: values?.name,
      status: values?.status,
      features: values?.features.map(
        (feature: { name: string; description: string }) => ({
          name: feature?.name,
          description: feature?.description,
        }),
      ),
    };
    if (requestId) {
      dispatch(
        ModuleManagement.actions.moduleManagementUpdateRequestAction({
          id: requestId,
          ...request,
        }),
      );
    } else {
      dispatch(
        ModuleManagement.actions.moduleManagementCreateRequestAction(request),
      );
    }
  };

  useEffect(() => {
    if (isUpdateSuccess || isCreateSuccess) {
      navigate.back();
    }
  }, [isUpdateSuccess, isCreateSuccess, requestId]);

  return (
    <Box position={'relative'} mt={'50px'}>
      <Text fontSize="18px" fontWeight="bold">
        {requestId ? t('MANAGE_MODULE.EDIT') : t('MANAGE_MODULE.ADD')}
      </Text>
      <Box
        padding="5"
        borderWidth="1px"
        borderRadius="lg"
        bgColor={hexToRGB('lighter', 0.1)}
        mt={'30px'}
        borderColor="gray.500">
        <Formik
          initialValues={{
            ...initialValues,
            status: initialValues.status === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE',
          }}
          onSubmit={onSubmit}
          enableReinitialize
          innerRef={formikRef}>
          {({ values, handleSubmit, resetForm, setFieldValue }) => (
            <Box p={'10px 20px 20px 10px'}>
              <VStack spacing={8} alignItems={'flex-start'}>
                <FormInput
                  required
                  name={'name'}
                  label={'MANAGE_MODULE.NAME'}
                  placeholder={'MANAGE_MODULE.NAME'}
                />
                <FieldArray name="features">
                  {({ push, remove }) => (
                    <Box width={'100%'}>
                      <Button
                        variant={'unstyled'}
                        color={'primary.500'}
                        onClick={() => push({ name: '', description: '' })}>
                        {t('MANAGE_MODULE.ADD_FEATURES')}
                      </Button>
                      <Box
                        pe={values.features.length > 4 ? '20px' : '0'}
                        maxH={values.features.length > 4 ? '200px' : 'auto'}
                        overflowY={
                          values.features.length > 4 ? 'auto' : 'visible'
                        }>
                        <VStack
                          width="100%"
                          mt="10px"
                          align={'start'}
                          spacing={2}>
                          {values.features.map(
                            (_: any, index: React.Key | null | undefined) => (
                              <Flex
                                key={index}
                                alignItems={'flex-start'}
                                justifyContent={'space-between'}
                                gap={'20px'}
                                width={'100%'}>
                                <Box width={'100%'}>
                                  <FormInput
                                    name={`features[${index}].name`}
                                    placeholder={t(
                                      'MANAGE_MODULE.FEATURE_NAME',
                                    )}
                                  />
                                </Box>
                                <Flex
                                  width={'100%'}
                                  alignItems={'center'}
                                  gap={'10px'}>
                                  <FormInput
                                    name={`features[${index}].description`}
                                    placeholder={t(
                                      'MANAGE_MODULE.FEATURE_DESCRIPTION',
                                    )}
                                  />
                                  {values.features.length > 1 && (
                                    <IconButton
                                      bgColor={'red.500'}
                                      _hover={{ backgroundColor: 'red.500' }}
                                      color={'white'}
                                      icon={<CloseIcon />}
                                      aria-label={'delete-icon'}
                                      onClick={() => remove(index as number)}
                                    />
                                  )}
                                </Flex>
                              </Flex>
                            ),
                          )}
                        </VStack>
                      </Box>
                    </Box>
                  )}
                </FieldArray>
                <Switch
                  name="status"
                  labelRight={'COMMON.STATUS.ACTIVE'}
                  labelLeft={'COMMON.STATUS.INACTIVATE'}
                  isChecked={values?.status === 'ACTIVE'}
                  onChange={e =>
                    setFieldValue(
                      'status',
                      e.target.checked ? 'ACTIVE' : 'INACTIVE',
                    )
                  }
                />
              </VStack>
              <Center gap={'20px'} mt={'30px'}>
                <Button
                  color={'white'}
                  bgColor={'secondary.500'}
                  _hover={{ bgColor: 'secondary.500' }}
                  onClick={() => resetForm()}>
                  {t('COMMON.CANCEL')}
                </Button>
                <Button
                  bgColor={'primary.500'}
                  _hover={{ bgColor: 'primary.500' }}
                  color={'white'}
                  isLoading={isLoading}
                  onClick={() => handleSubmit()}>
                  {t('COMMON.VALIDATE')}
                </Button>
              </Center>
            </Box>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ManageModuleForm;
