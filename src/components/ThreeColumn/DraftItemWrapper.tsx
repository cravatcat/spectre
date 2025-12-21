import React from 'react';
import { GripVertical, Trash2, Settings } from 'lucide-react';
import { Drawer, Popconfirm } from 'antd';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useCanvasStore } from '../../store/useCanvasStore';

interface DraftItemWrapperProps {
  id: string;
  children: React.ReactNode;
  itemName?: string;
  formComponent?: React.ComponentType<any>;
  initialValues?: any;
  onUpdate?: (values: any) => void;
}

export const DraftItemWrapper: React.FC<DraftItemWrapperProps> = ({ 
  id,
  children, 
  itemName,
  formComponent: FormComponent,
  initialValues,
  onUpdate
}) => {
  const activeDrawerId = useCanvasStore((state) => state.activeDrawerId);
  const setActiveDrawerId = useCanvasStore((state) => state.setActiveDrawerId);
  const removeItem = useCanvasStore((state) => state.removeItem);
  
  const isDrawerOpen = activeDrawerId === id;
  const setIsDrawerOpen = (open: boolean) => {
    setActiveDrawerId(open ? id : null);
  };
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="relative group w-full p-3" // Added padding
    >
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Hover Overlay - Positioned absolutely to not affect layout */}
      {/* Adjusted to respect padding? No, inset-0 covers padding. 
          If we want overlay to only cover content, we need another wrapper. 
          But covering everything is fine for selection. 
          Let's make it a dashed border by default to show boundaries.
      */}
      <div className="absolute inset-0 z-0 pointer-events-none border border-dashed border-gray-200 group-hover:border-blue-500 group-hover:border-2 group-hover:border-solid rounded-lg transition-all duration-200" />

      {/* Toolbar - Only visible on hover */}
      {/* Moved inside to top-0 right-2 (within padding area) */}
      <div className="absolute top-0 right-2 z-30 flex opacity-0 group-hover:opacity-100 transition-all duration-200 transform -translate-y-1/2 group-hover:translate-y-0">
        <div className="bg-blue-600 text-white text-xs rounded-md shadow-lg flex items-center overflow-hidden">
          {/* Component Name */}
          <div 
            className="px-2 py-1 bg-blue-700 font-medium select-none flex items-center gap-1 border-r border-blue-500 cursor-grab active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
             <GripVertical size={12} className="opacity-50" />
             {itemName || 'Component'}
          </div>

          {/* Actions */}
          <div className="flex items-center px-1">
            <button 
              className="p-1 hover:bg-blue-500 rounded transition-colors" 
              title="Settings"
              onClick={() => setIsDrawerOpen(true)}
            >
              <Settings size={14} />
            </button>
            <Popconfirm
              title="Delete Component"
              description="Are you sure you want to delete this component?"
              onConfirm={() => removeItem(id)}
              okText="Yes"
              cancelText="No"
              placement="bottomRight"
            >
              <button 
                className="p-1 hover:bg-red-500 rounded transition-colors" 
                title="Delete"
                onMouseDown={(e) => e.stopPropagation()} // Prevent drag start
              >
                <Trash2 size={14} />
              </button>
            </Popconfirm>
          </div>
        </div>
      </div>

      {/* Settings Drawer */}
      <Drawer
        title={`Settings - ${itemName || 'Component'}`}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        destroyOnHidden
        mask={false} 
      >
        {FormComponent ? (
          <FormComponent
            initialValues={initialValues}
            onValuesChange={(_: any, allValues: any) => onUpdate?.(allValues)}
          />
        ) : (
          <div className="text-gray-400 text-center mt-10">
            No settings available for this component.
          </div>
        )}
      </Drawer>
    </div>
  );
};
