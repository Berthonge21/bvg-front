'use client';

import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import CustomCard from '_components/card/CustomCard';
import BarChart from '_components/charts/BarChart';
import { cardStyle } from '_theme/cardStyle';
import { generateMonthlyData } from '_app/utils/generate.months.utils';
import { TYPES } from '_store/src';
const StudentFinances = () => {
  const [cycle, setCycle] =
    useState<TYPES.ENUMS.SCHOOL_CYCLE.CycleType>('PRIMARY');

  const generateCycleData = (cycle: TYPES.ENUMS.SCHOOL_CYCLE.CycleType) => {
    switch (cycle) {
      case 'PRIMARY':
        return generateMonthlyData().map(month => ({
          month,
          values: {
            EXPECTED_AMOUNT: Math.floor(Math.random() * 1000) + 500,
            RECEIVED_AMOUNT: Math.floor(Math.random() * 800) + 200,
            REMAINING_AMOUNT: Math.floor(Math.random() * 200) + 50,
          },
        }));
      case 'SECONDARY':
        return generateMonthlyData().map(month => ({
          month,
          values: {
            EXPECTED_AMOUNT: Math.floor(Math.random() * 1200) + 600,
            RECEIVED_AMOUNT: Math.floor(Math.random() * 1000) + 300,
            REMAINING_AMOUNT: Math.floor(Math.random() * 300) + 100,
          },
        }));
      case 'HIGHER_SECONDARY':
        return generateMonthlyData().map(month => ({
          month,
          values: {
            EXPECTED_AMOUNT: Math.floor(Math.random() * 1500) + 700,
            RECEIVED_AMOUNT: Math.floor(Math.random() * 1200) + 400,
            REMAINING_AMOUNT: Math.floor(Math.random() * 400) + 200,
          },
        }));
      default:
        return [];
    }
  };

  const formatData = generateCycleData(cycle);

  const chartData = formatData?.map(item => ({
    date: item.month,
    values: {
      EXPECTED_AMOUNT: item.values.EXPECTED_AMOUNT,
      RECEIVED_AMOUNT: item.values.RECEIVED_AMOUNT,
      REMAINING_AMOUNT: item.values.REMAINING_AMOUNT,
    },
  }));

  const colors = ['#2563EB', '#38BDF8', '#DBEAFE'];

  return (
    <Box {...cardStyle}>
      <CustomCard bgColor={'white'} borderRadius={'7px'} padding={'3'}>
        <BarChart
          dataChart={chartData}
          color={colors}
          loader={false}
          setCycle={setCycle}
          cycle={cycle}
          dedicatedTo={'cycle'}
          currency={'$'}
        />
      </CustomCard>
    </Box>
  );
};

export default StudentFinances;
