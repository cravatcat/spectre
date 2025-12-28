import React from 'react';
import { Modal } from 'antd';
import { useEditorStore } from '../core/store';
import { registry } from '../core/registry';
import type { ComponentNode } from '../core/types';

interface PreviewModalProps {
  open: boolean;
  onCancel: () => void;
}

const RuntimeRenderer: React.FC<{ nodeId: string; components: Record<string, ComponentNode> }> = ({ nodeId, components }) => {
  const node = components[nodeId];
  if (!node) return null;

  const def = registry.get(node.type);
  if (!def) return null;

  const Component = def.component;

  const children = node.children?.map(childId => (
    <RuntimeRenderer key={childId} nodeId={childId} components={components} />
  ));

  // Merge props and style
  // Priority: node.style > node.props.style
  const style = {
    ...node.props.style,
    ...node.style,
  };

  return (
    <Component {...node.props} style={style} id={node.id}>
      {children}
    </Component>
  );
};

export const PreviewModal: React.FC<PreviewModalProps> = ({ open, onCancel }) => {
  const components = useEditorStore((state) => state.components);
  const rootId = useEditorStore((state) => state.rootId) || 'root';

  return (
    <Modal
      title="Preview"
      open={open}
      onCancel={onCancel}
      footer={null}
      width="100%"
      style={{ top: 0, padding: 0, maxWidth: '100vw', height: '100vh' }}
      styles={{ 
        body: { 
          height: 'calc(100vh - 55px)', 
          overflow: 'auto', 
          padding: 0,
          backgroundColor: '#f0f2f5' // Default background
        },
        content: {
            height: '100vh',
            borderRadius: 0,
            display: 'flex',
            flexDirection: 'column'
        }
      } as any}
      destroyOnHidden
    >
      <div className="w-full h-full">
        <RuntimeRenderer nodeId={rootId} components={components} />
      </div>
    </Modal>
  );
};
