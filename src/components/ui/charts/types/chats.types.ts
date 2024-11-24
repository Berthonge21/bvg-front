import React from 'react';
import { TYPES } from '_store/src';

export interface BarChartProps {
  loader?: boolean;
  dataChart?: any;
  color: string[];
  cycle?: string;
  dedicatedTo?: string;
  setCycle?: (value: TYPES.ENUMS.SCHOOL_CYCLE.CycleType) => void;
  currency?: string;
  decimal?: number;
}
export interface CustomLegendProps {
  chartRef: any;
  data: any;
  dedicatedTo?: string;
  selectedCycle?: string | null;
  setSelectedCycle: React.Dispatch<React.SetStateAction<string | null>>;
}
