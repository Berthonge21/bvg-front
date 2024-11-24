import React, { useEffect, useState } from 'react';
import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import CustomAccordion from '_components/accordion/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import { OnboardingModule, PacksModule } from '_store/src/modules';
import { Colors } from '_theme/variables';
import { useTranslation } from 'react-i18next';
import { TYPES } from '_store/src';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '_app/config/routes';
import { CheckCircle } from '_assets/svg';

export const SignUpStepperThree = ({ goBack }: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { entityPacks } = useSelector(PacksModule.selectors.packsSelector);
  const { isLoading, isSuccess, currentUser, schoolInfo } = useSelector(
    OnboardingModule.selectors.onboardingSelector,
  );
  const [selectedPack, setSelectedPack] =
    useState<TYPES.MODELS.PACKS.IPacks | null>(null);

  const activePacks = entityPacks?.content?.filter(
    (pack: any) =>
      pack.status === TYPES.CONSTANTS.STATUS.STATUS_OPTIONS_TYPE.ACTIVE,
  );

  const onSubmitForm = () => {
    const requestData: TYPES.MODELS.ONBOARDING.OnboardingSubmitPayload = {
      currentUser,
      schoolInfo,
      packId: selectedPack?.id,
    };
    dispatch(OnboardingModule.actions.submitOnboardingProcess(requestData));
  };

  useEffect(() => {
    if (isSuccess) {
      router.push(APP_ROUTES.PUBLIC.SIGN_IN);
      dispatch(OnboardingModule.actions.clearOnboardingProcess());
    }
    dispatch(PacksModule.actions.getAllPackRequestAction());
  }, [isSuccess]);

  const onCancelOnboarding = () => {
    dispatch(OnboardingModule.actions.clearSetUserSchoolData());
    goBack(1);
  };

  return (
    <Box>
      <Formik initialValues={{ checked: false }} onSubmit={onSubmitForm}>
        {({ setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            {activePacks?.map((pack: any, index: number) => (
              <Box
                key={index}
                mt={'30px'}
                gap={'20px'}
                alignItems={'flex-start'}
                width={'100%'}>
                <CustomAccordion
                  key={index}
                  title={pack?.name}
                  displayCheckbox
                  name={'checked'}
                  handleChange={(value: any) => {
                    if (value) {
                      setSelectedPack(selectedPack === pack ? null : pack);
                    } else {
                      setSelectedPack(null);
                    }
                    setFieldValue('checked', value).then(r => r);
                  }}
                  checked={selectedPack === pack}>
                  <Box
                    mt={'20px'}
                    gap={'20px'}
                    alignItems={'flex-start'}
                    width={'100%'}>
                    {pack.modules?.map((module: any, moduleIndex: number) => (
                      <Flex
                        gap={'15px'}
                        key={moduleIndex}
                        alignItems={'center'}>
                        <CheckCircle
                          width={'18px'}
                          height={'18px'}
                          color={Colors.primary}
                        />
                        <Text fontSize={'16px'} fontWeight={'bold'}>
                          {module?.name}
                        </Text>
                      </Flex>
                    ))}
                  </Box>
                </CustomAccordion>
              </Box>
            ))}

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
                isLoading={isLoading}
                isDisabled={selectedPack === null}
                borderRadius={12}>
                {t('COMMON.NEXT')}
              </Button>
            </Center>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
