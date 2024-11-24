// ! IMPORTANT: default color must be 500.

import { theme } from '@chakra-ui/react';

const colors: {
  [color: string]: { [opacity: number]: string } | string;
} = {
  ...theme.colors,
  primary: {
    50: '#ebebff',
    100: '#c5c6f1',
    200: '#9e9fe1',
    300: '#7979d3',
    400: '#5353c6',
    500: '#1A3C8A',
    600: '#2c2d87',
    700: '#1f2062',
    800: '#11123c',
    900: '#05051a',
  },
  secondary: {
    50: '#fff1da',
    100: '#ffd8ae',
    200: '#ffbf7d',
    300: '#ffa64c',
    400: '#ff8c1a',
    500: '#F6A724',
    600: '#b45900',
    700: '#813f00',
    800: '#4f2500',
    900: '#200b00',
  },
  red: {
    500: '#FF0000',
  },
  badgeGreen: {
    500: '#EBF9F1',
  },
  badgeYellow: {
    500: '#FEF2E5',
  },
  lightGray: {
    200: '#C2C7CA',
    500: '#C2C7CA',
    600: '#CACFD2',
    700: '#DEE2E4',
    800: '#EDEEEF',
  },
  overlay: {
    500: '#333333',
  },
  light: {
    500: '#D8D8E4',
  },
  lighter: {
    500: '#C7C7D2',
  },
  shadowColor: {
    500: '#0B0051',
  },
  keyboardShadow: {
    500: '#4B7DE1',
  },
  packBasicColor: {
    500: '#2563EB',
  },
  packStandardColor: {
    500: '#38BDF8',
  },
  packProColor: {
    500: '#DBEAFE',
  },
  barChatComColor: {
    500: '#06524C',
  },
  secondTest: {
    500: '#EDEDFF',
  },
};

/**
 * Get the color with the specified opacity.
 * The color in the theme.
 * The opacity value (0 to 100).
 * @returns The RGBA color string with the specified opacity.
 */
const hexToRGB = (color: string, alpha?: number, op?: number) => {
  const hex = getColor(color, op);
  const r = parseInt(hex?.slice(1, 3), 16);
  const g = parseInt(hex?.slice(3, 5), 16);
  const b = parseInt(hex?.slice(5, 7), 16);

  return `rgba(${r},${g},${b}${alpha ? `, ${alpha}` : ''})`;
};

const getColor = (color = 'primary', opacity = 500) => colors[color]?.[opacity];

export { colors, hexToRGB, getColor };
