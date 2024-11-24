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
import { useDispatch, useSelector } from 'react-redux';
import { ModuleManagement, PacksModule } from '_store/src/modules';
import { TYPES } from '_store/src';
import { useRouter, useSearchParams } from 'next/navigation';
import Switch from '_components/switch/Switch';
import { FullDropdown } from '_components/dropdown/components/FullDropDown';
import { initialPackValues } from '../../manage-packs/interface/packs';
import { formBoxStyle } from '_theme/cardStyle';

const PackForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useRouter();
  const formikRef = useRef<undefined | any>();
  const requestId = useSearchParams().get('requestId');
  const [initialValues, setInitialValues] = useState(initialPackValues);
  const { addPackSuccess, updatePackSuccess, isLoading, entityPacks } =
    useSelector(PacksModule.selectors.packsSelector);
  const { entityModule } = useSelector(
    ModuleManagement.selectors.moduleManagementSelector,
  );

  useEffect(() => {
    if (requestId) {
      const request = {
        id: requestId,
      };
      dispatch(PacksModule.actions.getOnePackRequestAction(request));
    }
  }, [requestId]);

  useEffect(() => {
    if (entityPacks?.modules) {
      const existingModuleIds = entityPacks.modules.map(
        (module: { id: string[] }) => ({ id: module.id }),
      );
      setInitialValues(() => ({
        packName: entityPacks.name,
        price: entityPacks.price,
        status: entityPacks.status,
        moduleIds: existingModuleIds,
      }));
    }
  }, [entityPacks]);

  useEffect(() => {
    dispatch(
      ModuleManagement.actions.moduleManagementFindAllRequestAction({
        status: TYPES.CONSTANTS.STATUS.STATUS_OPTIONS_TYPE.ACTIVE,
        page: TYPES.CONSTANTS.COMMON.INITIAL_PAGE,
        pageSize: TYPES.CONSTANTS.COMMON.FULL_PAGE_SIZE,
      }),
    );
  }, []);

  const onSubmit = (values: FormikValues) => {
    const request = {
      packName: values?.packName,
      price: parseInt(values?.price, 10),
      moduleIds: values?.moduleIds.map((module: { id: string }) => module.id),
      status: values?.status,
    };
    if (requestId) {
      dispatch(
        PacksModule.actions.updatePackRequestAction({
          id: requestId,
          ...request,
        }),
      );
    } else {
      dispatch(PacksModule.actions.createPackRequestAction(request));
    }
  };

  useEffect(() => {
    if (addPackSuccess || updatePackSuccess) {
      navigate.back();
    }
  }, [addPackSuccess, updatePackSuccess]);

  return (
    <Box position="relative" mt="50px">
      <Text fontSize="18px" fontWeight="bold">
        {requestId ? t('OFFERS.FORMS.EDIT') : t('OFFERS.FORMS.CREATE')}
      </Text>
      <Box
        padding="5"
        borderWidth="1px"
        borderRadius="lg"
        bgColor={hexToRGB('lighter', 0.1)}
        mt="30px"
        borderColor="gray.500">
        <Formik
          initialValues={{
            ...initialValues,
            status:
              initialValues?.status ===
              TYPES.CONSTANTS.STATUS.STATUS_OPTIONS_TYPE.ACTIVE
                ? 'ACTIVE'
                : 'INACTIVE',
          }}
          onSubmit={onSubmit}
          enableReinitialize
          innerRef={formikRef}>
          {({ values, handleSubmit, resetForm, setFieldValue }) => (
            <Box {...formBoxStyle}>
              <VStack spacing={8} alignItems="flex-start">
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  gap="20px"
                  width="100%">
                  <FullDropdown
                    required
                    name="packName"
                    label="OFFERS.FORMS.PACK_TYPE"
                    placeholder="OFFERS.FORMS.PACK_TYPE"
                    listItems={TYPES.CONSTANTS.PACKS.PACK_TYPES_OPTIONS}
                    setFieldValue={setFieldValue}
                    selectedValue={values?.packName}
                    bindItemLabel="label"
                    bindItemValue="packCode"
                    isDisabled={Boolean(requestId)}
                  />
                  <FormInput
                    required
                    name={'price'}
                    label="OFFERS.FORMS.AMOUNT"
                    placeholder="OFFERS.FORMS.AMOUNT"
                  />
                </Flex>
                <FieldArray name="moduleIds">
                  {({ push, remove }) => (
                    <Box width="100%">
                      <Button
                        variant="unstyled"
                        color="primary.500"
                        onClick={() => push({ id: '' })}>
                        {t('OFFERS.FORMS.ADD_MODULE')}
                      </Button>
                      <Box
                        pe={values.moduleIds?.length > 4 ? '20px' : '0'}
                        maxH={values.moduleIds?.length > 4 ? '200px' : 'auto'}
                        overflowY={
                          values.moduleIds?.length > 4 ? 'auto' : 'visible'
                        }>
                        <VStack
                          width="100%"
                          mt="10px"
                          align="start"
                          spacing={2}>
                          {values.moduleIds?.map((_, index) => (
                            <Flex
                              key={index}
                              width="100%"
                              alignItems="center"
                              justifyContent={'center'}
                              gap="10px">
                              <FullDropdown
                                required
                                name={`moduleIds[${index}].id`}
                                label={'OFFERS.FORMS.SELECT_MODULE'}
                                placeholder={'OFFERS.FORMS.SELECT_MODULE'}
                                listItems={entityModule?.content}
                                setFieldValue={setFieldValue}
                                selectedValue={values?.moduleIds[index]?.id}
                                bindItemLabel={'name'}
                                bindItemValue={'id'}
                              />
                              {values.moduleIds.length > 1 && (
                                <IconButton
                                  bgColor="red.500"
                                  _hover={{ backgroundColor: 'red.500' }}
                                  color="white"
                                  icon={<CloseIcon />}
                                  aria-label="delete-icon"
                                  mt="25px"
                                  onClick={() => remove(index)}
                                />
                              )}
                            </Flex>
                          ))}
                        </VStack>
                      </Box>
                    </Box>
                  )}
                </FieldArray>
                <Switch
                  name="status"
                  labelRight="COMMON.STATUS.ACTIVE"
                  labelLeft="COMMON.STATUS.INACTIVATE"
                  isChecked={values?.status === 'ACTIVE'}
                  onChange={e =>
                    setFieldValue(
                      'status',
                      e.target.checked ? 'ACTIVE' : 'INACTIVE',
                    )
                  }
                />
              </VStack>
              <Center gap="20px" mt="30px">
                <Button
                  color="white"
                  bgColor="secondary.500"
                  _hover={{ bgColor: 'secondary.500' }}
                  onClick={() => resetForm()}>
                  {t('COMMON.CANCEL')}
                </Button>
                <Button
                  bgColor="primary.500"
                  _hover={{ bgColor: 'primary.500' }}
                  color="white"
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

export default PackForm;
