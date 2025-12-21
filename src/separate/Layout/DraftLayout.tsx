import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import type { LayoutProps } from './types';

export const DraftLayout = ({ id, children, ...props }: LayoutProps) => {
  // Directly use props
  const { draftStyle, layoutType, gutter, justify, align, direction } = props;

  const { isOver, setNodeRef } = useDroppable({
    id: `${id}-droppable`,
    data: {
      type: 'Layout',
      accepts: ['Layout', 'Component'],
    }
  });

  // Calculate styles based on layoutType
  const getLayoutStyles = (): React.CSSProperties => {
    // Ensure draftStyle is an object
    const baseStyle = draftStyle || {};
    
    if (layoutType === 'grid') {
      return {
        ...baseStyle,
        display: 'grid',
        // Default grid behavior if not specified, can be enhanced
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

  const containerStyle: React.CSSProperties = {
    ...getLayoutStyles(),
    // Visual feedback for droppable area
    backgroundColor: isOver ? 'rgba(24, 144, 255, 0.1)' : (draftStyle?.backgroundColor || 'transparent'),
    // border: '1px dashed #d9d9d9',
    position: 'relative',
  };

  return (
    <div ref={setNodeRef} style={containerStyle} className="group relative transition-colors">
       {children}
        
       {/* Empty state helper if no children */}
       {(!children || (Array.isArray(children) && children.length === 0)) && (
           <div className="p-4 text-center text-gray-400 text-xs select-none pointer-events-none">
               Drag components here
           </div>
       )}
    </div>
  );
};
