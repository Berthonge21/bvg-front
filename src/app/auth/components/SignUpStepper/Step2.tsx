import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import FormInput from '_components/formInput/FormInput';
import { BuildingIcon, Flag, MapIcon, MapPinIcon } from '_assets/svg';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Colors } from '_theme/variables';
import { initialSchoolValues } from '_app/auth/constants/auth';
import { useDispatch, useSelector } from 'react-redux';
import { OnboardingModule } from '_store/src/modules';
import { TYPES } from '_store/src';
import { isEmpty } from 'lodash';

export const SignUpStepperTwo = ({ goBack, onSubmit }: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { schoolInfo, stepTwoSuccess } = useSelector(
    OnboardingModule.selectors.onboardingSelector,
  );
  const [initialValues, setInitialValues] = useState(initialSchoolValues);
  const formikRef: any = useRef();

  const onSubmitForm = (values: any) => {
    const requestData: TYPES.MODELS.ONBOARDING.ISchoolInfo = {
      schoolName: values?.schoolName,
      country: values?.country,
      city: values?.city,
      schoolAddress: values?.schoolAddress,
      status: TYPES.CONSTANTS.STATUS.STATUS_OPTIONS_TYPE.ACTIVE,
    };
    dispatch(OnboardingModule.actions.setSchoolUserDataAction(requestData));
  };

  const onCancelOnboarding = () => {
    dispatch(OnboardingModule.actions.clearSetUserData());
    goBack(0);
  };

  useEffect(() => {
    if (!isEmpty(schoolInfo)) {
      setInitialValues(schoolInfo);
    }
    if (stepTwoSuccess) {
      onSubmit(2);
    }
  }, [schoolInfo, stepTwoSuccess]);

  return (
    <Box width={'100%'}>
      <Flex flexDirection={'column'} gap={'20px'}>
        <Flex alignItems={'center'} justifyContent={'center'}>
          <Text fontSize={'18px'}>{t('SIGNUP.DESCRIPTION.STEP_TWO')}</Text>
        </Flex>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={onSubmitForm}
          validationSchema={
            TYPES.VALIDATION_SCHEMA.AUTH_SCHEMA.singUpStepTwoValidationSchema
          }
          innerRef={formikRef}>
          {({ values, handleSubmit }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <VStack spacing={'20px'} p={'20px'}>
                  <HStack width={'100%'} spacing={'20px'}>
                    <FormInput
                      name={'schoolName'}
                      required
                      type="text"
                      label={'SIGNUP.SCHOOL'}
                      placeholder={'SIGNUP.SCHOOL'}
                      value={values.schoolName}
                      leftAccessory={
                        <BuildingIcon
                          width={18}
                          height={18}
                          fill={Colors.grayScale}
                        />
                      }
                    />
                  </HStack>
                  <HStack width={'100%'} spacing={'20px'}>
                    <FormInput
                      name={'country'}
                      required
                      type="text"
                      label={'SIGNUP.COUNTRY'}
                      placeholder={'SIGNUP.COUNTRY'}
                      value={values.country}
                      leftAccessory={
                        <Flag width={18} height={18} fill={Colors.grayScale} />
                      }
                    />
                    <FormInput
                      name={'city'}
                      required
                      type="text"
                      label={'SIGNUP.CITY'}
                      placeholder={'SIGNUP.CITY'}
                      value={values.city}
                      leftAccessory={
                        <MapIcon
                          width={18}
                          height={18}
                          fill={Colors.grayScale}
                        />
                      }
                    />
                  </HStack>
                  <HStack width={'100%'} spacing={'20px'}>
                    <FormInput
                      name={'schoolAddress'}
                      required
                      type="text"
                      label={'SIGNUP.ADDRESS'}
                      placeholder={'SIGNUP.ADDRESS'}
                      value={values.schoolAddress}
                      leftAccessory={
                        <MapPinIcon
                          width={18}
                          height={18}
                          fill={Colors.grayScale}
                        />
                      }
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
