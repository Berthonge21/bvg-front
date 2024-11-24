import {
  Box,
  Step,
  StepIndicator,
  StepSeparator,
  StepTitle,
  Stepper,
  StepperProps,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { CSSProperties, memo } from 'react';

import { useTranslation } from 'react-i18next';

import {
  activeStepIndicatorStyle,
  activeStepTitle,
  stepIndicatorStyle,
} from './customStepper.styles';

export interface IStepsStepper {
  title: string;
  inactiveIcon: JSX.Element;
  activeIcon: JSX.Element;
}

type CustomStepperProps = {
  activeStep: number;
  cssStyle?: CSSProperties;
  stepSeparatorStyleProps?: any;
  handleNextStep?: (index: number) => void;
  steps: IStepsStepper[];
  defaultStepOrientation?: 'horizontal' | 'vertical';
  stepperProps?: StepperProps;
  children?: React.ReactNode;
  clickable?: boolean;
};

type StepperOrientationType = 'vertical' | 'horizontal' | undefined;
export const CustomStepper = memo<CustomStepperProps>(
  ({
    activeStep,
    handleNextStep,
    steps,
    cssStyle,
    clickable,
    children,
    defaultStepOrientation,
  }) => {
    const { t } = useTranslation();
    const stepperOrientation: StepperOrientationType = useBreakpointValue(
      { base: 'vertical', sm: 'horizontal' },
      { ssr: false },
    );
    const verticalStyle = { left: '24px', marginTop: '20px', height: '100%' };
    return (
      <Stepper
        colorScheme={'lightGray'}
        index={activeStep}
        p={{ base: '10px', md: 10 }}
        justifyContent="center"
        height={{ base: '100%', sm: 'unset' }}
        w={{ base: '100%', sm: '100%' }}
        style={cssStyle}
        orientation={defaultStepOrientation}>
        {steps?.map((step, index) => (
          <Step
            key={index}
            onClick={() => (handleNextStep ? handleNextStep(index) : undefined)}
            style={{
              pointerEvents: clickable ? 'auto' : 'none',
              ...(index !== activeStep
                ? { maxWidth: '85px' }
                : stepperOrientation === 'horizontal'
                  ? { maxWidth: '300px' }
                  : { width: '100%' }),
            }}>
            <StepIndicator
              {...stepIndicatorStyle}
              {...(index === activeStep ? { ...activeStepIndicatorStyle } : '')}
              marginTop={{ base: '5px', sm: 'unset' }}>
              {index === activeStep ? step.activeIcon : step.inactiveIcon}
            </StepIndicator>

            {index === activeStep && (
              <VStack
                gap={10}
                mt={{ base: '4', md: 'unset' }}
                w={{
                  base: '-webkit-fill-available',
                  sm: '-webkit-fill-available',
                  md: 'auto',
                }}
                maxWidth={{ base: '100%', sm: 'max-content' }}>
                <Box
                  flexShrink="0"
                  p={{ base: '4px', md: 'unset' }}
                  ml={'5px'}
                  alignSelf="baseline"
                  maxWidth="max-content">
                  <StepTitle {...activeStepTitle}>{t(step.title)}</StepTitle>
                </Box>
                {stepperOrientation === 'vertical' && children}
              </VStack>
            )}

            {(index === activeStep || stepperOrientation === 'horizontal') && (
              <StepSeparator
                style={stepperOrientation === 'vertical' ? verticalStyle : {}}
              />
            )}
          </Step>
        ))}
      </Stepper>
    );
  },
);
