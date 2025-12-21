import React from 'react';

export interface LayoutProps {
  id?: string;
  layoutType?: 'grid' | 'flex';
  gutter?: [number, number];
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around';
  align?: 'top' | 'middle' | 'bottom';
  direction?: 'row' | 'column';
  style?: React.CSSProperties;
  draftStyle?: React.CSSProperties;
  children?: React.ReactNode;
  [key: string]: unknown;
}
