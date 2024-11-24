import { Checkbox, Flex, Icon, IconButton, useTheme } from '@chakra-ui/react';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import Menu from '../../menu';
import MenuButton from '../../menu-button';
import MenuItem from '../../menu-item';
import MenuList from '../../menu-list';
import {
  CheckCircle,
  ShutDownIcon,
  Eye,
  PencilIcon,
  TrashIcon,
} from '_assets/svg';
import { ArrowDownIcon } from '@chakra-ui/icons';
import CustomTooltip from '_components/CustomTooltip/CustomTooltip';
import { BiMoney } from 'react-icons/bi';

export interface ActionProps {
  name: string | ((data?: any) => string);
  titleIcon?: string;
  handleClick: (data: any) => void;
  isDisabled?: (data: any) => boolean;
  isShown?: boolean | ((data: any) => boolean);
  showConfirmationModal?: boolean;
  title?: string;
  viewBox?: string;
  isChecked?: (data: any) => boolean;
}

const colors = [
  {
    name: 'edit',
    icon: PencilIcon,
    color: 'primary',
    opacity: '500',
  },
  {
    name: 'activate',
    icon: CheckCircle,
    color: 'primary',
    opacity: '500',
  },
  {
    name: 'deactivate',
    icon: ShutDownIcon,
    color: 'primary',
    opacity: '500',
  },
  {
    name: 'view',
    icon: Eye,
    color: 'green',
    opacity: '500',
  },
  {
    name: 'delete',
    icon: TrashIcon,
    color: 'red',
    opacity: '500',
  },
  {
    name: 'pay',
    icon: BiMoney,
    color: 'secondary',
    opacity: '500',
  },
];

const getActionProps = (type: any) => {
  const selectedAction = colors?.filter(
    color => type?.toLowerCase() === color?.name?.toLowerCase(),
  )[0];
  return selectedAction ?? {};
};

const ActionButtons = memo(
  ({
    uniqueIdentifier,
    actions,
    data,
  }: {
    uniqueIdentifier: string;
    actions: ActionProps[];
    data: any;
  }) => {
    const theme = useTheme();
    const { t } = useTranslation();

    const getFillColor = (action: any) => {
      const selectedAction = colors.find(color => color.name === action.name);

      if (selectedAction) {
        const fillColor = selectedAction.color;
        const opacity = selectedAction.opacity;

        if (fillColor && opacity) {
          return theme.colors[fillColor]?.[opacity] || 'primary.500';
        }
      }

      return 'primary.500';
    };

    const getIcon = (action: any) => {
      const IconComponent = getActionProps(
        typeof action?.name === 'string' ? action?.name : action?.name(data),
      ).icon;

      return IconComponent ? (
        <Icon as={IconComponent} boxSize={5} color={getFillColor(action)} />
      ) : (
        <Icon as={ArrowDownIcon} boxSize={5} color={getFillColor(action)} />
      );
    };

    return (
      <Flex gap={2} alignItems={'center'}>
        {actions?.map(
          ({ isShown = true, ...action }, index: number) =>
            isShown &&
            (action?.name === 'more' ? (
              <Menu
                key={action.name && index}
                autoSelect={false}
                placement="bottom-end">
                <MenuButton>
                  <IconButton
                    aria-label={action?.name}
                    width={'42px'}
                    minW={'42px'}
                    height={'42px'}
                  />
                </MenuButton>
                <MenuList>
                  {['Import', 'Export', 'Print'].map(item => (
                    <MenuItem key={item} onClick={() => {}}>
                      {item}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            ) : action?.name === 'select' ? (
              <React.Fragment key={`key-${action.name}`}>
                <Checkbox
                  backgroundColor={'white'}
                  borderColor={'rgba(57, 56, 58, 0.3)'}
                  isChecked={action?.isChecked && action?.isChecked(data)}
                  onChange={e => {
                    action?.handleClick({ data, status: e.target.checked });
                  }}
                />
              </React.Fragment>
            ) : (
              <React.Fragment key={`key-${action.name}`}>
                <CustomTooltip
                  label={
                    action.title
                      ? t(`ACTION_BUTTON.${action?.title?.toUpperCase()}`)
                      : typeof action?.name === 'string'
                        ? t(`ACTION_BUTTON.${action?.name?.toUpperCase()}`)
                        : t(
                            `ACTION_BUTTON.${action?.name(data)?.toUpperCase()}`,
                          )
                  }
                  key={`${action.name}+${data[uniqueIdentifier]}`}>
                  <IconButton
                    position={'unset'}
                    borderRadius={'7px'}
                    aria-label={
                      typeof action?.name === 'string'
                        ? action?.name
                        : action?.name(data)
                    }
                    width={'42px'}
                    minW={'42px'}
                    height={'42px'}
                    bg={'transparent'}
                    _hover={{ backgroundColor: 'none' }}
                    onClick={() => action?.handleClick(data)}
                    isDisabled={
                      action?.isDisabled ? action?.isDisabled(data) : false
                    }
                    icon={getIcon(action)}
                  />
                </CustomTooltip>
              </React.Fragment>
            )),
        )}
      </Flex>
    );
  },
);

export default ActionButtons;
