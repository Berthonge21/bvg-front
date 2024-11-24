import { hexToRGB } from '_theme/colors';

const stepStyle = {
  flex: 'inherit',
};

const stepIndicatorStyle = {
  background: `${hexToRGB('primary', 0.25)} !important`,
  color: 'lightGray.200 !important',
  borderRadius: '7px',
  border: 0,
  height: 50,
  width: 50,
  fontSize: '15px',
};
const activeStepIndicatorStyle = {
  background: `${hexToRGB('primary', 1)} !important`,
  borderRadius: '7px',
  border: 0,
  height: 50,
  width: 50,
};

const activeStepTitle = {
  color: 'primary.500',
  fontWeight: 600,
  fontSize: '18px',
};
const inactiveStepTitle = {
  color: 'lightGray.500',
  fontWeight: 900,
};
const stepSeparatorStyle = {
  width: '20px',
  minWidth: '20px',
};
export {
  activeStepTitle,
  inactiveStepTitle,
  stepIndicatorStyle,
  stepSeparatorStyle,
  stepStyle,
  activeStepIndicatorStyle,
};
