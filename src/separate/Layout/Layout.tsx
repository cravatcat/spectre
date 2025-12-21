import React from 'react';
import type { LayoutProps } from './types';

export const Layout = ({ children, ...props }: LayoutProps) => {
  // Use 'style' instead of 'draftStyle', ignore 'draftStyle'
  const { style, layoutType, gutter, justify, align, direction } = props;

  const getLayoutStyles = (): React.CSSProperties => {
    const baseStyle = style || {};
    
    if (layoutType === 'grid') {
      return {
        ...baseStyle,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', 
        gap: gutter ? `${gutter[1]}px ${gutter[0]}px` : '16px',
      };
    } else {
      // Flex
      return {
        ...baseStyle,
        display: 'flex',
        flexDirection: direction || 'row',
        justifyContent: justify || 'flex-start',
        alignItems: align || 'flex-start',
      };
    }
  };

  return (
    <div style={getLayoutStyles()}>
       {children}
    </div>
  );
};
