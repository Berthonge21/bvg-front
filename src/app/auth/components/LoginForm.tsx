'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Text,
  Select,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { formContainer } from '_theme/containerStyles';
import { Form, Formik, FormikValues } from 'formik';
import { TYPES } from '_store/src';
import FormInput from '_components/formInput/FormInput';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '_app/config/routes';
import { useDispatch, useSelector } from 'react-redux';
import { AuthModule, OnboardingModule } from '_store/src/modules';
import { initialLoginValues } from '_app/auth/constants/auth';
import { AuthBackground } from '_app/auth/components/AuthBackground';

const LoginComponent = () => {
  const { t, i18n } = useTranslation();
  const formikRef: any = useRef();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser, isLoggedIn, isLoading, error } = useSelector(
    AuthModule.selectors.authSelector,
  );

  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedCredentials = localStorage.getItem('rememberMeData');
    if (savedCredentials) {
      const { email } = JSON.parse(savedCredentials);
      formikRef.current?.setFieldValue('email', email);
      setRememberMe(true);
    }
  }, []);

  const switchLanguage = (code: string) => {
    i18n.changeLanguage(code).catch(error => console.error(error));
  };

  const handleLogin = (values: FormikValues) => {
    const requestData = {
      email: values.email,
      password: values.password,
    };
    dispatch(AuthModule.actions.authLoginRequestAction(requestData));
    if (rememberMe) {
      localStorage.setItem('rememberMeData', JSON.stringify(requestData));
    } else {
      localStorage.removeItem('rememberMeData');
    }
  };

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      if (currentUser.roleType === 'ADMIN') {
        router.push(APP_ROUTES.PRIVATE.BACK_OFFICE.DASHBOARD);
      } else {
        router.push(APP_ROUTES.PRIVATE.CLIENT.DASHBOARD);
      }
    }
  }, [isLoggedIn, currentUser, router]);

  return (
    <>
      <AuthBackground />
      <Box width={'50%'}>
        <Flex
          alignItems={'flex-end'}
          justifyContent={'flex-end'}
          gap={4}
          py={5}
          px={5}>
          <Select
            flex={0.2}
            borderRadius="12px"
            onChange={event => switchLanguage(event.target.value)}
            value={i18n.language}>
            {TYPES.CONSTANTS.LANGUAGES.LANGUAGES_OPTIONS?.map(language => (
              <option key={language.code} value={language.code}>
                {language.label}
              </option>
            ))}
          </Select>
        </Flex>
        <Box {...formContainer}>
          <Center pb={'32px'} flexDir={'column'}>
            <Text fontSize={'24px'} fontWeight={'bold'}>
              {t('AUTH.WELCOME_BACK')}
            </Text>
            <Text
              fontSize={'16px'}
              color={'gray.500'}
              mt={'10px'}
              fontWeight={'400'}>
              {t('AUTH.DESCRIPTION')}
            </Text>
          </Center>
          <Formik
            enableReinitialize
            initialValues={initialLoginValues}
            onSubmit={handleLogin}
            validationSchema={
              TYPES.VALIDATION_SCHEMA.AUTH_SCHEMA.validationSchema
            }
            innerRef={formikRef}>
            {({ values, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <VStack spacing={5}>
                  <FormInput
                    name="email"
                    required
                    type="text"
                    label="AUTH.EMAIL"
                    placeholder="AUTH.LOGIN.PLACEHOLDER.EMAIL"
                    value={values.email}
                  />
                  <FormInput
                    required
                    name="password"
                    type="password"
                    label="AUTH.PASSWORD"
                    placeholder="AUTH.LOGIN.PLACEHOLDER.PASSWORD"
                    value={values.password}
                  />
                </VStack>
                <HStack
                  flexDirection={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  mt={5}>
                  <Checkbox
                    colorScheme="blue"
                    name="rememberMe"
                    isChecked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}>
                    {t('COMMON.REMEMBER_ME')}
                  </Checkbox>
                  <Text
                    color={'primary.500'}
                    fontWeight={'bold'}
                    cursor={'pointer'}
                    onClick={() =>
                      router.push(APP_ROUTES.PUBLIC.FORGOT_PASSWORD)
                    }>
                    {t('AUTH.FORGOT_PASSWORD')}
                  </Text>
                </HStack>
                <Center mt={'20px'} flexDirection={'column'} gap={'20px'}>
                  <Button
                    color={'white'}
                    width={'50%'}
                    type="submit"
                    size={'lg'}
                    borderRadius={12}
                    isLoading={isLoading}>
                    {t('AUTH.CONNECT')}
                  </Button>
                  <Flex>
                    <Text
                      cursor={'pointer'}
                      onClick={() => {
                        router.push(APP_ROUTES.PUBLIC.SIGN_UP);
                        dispatch(OnboardingModule.actions.startOnboarding());
                      }}>
                      {t('AUTH.DONT_HAVE_AN_ACCOUNT')}{' '}
                      <span style={{ color: 'primary.500', cursor: 'pointer' }}>
                        {t('AUTH.SIGN_UP')}
                      </span>
                    </Text>
                  </Flex>
                </Center>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default LoginComponent;
