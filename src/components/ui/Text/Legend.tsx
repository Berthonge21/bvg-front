import { Flex, Text, Box } from '@chakra-ui/react';
import React, { FunctionComponent } from 'react';
import { hexToRGB } from '_theme/colors';
interface LegendProps {
  titleLegend: string;
  colorLegend: string;
  whiteSpace?: any;
}
const donutCircleStyles = (color: string) => ({
  width: '23px',
  height: '23px',
  background: 'white',
  borderRadius: '50%',
  position: 'relative',
  _after: {
    content: '""',
    width: '10px',
    height: '10px',
    position: 'absolute',
    background: `${hexToRGB(color, 1)}`,
    borderRadius: '50%',
    top: '6.5px',
    insetStart: '6.5px',
    boxShadow: `0 3px 6px ${hexToRGB(color, 0.25)}`,
  },
});

const Legend: FunctionComponent<LegendProps> = ({
  titleLegend,
  whiteSpace = 'normal',
}) => {
  return (
    <Flex me={'30px'}>
      <Text ms="5px" fontSize="fs-16" color="black.500" whiteSpace={whiteSpace}>
        {titleLegend}
      </Text>
    </Flex>
  );
};
export { Legend };
