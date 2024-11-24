'use client';
import { Box, Flex } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { BuildingIcon, NewPaperIcon, UserIcon } from '_assets/svg';
import { CustomStepper } from '_components/stepper/StepperComponent';
import { AuthBackground } from '_app/auth/components/AuthBackground';
import {
  SignUpStepperOne,
  SignUpStepperThree,
  SignUpStepperTwo,
} from '_app/auth/components/SignUpStepper';
import { Colors } from '_theme/variables';

const steps = [
  {
    title: 'SIGNUP.USER_PROMOTER',
    activeIcon: <UserIcon width={18} height={18} fill={Colors.white} />,
    inactiveIcon: <UserIcon width={18} height={18} fill={Colors.grayScale} />,
  },
  {
    title: 'SIGNUP.SCHOOL',
    inactiveIcon: (
      <BuildingIcon width={18} height={18} fill={Colors.grayScale} />
    ),
    activeIcon: <BuildingIcon width={18} height={18} fill={Colors.white} />,
  },
  {
    title: 'SIGNUP.CHOOSE_PACKS',
    inactiveIcon: (
      <NewPaperIcon width={18} height={18} fill={Colors.grayScale} />
    ),
    activeIcon: <NewPaperIcon width={18} height={18} fill={Colors.white} />,
  },
];

const SignUpForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNextStep = (index: number) => {
    setActiveStep(index);
  };

  const onSubmit = useCallback((step?: any) => {
    handleNextStep(step);
  }, []);

  const goBack = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Flex>
      <AuthBackground />
      <Box width={'50%'}>
        <Flex pt={'50px'}>
          <CustomStepper
            activeStep={activeStep}
            handleNextStep={handleNextStep}
            my-2
            steps={steps}
            clickable={false}
          />
        </Flex>
        <Box borderRadius={'7px'} p={4} w={'100%'}>
          {activeStep === 0 && <SignUpStepperOne onSubmit={onSubmit} />}
          {activeStep === 1 && (
            <SignUpStepperTwo onSubmit={onSubmit} goBack={goBack} />
          )}
          {activeStep === 2 && <SignUpStepperThree goBack={goBack} />}
        </Box>
      </Box>
    </Flex>
  );
};

export default SignUpForm;
