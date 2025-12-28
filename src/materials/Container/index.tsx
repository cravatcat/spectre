import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import type { BaseMaterialProps } from '../../editor/core/types';

export interface ContainerProps extends BaseMaterialProps {
  layoutType?: 'flex';
  gutter?: [number, number];
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around';
  align?: 'stretch' | 'flex-start' | 'center' | 'flex-end';
  direction?: 'row' | 'column';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  style,
  justify,
  align,
  direction,
  className,
  ...rest
}) => {
  
  const directionClass = direction === 'column' ? 'flex-col' : 'flex-row';
  
  const justifyClass = justify ? {
    'start': 'justify-start',
    'end': 'justify-end',
    'center': 'justify-center',
    'space-between': 'justify-between',
    'space-around': 'justify-around',
  }[justify] : undefined;

  const alignClass = align ? {
    'stretch': 'items-stretch',
    'flex-start': 'items-start',
    'center': 'items-center',
    'flex-end': 'items-end',
  }[align] : undefined;

  return (
    <div 
      className={twMerge(
        clsx(
          'flex box-border overflow-auto',
          directionClass,
          justifyClass,
          alignClass,
          className
        )
      )}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};
