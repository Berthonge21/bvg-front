import React from 'react';

export interface ILink {
  icon: React.ComponentType<any>;
  label: string;
  path?: string;
  menuKey?: string;
  subItems?: subItems;
  key?: string;
  viewBox?: string;
}

export type subItems = SimpleSubItem[];

export interface SideBarProps {
  onShowSidebar: () => void;
  showSidebarButton?: boolean;
  sideToggled: boolean;
}

export interface RightMenuProps {
  sideToggled: boolean;
  children?: React.ReactNode;
}

export interface SimpleSubItem {
  label: string;
  path: string;
  permissionSubLink?: string;
  specificModule?: string;
}
