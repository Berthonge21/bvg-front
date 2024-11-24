import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { LockIcon } from '_assets/svg';
import { TYPES } from '_store/src';
import { initialSignUpValues } from '../../constants/auth';
import { useDispatch, useSelector } from 'react-redux';
import { OnboardingModule } from '_store/src/modules';
import { isEmpty } from 'lodash';
import { APP_ROUTES } from '_app/config/routes';
import FormInput from '_components/formInput/FormInput';
import PhoneInputField from '_components/phonePicker/PhonePicker';

export const SignUpStepperOne = ({ onSubmit }: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { currentUser, stepOneSuccess } = useSelector(
    OnboardingModule.selectors.onboardingSelector,
  );
  const [initialValues, setInitialValues] = useState(initialSignUpValues);
  const router = useRouter();
  const formikRef: any = useRef();

  const onSubmitForm = (values: any) => {
    const requestData: TYPES.MODELS.ONBOARDING.IUser = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      email: values?.email,
      phone: values?.phone,
      password: values?.confirmPassword,
      roleType: TYPES.ENUMS.ROLE_TYPE.RoleType.PROMOTER,
      status: TYPES.CONSTANTS.STATUS.STATUS_OPTIONS_TYPE.ACTIVE,
    };
    dispatch(OnboardingModule.actions.setUserDataAction(requestData));
  };

  const onCancelOnboarding = () => {
    dispatch(OnboardingModule.actions.clearOnboardingProcess());
    router.push(APP_ROUTES.PUBLIC.SIGN_IN);
  };

  useEffect(() => {
    if (!isEmpty(currentUser)) {
      setInitialValues({
        ...currentUser,
        confirmPassword: currentUser?.password,
      });
    }
    if (stepOneSuccess) {
      onSubmit(1);
    }
  }, [currentUser, stepOneSuccess]);

  return (
    <Box width={'100%'}>
      <Flex flexDirection={'column'} gap={'20px'}>
        <Flex alignItems={'center'} justifyContent={'center'}>
          <Text fontSize={'18px'}>{t('SIGNUP.DESCRIPTION.STEP_ONE')}</Text>
        </Flex>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={onSubmitForm}
          validationSchema={
            TYPES.VALIDATION_SCHEMA.AUTH_SCHEMA.singUpStepOneValidationSchema
          }
          innerRef={formikRef}>
          {({ values, handleSubmit }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <VStack spacing={'20px'} p={'20px'}>
                  <HStack width={'100%'} spacing={'20px'}>
                    <FormInput
                      name={'lastName'}
                      required
                      type="text"
                      label={'SIGNUP.LAST_NAME'}
                      placeholder={'SIGNUP.LAST_NAME'}
                      value={values.lastName}
                    />
                    <FormInput
                      name={'firstName'}
                      required
                      type="text"
                      label={'SIGNUP.FIRST_NAME'}
                      placeholder={'SIGNUP.FIRST_NAME'}
                      value={values.firstName}
                    />
                  </HStack>
                  <HStack width={'100%'} spacing={'20px'}>
                    <FormInput
                      name={'email'}
                      required
                      type="text"
                      label={'AUTH.EMAIL'}
                      placeholder={'AUTH.LOGIN.PLACEHOLDER.EMAIL'}
                      value={values.email}
                    />
                    <FormInput
                      name={'password'}
                      required
                      type="password"
                      label={'AUTH.PASSWORD'}
                      placeholder={'AUTH.LOGIN.PLACEHOLDER.PASSWORD'}
                      value={values.password}
                      leftAccessory={<LockIcon width={18} height={18} />}
                    />
                  </HStack>
                  <HStack width={'100%'} spacing={'20px'}>
                    <FormInput
                      required
                      name={'confirmPassword'}
                      type="password"
                      label={'SIGNUP.CONFIRM_PASSWORD'}
                      placeholder={'SIGNUP.CONFIRM_PASSWORD'}
                      value={values.confirmPassword}
                      leftAccessory={<LockIcon width={18} height={18} />}
                    />
                    <PhoneInputField
                      required
                      name="phone"
                      label={'SIGNUP.PHONE'}
                      placeholder={'SIGNUP.PHONE'}
                    />
                  </HStack>
                </VStack>
                <Center mt={'20px'} flexDirection={'row'} gap={'20px'}>
                  <Button
                    size={'lg'}
                    variant={'outline'}
                    borderRadius={12}
                    onClick={() => onCancelOnboarding()}>
                    {t('COMMON.BACK')}
                  </Button>
                  <Button
                    color={'white'}
                    type="submit"
                    size={'lg'}
                    borderRadius={12}>
                    {t('COMMON.NEXT')}
                  </Button>
                </Center>
              </Form>
            );
          }}
        </Formik>
      </Flex>
    </Box>
  );
};

export default SignUpStepperOne;
