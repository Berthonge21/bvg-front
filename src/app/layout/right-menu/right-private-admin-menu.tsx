import React, { useEffect } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import './date.css';
import DonutChartV2 from '_components/charts/DonutChartV2';
import { Box } from '@chakra-ui/react';
import { startOfToday } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { UsersModule } from '_store/src/modules';

const RightPrivateAdminMenu = () => {
  const today = startOfToday();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { activeInactive, isLoadingActiveInactiveCount } = useSelector(
    UsersModule.selectors.usersSelector,
  );

  useEffect(() => {
    if (
      activeInactive?.activeUsers === 0 ||
      activeInactive?.inactiveUsers === 0
    ) {
      dispatch(UsersModule.actions.usersActiveInactiveCountRequestAction());
    }
  }, [activeInactive?.activeUsers, activeInactive?.inactiveUsers]);

  const userData = [
    { category: t('USERS.ACTIVE'), count: activeInactive?.activeUsers },
    { category: t('USERS.INACTIVE'), count: activeInactive?.inactiveUsers },
  ];

  return (
    <Grid
      templateColumns={{ base: '4fr', sm: 'repeat(4, 1fr)', xl: '4fr' }}
      gridColumnGap="10px"
      gridRowGap="0">
      <GridItem rowSpan={1} colSpan={{ base: 4, sm: 2, xl: 4 }} order={2}>
        <Box
          width={'100%'}
          bgColor={'white'}
          p={'10px'}
          borderRadius={7}
          boxShadow={'0 0 4px rgba(0, 0, 0, 0.25)'}>
          <DayPicker
            mode="single"
            selected={today}
            onSelect={() => {}}
            showOutsideDays
            className="dayPicker"
          />
        </Box>
      </GridItem>
      <GridItem
        rowSpan={1}
        colSpan={{ base: 4, sm: 2, xl: 4 }}
        order={4}
        mt={'22px'}>
        <DonutChartV2
          dataChart={userData}
          periodicity="Annuellement"
          setPeriodicity={() => {}}
          loader={isLoadingActiveInactiveCount}
          centerText={'USERS.TOTAL_ACTIVE_&_INACTIVE'}
        />
      </GridItem>
    </Grid>
  );
};

export default RightPrivateAdminMenu;
