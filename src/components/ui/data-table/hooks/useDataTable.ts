import { ColorStatusBoder } from '../constants/data-table.constant';
import { hexToRGB } from '_theme/colors';

export const useDataTable = () => {
  const getBorderColor = (
    status: ColorStatusBoder = 'DEFAULT',
    legendList: any,
  ) => {
    if (legendList) {
      return hexToRGB(
        legendList.find((item: any) => item.key.includes(status))?.color ||
          'primary',
      );
    } else {
      switch (status) {
        case 'OPENED':
        case 'PENDING':
          return '#ff3b3b';
        case 'FINISHED':
        case 'CONFIGURED':
          return '#1cc577';
        case 'SUSPENDED':
          return '#49C4E9';
        default:
          return '#ffff';
      }
    }
  };

  return { getBorderColor };
};
