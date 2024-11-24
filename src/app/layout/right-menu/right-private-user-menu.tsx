import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import HelpCenter from '_components/widgets/helpCenter/HelpCenter';
import SocialMedia from '_components/widgets/SocialMedia/SocialMedia';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import './date.css';
import { startOfToday } from 'date-fns';
import UserWidget from '_components/widgets/users/userWidget';
import { Box } from '@chakra-ui/react';

const RightPrivateUserMenu = () => {
  const today = startOfToday();
  return (
    <Grid
      templateColumns={{ base: '4fr', sm: 'repeat(4, 1fr)', xl: '4fr' }}
      gridColumnGap="10px"
      gridRowGap="0">
      <GridItem rowSpan={1} colSpan={{ base: 4, sm: 2, xl: 4 }} order={1}>
        <HelpCenter />
      </GridItem>
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
        mb={'22px'}>
        <UserWidget />
      </GridItem>
      <GridItem rowSpan={1} colSpan={4} order={6} mb={'22px'}>
        <SocialMedia />
      </GridItem>
    </Grid>
  );
};

export default RightPrivateUserMenu;
