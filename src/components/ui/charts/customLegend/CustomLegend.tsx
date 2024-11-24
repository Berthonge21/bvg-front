import React, { FC } from 'react';
import { Box, Flex, Switch, Text } from '@chakra-ui/react';

interface CustomLegendProps {
  chartRef: any;
  data: any;
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  backgroundColors: string[];
  currency?: { symbol: string; decimals: number };
}

const CustomLegend: FC<CustomLegendProps> = ({
  data,
  chartRef,
  setSelectedCategory,
  backgroundColors,
  currency,
}) => {
  const getColorSchemaByCategory = (color: string) => {
    const colorSchemeMap: { [key: string]: string } = {
      '#1A3C8A': 'primary',
      '#e67300': 'secondary',
      '#FFC107': 'yellow',
      '#4CAF50': 'green',
      '#FF5722': 'red',
      '#9C27B0': 'purple',
      '#009688': 'teal',
    };
    return colorSchemeMap[color] || 'gray';
  };

  const formatValue = (value: number) => {
    if (currency?.symbol) {
      if (currency?.symbol === '$') {
        return `${currency.symbol} ${value.toFixed(currency?.decimals || 3)}`;
      } else {
        return `${value?.toFixed(currency?.decimals || 3)} ${currency.symbol}`;
      }
    }
    return value;
  };

  return (
    <Flex
      width={{ base: '100%', lg: '100%' }}
      direction={'column'}
      gap={'10px'}
      maxH={'18rem'}
      overflowX={'hidden'}
      overflowY={'auto'}
      marginTop={'25px'}
      paddingRight={'12px'}>
      {data.labels?.map((label: string, index: number) => {
        const color = backgroundColors[index];
        const colorScheme = getColorSchemaByCategory(color);
        return (
          <Flex
            key={index}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Flex
              alignItems={'flex-start'}
              justifyContent={'center'}
              gap={'10px'}>
              <Switch
                size="md"
                colorScheme={colorScheme}
                defaultChecked
                color={data.datasets[0].backgroundColor[index]}
                marginRight={'8px'}
                onChange={() => {
                  setSelectedCategory(label);
                  chartRef.current.legend.chart.toggleDataVisibility(index);
                  chartRef.current.legend.chart.update();
                }}
              />
              <Text
                fontSize={'15px'}
                fontWeight={'medium'}
                position={{ base: 'absolute', sm: 'initial' }}
                maxW={'fit-contents'}>
                {label}
              </Text>
            </Flex>
            <Box>
              <Text
                fontSize={'15px'}
                fontWeight={'bold'}
                w={'max-content'}
                position={{ base: 'absolute', sm: 'initial' }}
                insetEnd={'0'}>
                {formatValue(data.datasets[0].data[index])}
              </Text>
            </Box>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default CustomLegend;
