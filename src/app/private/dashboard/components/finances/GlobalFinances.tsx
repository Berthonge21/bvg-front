import { Box } from '@chakra-ui/react';
import { cardStyle } from '_theme/cardStyle';
import CustomCard from '_components/card/CustomCard';
import DonutChartV2 from '_components/charts/DonutChartV2';
import React from 'react';

const GlobalFinances = () => {
  const dataChart = [
    { category: 'DONUT_CHART.CATEGORY.SCHOLARSHIP', count: 1500 },
    { category: 'DONUT_CHART.CATEGORY.EXPENSES', count: 700 },
    { category: 'DONUT_CHART.CATEGORY.EXPENSES_MISCELLANEOUS', count: 300 },
    { category: 'DONUT_CHART.CATEGORY.REVENUES', count: 200 },
  ];

  const setPeriodicity = (value: any) => {};

  const currency = {
    symbol: '$',
    decimals: 2,
  };

  const centerText = 'DONUT_CHART.FINANCE_GLOBAL_AMOUNT';

  const backgroundColors = ['#1A3C8A', '#e67300', '#FFC107', '#4CAF50'];
  const gradientColors = [
    ['rgba(26, 60, 138, 1)', 'rgba(104, 140, 232, 1)'],
    ['rgba(230, 115, 0, 1)', 'rgba(255, 160, 63, 1)'],
    ['rgba(255, 193, 7, 1)', 'rgba(255, 223, 130, 1)'],
    ['rgba(76, 175, 80, 1)', 'rgba(144, 238, 144, 1)'],
  ];

  return (
    <Box {...cardStyle}>
      <CustomCard bgColor={'white'} borderRadius={'7px'}>
        <DonutChartV2
          dataChart={dataChart}
          periodicity="Annuellement"
          setPeriodicity={setPeriodicity}
          loader={false}
          currency={currency}
          centerText={centerText}
          title={'DONUT_CHART.FINANCE_INCOMES&OUTCOMES'}
          direction={'row'}
          backgroundColors={backgroundColors}
          gradientColors={gradientColors}
        />
      </CustomCard>
    </Box>
  );
};

export default GlobalFinances;
