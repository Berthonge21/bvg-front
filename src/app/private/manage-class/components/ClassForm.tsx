'use client';

import { Box, Center, Flex, VStack } from '@chakra-ui/react';
import { Formik, FormikValues } from 'formik';
import FormInput from '_components/formInput/FormInput';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FullDropdown } from '_components/dropdown/components/FullDropDown';
import { TYPES } from '_store/src';
import { AuthModule, ClassModule, SchoolModule } from '_store/src/modules';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { initialClassValues } from '_private/manage-class/interface/class';
import BoxContainer from '_components/container/BoxContainer';
import Button from '_components/button/Button';
import { formBoxStyle } from '_theme/cardStyle';

const ClassForm = () => {
  const formikRef = React.useRef<any>();
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const requestId = useSearchParams().get('requestId');
  const { currentUser } = useSelector(AuthModule.selectors.authSelector);
  const getDynamicSchoolId = useSelector(SchoolModule.selectors.getSchoolId);
  const { entityClass, isLoading, isCreateSuccess, isUpdateSuccess } =
    useSelector(ClassModule.selectors.classManagementSelector);
  const [initialValues, setInitialValues] = useState(initialClassValues);

  const onSubmit = (values: FormikValues) => {
    const request: TYPES.MODELS.CLASS_MANAGEMENT.IClassDto = {
      schoolId: getDynamicSchoolId,
      name: values.name,
      grade: values.grade,
      classAmount: parseFloat(values.amount),
      userId: currentUser?.id,
    };
    if (requestId) {
      dispatch(
        ClassModule.actions.updateClassRequestAction({
          id: requestId,
          ...request,
        }),
      );
    } else {
      dispatch(ClassModule.actions.createClassRequestAction(request));
    }
  };
  const findClassInList = entityClass?.content?.find(
    (classItem: any) => classItem.id === requestId,
  );

  useEffect(() => {
    if (requestId) {
      if (findClassInList) {
        setInitialValues({
          amount: findClassInList.classAmount,
          ...findClassInList,
        });
      } else {
        setInitialValues(initialClassValues);
      }
    }
  }, [requestId, entityClass]);

  useEffect(() => {
    if (requestId && entityClass) {
      if (findClassInList) {
        setInitialValues({
          amount: findClassInList.classAmount,
          ...findClassInList,
        });
      }
    }
  }, [entityClass, requestId]);

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      dispatch(ClassModule.actions.clearAllActions());
      dispatch(ClassModule.actions.clearClassesList());
      router.back();
    }
  }, [isCreateSuccess, isUpdateSuccess]);

  return (
    <BoxContainer
      title={
        requestId
          ? t('MANAGE_CLASSES.FORMS.EDIT_TITLE')
          : t('MANAGE_CLASSES.FORMS.ADD_TITLE')
      }>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize
        innerRef={formikRef}>
        {({ values, handleSubmit, resetForm, setFieldValue }) => (
          <Box {...formBoxStyle}>
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
              <Button
                variant={'secondary'}
                onClick={() => {
                  if (requestId) {
                    router.back();
                  } else {
                    resetForm();
                  }
                }}>
                {t('COMMON.CANCEL')}
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
    </BoxContainer>
  );
};

export default ClassForm;
