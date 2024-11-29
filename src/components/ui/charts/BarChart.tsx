import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Plugin,
  ChartData,
  TooltipItem,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box, Center, Flex, Switch, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import CustomSkeleton from '../custom-skeleton';
import { extractArrays, getColorSchemaByCategory } from './utils/charts.utils';
import { BarChartProps, CustomLegendProps } from './types/chats.types';
import { Formik } from 'formik';
import { FullDropdown } from '_components/dropdown/components/FullDropDown';
import NoDataFound from '_components/no-data-found/NoDataFound';
import { TYPES } from '_/store/src';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type FormatData = {
  date: string[];
  values: Record<string, number[]>;
  maxValues?: Record<string, number>;
};

const CustomLegend: FC<CustomLegendProps> = ({
  data,
  chartRef,
  setSelectedCycle,
}) => {
  return (
    <Flex direction="row" justifyContent={'center'} gap={'100px'}>
      {data.datasets.map(
        (label: { backgroundColor: string; label: string }, index: number) => (
          <Flex key={index} alignItems="center" mb={2} cursor="pointer">
            <Switch
              size="md"
              colorScheme={getColorSchemaByCategory(label.backgroundColor)}
              defaultChecked={true}
              color={label.backgroundColor}
              marginRight={2}
              onChange={event => {
                setSelectedCycle(label.label);
                if (chartRef.current?.legend?.legendItems[index]) {
                  chartRef.current.setDatasetVisibility(
                    index,
                    event.target.checked,
                  );
                  chartRef.current.update();
                }
              }}
            />
            <Text>{label.label}</Text>
          </Flex>
        ),
      )}
    </Flex>
  );
};

const BarChart: FC<BarChartProps> = ({
  dataChart,
  loader,
  color,
  cycle,
  setCycle,
  dedicatedTo,
  currency,
  decimal = 3,
}) => {
  const [selectedCycle, setSelectedCycle] = useState<string | null>(null);
  const chartRef = useRef<ChartJS<'bar'> | null>(null);
  const { t } = useTranslation();
  const [formatData, setFormatData] = useState<FormatData>({
    date: [],
    values: {},
  });

  useEffect(() => {
    if (dataChart) {
      setFormatData(extractArrays(dataChart));
    }
  }, [dataChart]);

  const getTranslatedLabel = (data: string[] = []) => {
    return data;
  };

  const data: ChartData<'bar'> = {
    labels: getTranslatedLabel(formatData.date),
    datasets: Object.keys(formatData.values).map((key, index) => ({
      label: t('BAR_CHART.' + key.toUpperCase()),
      data: formatData.values[key],
      backgroundColor: color[index % color.length],
      stack: `Stack ${index}`,
      borderRadius: 5,
    })),
  };

  const options: ChartOptions<'bar'> = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'bar'>) {
            const value = context.raw as number;
            let formattedValue;
            if (currency && decimal) {
              if (currency === '$') {
                formattedValue = `$${value.toFixed(decimal)}`;
              } else {
                formattedValue = `${value.toFixed(decimal)} ${currency}`;
              }
            } else {
              formattedValue = `${value}`;
            }
            return `${context.dataset.label}: ${formattedValue}`;
          },
        },
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    animation: {
      duration: 400,
    },
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        stacked: false,
        border: {
          display: false,
        },
        grid: {
          display: false,
          offset: true,
        },
      },
      y: {
        display: true,
        ticks: {
          stepSize: Math.ceil(
            Math.max(
              ...Object.keys(formatData.maxValues ?? {}).map(
                key => formatData.maxValues?.[key] ?? 0,
              ),
            ) / 5,
          ),
        },
        stacked: true,
        border: {
          display: false,
        },
      },
    },
  };

  const hoverSegment: Plugin<'bar'> = {
    id: 'hoverSegment',
    beforeDatasetsDraw: chart => {
      const {
        data,
        ctx,
        tooltip,
        chartArea: { top, height },
        scales: { x },
      } = chart;

      ctx.save();

      const segmentWidth = x.width / (data.labels?.length ?? 1) - 20;

      if (tooltip && Array.isArray(tooltip.active) && tooltip.active[0]) {
        const activeElement = tooltip.active[0];
        const xCoor =
          x.getPixelForValue(activeElement.index) - segmentWidth / 2;
        const gradient = ctx.createLinearGradient(
          xCoor,
          top,
          xCoor + segmentWidth,
          top,
        );
        gradient.addColorStop(0, 'rgba(6, 82, 76, 0.2)');
        gradient.addColorStop(1, 'rgba(6, 82, 76, 1)');
        ctx.fillStyle = gradient;
        ctx.fillRect(xCoor, top, 50, height);
      }

      ctx.restore();
    },
  };

  return (
    <Box minH={'100%'}>
      <Formik
        enableReinitialize
        initialValues={{ cycle: cycle?.toUpperCase() }}
        onSubmit={() => {}}>
        {({ values, setFieldValue }) => (
          <Flex
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            flexWrap={'wrap'}>
            <Text
              color={'overlay.500'}
              pe={'15px'}
              pb={'7px'}
              lineHeight={'20.4px'}
              fontSize={'17px'}
              fontWeight={900}>
              {dedicatedTo !== 'subscription'
                ? t('BAR_CHART.FINANCE_BY_CYCLE')
                : t('BAR_CHART.PACKS_MOVEMENTS')}
            </Text>
            {dedicatedTo !== 'subscription' && setCycle && (
              <Box width={'100%'} maxW={'200px'}>
                <FullDropdown
                  name={'cycle'}
                  listItems={TYPES.CONSTANTS.COMMON.cycleOptions}
                  placeholder={'BAR_CHART.CYCLE'}
                  setFieldValue={setFieldValue}
                  selectedValue={values?.cycle}
                  bindItemLabel={'label'}
                  bindItemValue={'value'}
                  onChangeFunc={values => {
                    if (values) {
                      setCycle(
                        values?.value?.toUpperCase() as TYPES.ENUMS.SCHOOL_CYCLE.CycleType,
                      );
                    }
                  }}
                />
              </Box>
            )}
          </Flex>
        )}
      </Formik>

      {!dataChart || loader ? (
        <CustomSkeleton type={'barChart'} width={'100%'} height={'250px'} />
      ) : (
        <Box height={'100%'}>
          <Box width={'100%'} minH={'250px'} mt={'30px'} mb={'30px'}>
            {Math.max(...Object?.values(formatData?.maxValues || {})) === 0 ? (
              <NoDataFound />
            ) : (
              <Bar
                ref={chartRef}
                data={data}
                options={options}
                plugins={[hoverSegment]}
              />
            )}
          </Box>
          <Center mt={'20px'}>
            <Flex py={'10px'}>
              {Math.max(...Object?.values(formatData.maxValues || {})) > 0 && (
                <CustomLegend
                  chartRef={chartRef}
                  data={data}
                  dedicatedTo={dedicatedTo}
                  selectedCycle={selectedCycle}
                  setSelectedCycle={setSelectedCycle}
                />
              )}
            </Flex>
          </Center>
        </Box>
      )}
    </Box>
  );
};

export default BarChart;
