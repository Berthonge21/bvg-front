import { Box, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import CustomCard from '_components/card/CustomCard';
import { cardStyle } from '_theme/cardStyle';
import { Colors } from '_theme/variables';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { UsersModule } from '_store/src/modules';
import { generateMonthlyData } from '_app/utils/generate.months.utils';
import LineChart from '_components/charts/LineChart';
import CustomSkeleton from '_components/custom-skeleton';
import { LoaderType } from '_components/custom-skeleton/CustomSkeleton';

const SchoolStats = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { schoolStats, isSchoolStatsLoading } = useSelector(
    UsersModule.selectors.usersSelector,
  );

  useEffect(() => {
    dispatch(UsersModule.actions.usersStatsSchoolsAction());
  }, [dispatch]);

  const formatDataForChart = data => {
    const months = generateMonthlyData();
    const counts = Array(12).fill(0);

    data?.forEach(item => {
      const monthIndex = months?.indexOf(t('BAR_CHART.MONTHS.' + item.month));
      if (monthIndex !== -1) {
        counts[monthIndex] = item?.numberOfSchools;
      }
    });

    return {
      labels: months,
      datasets: [
        {
          label: t('BAR_CHART.NUMBER_OF_SCHOOLS_BY_MONTH'),
          data: counts,
          backgroundColor: '#2563EB',
          borderColor: '#2563EB',
          borderWidth: 1,
          tension: 0.4,
          pointRadius: 1.5,
          pointBackgroundColor: Colors.secondary,
          fill: true,
        },
      ],
    };
  };

  const chartData = formatDataForChart(schoolStats);

  return (
    <Box {...cardStyle}>
      <CustomCard bgColor={'white'} borderRadius={'7px'} padding={'3'}>
        {isSchoolStatsLoading ? (
          <CustomSkeleton
            type={LoaderType.LINE_CHART}
            width={'100%'}
            height={'250px'}
          />
        ) : (
          <>
            <Box mb={'30px'} mt={'30px'}>
              <Text
                color={'overlay.500'}
                pe={'15px'}
                pb={'7px'}
                lineHeight={'20.4px'}
                fontSize={'17px'}
                fontWeight={900}
                textAlign={'start'}>
                {t('BAR_CHART.SCHOOLS')}
              </Text>
            </Box>
            <LineChart data={chartData} />
          </>
        )}
      </CustomCard>
    </Box>
  );
};

export default SchoolStats;
