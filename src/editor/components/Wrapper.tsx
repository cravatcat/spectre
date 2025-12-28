import React, { useState } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Popover, Popconfirm } from 'antd';
import { Resizable } from 're-resizable';
import { useEditorStore } from '../core/store';
import { registry } from '../core/registry';
import type { ComponentNode } from '../core/types';
import clsx from 'clsx';

export interface EditorWrapperProps {
  node: ComponentNode;
  children: React.ReactNode;
}

export const EditorWrapper: React.FC<EditorWrapperProps> = ({
  children,
  node
}) => {
  const selectComponent = useEditorStore((state) => state.selectComponent);
  const addChild = useEditorStore((state) => state.addChild);
  const removeComponent = useEditorStore((state) => state.removeComponent);
  const updateProps = useEditorStore((state) => state.updateProps);
  const selectedId = useEditorStore((state) => state.selectedId);
  const [open, setOpen] = useState(false);
  
  // Use a ref to track resizing state to avoid re-renders
  const isResizingRef = React.useRef(false);

  const def = registry.get(node.type);
  const whitelist = def?.behavior?.whitelist || [];
  const isSelected = selectedId === node.id;
  const isRoot = !node.parentId;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectComponent(node.id);
  };

  const handleAdd = (type: string) => {
    addChild(node.id, type);
    setOpen(false);
  };

  const handleDelete = () => {
    removeComponent(node.id);
  };

  const handleResizeStart = (e: any, _direction: string, ref: HTMLElement) => {
    e.stopPropagation();
    isResizingRef.current = true;
    
    // Capture current computed dimensions
    const width = ref.offsetWidth;
    const height = ref.offsetHeight;

    // Immediately lock size to pixel values to prevent jump from 'auto'/'flex'
    ref.style.width = `${width}px`;
    ref.style.height = `${height}px`;
    ref.style.flex = 'none';
  };

  const handleResizeStop = (_e: any, _direction: string, ref: HTMLElement) => {
    isResizingRef.current = false;
    updateProps(node.id, {
      style: {
        width: ref.style.width,
        height: ref.style.height,
        flex: 'none', // Persist flex: none
      }
    });
  };

  const content = (
    <div className="min-w-[120px]">
      {whitelist.length > 0 ? (
        whitelist.map((item: string) => (
          <div
            key={item}
            onClick={() => handleAdd(item)}
            className="cursor-pointer px-3 py-2 hover:bg-gray-100 text-sm transition-colors rounded-sm"
          >
            {item}
          </div>
        ))
      ) : (
        <div className="px-3 py-2 text-gray-400 text-sm">No components available</div>
      )}
    </div>
  );

  // Merge dynamic styles with base editor styles
  const dynamicStyle: React.CSSProperties = {
    flex: node.style?.flex,
    ...node.style,
    padding: undefined, // Let the inner component handle padding
    position: 'relative', // Ensure positioning context
  };

  // Common props for both root (div) and non-root (Resizable)
  const commonClassNames = clsx(
    'relative flex flex-col min-h-[50px] transition-colors duration-200 box-border group outline-offset-[-1px]',
    isRoot ? 'h-full w-full' : 'm-[2px]',
    !isRoot && (isSelected 
      ? 'outline outline-2 outline-blue-500 z-10' 
      : 'outline outline-1 outline-dashed outline-gray-300 hover:outline-blue-300')
  );

  const renderToolbar = () => (
    <>
      {/* Top Right Toolbar: Name & Delete */}
      {isSelected && (
        <div 
          className="absolute top-0 right-0 z-[999] flex items-center h-6 pl-2 pr-1 bg-blue-500 text-[11px] text-white shadow-sm pointer-events-auto rounded-bl"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="font-medium select-none mr-1">{node.type}</span>
          {!isRoot && (
            <>
              <div className="w-px h-3 bg-blue-400 mx-1" />
              <Popconfirm
                title="Delete?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
                placement="bottomRight"
              >
                <div className="cursor-pointer hover:text-red-200 transition-colors flex items-center">
                  <DeleteOutlined />
                </div>
              </Popconfirm>
            </>
          )}
        </div>
      )}

      {/* Bottom Right Toolbar: Quick Add */}
      {isSelected && whitelist.length > 0 && (
        <div 
          className="absolute bottom-0 right-0 z-999 flex items-center justify-center w-6 h-6 bg-blue-500 text-white shadow-sm pointer-events-auto rounded-tl hover:bg-blue-600 transition-colors"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <Popover
            content={content}
            title="Add Component"
            trigger="click"
            open={open}
            onOpenChange={setOpen}
            placement="topRight"
          >
            <div className="flex items-center justify-center w-full h-full cursor-pointer">
              <PlusOutlined style={{ fontSize: '12px' }} />
            </div>
          </Popover>
        </div>
      )}
    </>
  );

  if (isRoot) {
    return (
      <div 
        className={commonClassNames}
        style={dynamicStyle}
        data-component-id={node.id}
        data-component-type={node.type}
        onClick={handleClick}
      >
        {renderToolbar()}
        <div className="flex-1 flex flex-col w-full h-full">
           {children}
        </div>
      </div>
    );
  }

  // Determine the size prop for Resizable
  // If node has explicit style, use it; otherwise undefined (auto)
  const resizableSize = (node.style?.width || node.style?.height)
        ? { width: node.style.width || 'auto', height: node.style.height || 'auto' }
        : undefined;

  return (
    <Resizable
      className={commonClassNames}
      style={dynamicStyle}
      size={resizableSize}
      enable={isSelected ? { 
        top:false, right:true, bottom:true, left:false, 
        topRight:false, bottomRight:true, bottomLeft:false, topLeft:false 
      } : false}
      bounds="parent"
      onResizeStart={handleResizeStart}
      onResizeStop={handleResizeStop}
      data-component-id={node.id}
      data-component-type={node.type}
    >
      {renderToolbar()}
      <div 
        className="flex-1 flex flex-col w-full h-full"
        onClick={handleClick}
      >
         {children}
      </div>
    </Resizable>
  );
};
