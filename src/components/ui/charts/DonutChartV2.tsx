import React, { memo, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Flex, Text, Box, Center, ResponsiveValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import CustomSkeleton from '../custom-skeleton';
import { sum } from 'lodash';
import { hexToRGB } from '_theme/colors';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import CustomLegend from '_components/charts/customLegend/CustomLegend';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutProps {
  dataChart?: any;
  setPeriodicity: (value: any) => void;
  periodicity: string;
  loader?: boolean;
  currency?: { symbol: string; decimals: number };
  centerText?: string;
  backgroundColors?: string[];
  gradientColors?: string[][];
  tooltipBackgroundColor?: string;
  tooltipTitleFontSize?: number;
  tooltipBodyFontSize?: number;
  title?: string;
  direction?: ResponsiveValue<any>;
}

const DonutChartV2 = memo<DonutProps>(
  ({
    dataChart,
    periodicity,
    centerText,
    setPeriodicity,
    loader,
    currency,
    backgroundColors = ['#1A3C8A', '#e67300'],
    gradientColors = [
      ['rgba(26, 60, 138, 1)', 'rgba(26, 60, 138, 1)'],
      ['rgba(230, 115, 0, 1)', 'rgba(230, 115, 0, 1)'],
    ],
    tooltipBackgroundColor = '#333',
    tooltipTitleFontSize = 12,
    tooltipBodyFontSize = 14,
    title = 'USERS.ACTIVE_INACTIVE_TITLE',
    direction = 'column',
  }) => {
    const { t } = useTranslation();
    const chartRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
      null,
    );

    const sortedData = dataChart?.sort(
      (a: { count: number }, b: { count: number }) => b.count - a.count,
    );

    const data = {
      labels: sortedData?.map((item: { category: any }) => t(item?.category)),
      datasets: [
        {
          data: sortedData?.map((item: { count: any }) => item.count),
          backgroundColor: backgroundColors,
          borderWidth: 0,
        },
      ],
    };

    const createLinearGradient = (colors: string[], ctx: any) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      colors.forEach((color, index) =>
        gradient.addColorStop(index / (colors.length - 1), color),
      );
      return gradient;
    };

    const addBoxShadows = (chart: any) => {
      const { ctx } = chart;
      chart.data.datasets[0].backgroundColor = gradientColors.map(colors =>
        createLinearGradient(colors, ctx),
      );
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

    const options: any = {
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: tooltipBackgroundColor,
          titleFont: { size: tooltipTitleFontSize },
          bodyFont: { size: tooltipBodyFontSize },
          callbacks: {
            label: (tooltipItem: any) => {
              const value = tooltipItem.raw;
              return currency ? `${formatValue(value)}` : value;
            },
          },
        },
      },
      maintainAspectRatio: true,
    };

    const centerTextPlugin = {
      id: 'centerText',
      afterDraw(chart: any) {
        const {
          ctx,
          chartArea: { width, height },
        } = chart;
        ctx.save();

        const total = sum(data.datasets[0].data);
        const displayValue = currency ? `${formatValue(total)}` : total;

        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#1A3C8A';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(displayValue, width / 2, height / 2 + 10);

        if (centerText) {
          ctx.font = 'normal 11px Arial';
          ctx.fillStyle = '#666';
          ctx.fillText(t(centerText), width / 2, height / 2 - 10);
        }
        ctx.restore();
      },
    };

    return (
      <Box
        boxShadow={`0px 0px 50px 0px ${hexToRGB('overlay', 0.1, 500)}`}
        borderRadius="7px"
        borderWidth={2}
        p="20px"
        h="100%">
        <Formik
          enableReinitialize
          initialValues={{ periodicity: periodicity?.toLowerCase() }}
          onSubmit={() => {}}>
          <Form>
            <Flex
              flexDirection={{ base: 'column', md: 'row' }}
              justifyContent="space-between">
              <Text fontSize="17px" fontWeight="bold">
                {t(title)}
              </Text>
            </Flex>
          </Form>
        </Formik>
        {!dataChart || loader ? (
          <CustomSkeleton type={'donutChart'} width={'100%'} height={'100%'} />
        ) : (
          <Flex
            gap={'20px'}
            direction={direction}
            alignItems={'center'}
            justifyContent={'center'}>
            <Center mt={'20px'}>
              <Box width="210px" height="210px" position="relative">
                <Doughnut
                  ref={chartRef}
                  data={data}
                  options={options}
                  plugins={[
                    { id: 'addBoxShadow', beforeDatasetsDraw: addBoxShadows },
                    centerTextPlugin,
                  ]}
                />
              </Box>
            </Center>
            <CustomLegend
              data={data}
              chartRef={chartRef}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              backgroundColors={backgroundColors}
              currency={currency}
            />
          </Flex>
        )}
      </Box>
    );
  },
);

export default DonutChartV2;
