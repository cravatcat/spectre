import React, { useState } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Popover, List, Popconfirm } from 'antd';
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
  const selectedId = useEditorStore((state) => state.selectedId);
  const [open, setOpen] = useState(false);

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

  const def = registry.get(node.type);
  const whitelist = def?.behavior?.whitelist || [];

  const isSelected = selectedId === node.id;
  const isRoot = !node.parentId;

  const content = (
    <List
      size="small"
      dataSource={whitelist}
      renderItem={(item: string) => (
        <List.Item
          onClick={() => handleAdd(item)}
          className="cursor-pointer px-2 py-1 hover:bg-gray-100"
        >
          {item}
        </List.Item>
      )}
    />
  );

  // Merge dynamic styles with base editor styles
  // We use inline style for user-defined properties (like flex, width, height, colors)
  // that can't be easily mapped to static classes without a compiler.
  const dynamicStyle: React.CSSProperties = {
    flex: node.style?.flex,
    ...node.style,
    padding: undefined, // Let the inner component handle padding
  };

  return (
    <div
      className={clsx(
        'relative flex flex-col min-h-[50px] transition-all duration-200 box-border group outline-offset-[-1px]',
        isRoot ? 'h-full w-full' : 'm-[2px]',
        !isRoot && (isSelected
          ? 'outline  outline-blue-500 z-10'
          : 'outline outline-dashed outline-gray-300 hover:outline-blue-300')
      )}
      style={dynamicStyle}
      data-component-id={node.id}
      data-component-type={node.type}
      onClick={handleClick}
    >
      {/* Top Right Toolbar: Name & Delete */}
      {isSelected && (
        <div className="absolute top-0 right-0 z-[999] flex items-center h-6 pl-2 pr-1 bg-blue-500 text-[11px] text-white shadow-sm pointer-events-auto rounded-bl">
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
        <div className="absolute bottom-0 right-0 z-[999] flex items-center justify-center w-6 h-6 bg-blue-500 text-white shadow-sm pointer-events-auto rounded-tl hover:bg-blue-600 transition-colors">
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

      {/* Render the actual component */}
      <div className="flex-1 flex flex-col w-full h-full">
        {children}
      </div>

    </div>
  );
};
