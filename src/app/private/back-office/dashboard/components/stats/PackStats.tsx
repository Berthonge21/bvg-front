import React, { useEffect } from 'react';
import CustomCard from '_components/card/CustomCard';
import { Box } from '@chakra-ui/react';
import BarChart from '_components/charts/BarChart';
import { cardStyle } from '_theme/cardStyle';
import { useDispatch, useSelector } from 'react-redux';
import { PacksModule, UsersModule } from '_store/src/modules';
import { generateMonthlyData } from '_app/utils/generate.months.utils';
import { useTranslation } from 'react-i18next';

const PackStats = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { userStats, isLoadingStats } = useSelector(
    UsersModule.selectors.usersSelector,
  );
  const { entityPacks } = useSelector(PacksModule.selectors.packsSelector);

  useEffect(() => {
    dispatch(UsersModule.actions.usersStatsRequestAction());
  }, []);

  const createPackNameMapping = (packs: any[]) => {
    return packs?.reduce((acc, pack) => {
      acc[pack.id] = pack.name;
      return acc;
    }, {});
  };

  const formatDataForChart = () => {
    if (!userStats || userStats?.length === 0) return [];

    const monthlyPackCounts: any = {};
    const months = generateMonthlyData();
    const packNameMapping = createPackNameMapping(entityPacks?.content || []);

    months?.forEach(month => {
      monthlyPackCounts[month] = {
        BASIC: 0,
        STANDARD: 0,
        PREMIUM: 0,
        NO_PACK: 0,
      };
    });

    userStats.forEach((user: any) => {
      const { packId, numberOfUsers } = user;

      if (typeof numberOfUsers !== 'number' || numberOfUsers < 0) {
        console.warn(`Invalid numberOfUsers for user: ${user}`);
        return;
      }

      const packName = packNameMapping[packId] || 'NO_PACK';
      const month = t('BAR_CHART.MONTHS.' + user.month);

      if (monthlyPackCounts[month]) {
        monthlyPackCounts[month][packName] += numberOfUsers;
      }
    });

    return months.map(month => ({
      month,
      packs: Object?.values(monthlyPackCounts[month]),
    }));
  };

  const dataChart = formatDataForChart();
  const chartData = dataChart.map(item => ({
    date: item.month,
    values: {
      BASIC: item.packs[0],
      STANDARD: item.packs[1],
      PREMIUM: item.packs[2],
      NO_PACK: item.packs[3],
    },
  }));

  const colors = ['#2563EB', '#38BDF8', '#DBEAFE'];

  return (
    <Box {...cardStyle}>
      <CustomCard bgColor={'white'} borderRadius={'7px'} padding={'3'}>
        <BarChart
          dataChart={chartData}
          loader={isLoadingStats}
          color={colors}
          dedicatedTo={'subscription'}
        />
      </CustomCard>
    </Box>
  );
};

export default PackStats;
