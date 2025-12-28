import React from 'react';
import { useEditorStore } from '../core/store';
import { registry } from '../core/registry';
import { EditorWrapper } from './Wrapper';

const Renderer: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  const node = useEditorStore((state) => state.components[nodeId]);
  
  if (!node) return null;

  const def = registry.get(node.type);
  
  if (!def) {
    return <div>Unknown component type: {node.type}</div>;
  }

  const Component = def.component;
  const Wrapper = def.wrapper || EditorWrapper;

  // Render children recursively
  const children = node.children?.map(childId => (
    <Renderer key={childId} nodeId={childId} />
  ));

  // Construct props
  const componentProps = {
    ...node.props,
    id: node.id,
    // Ensure the component fills the wrapper
    style: {
      ...node.props.style,
      width: '100%',
      height: '100%',
      margin: 0, // Margin is handled by wrapper
    }
  };

  return (
    <Wrapper node={node}>
      <Component {...componentProps}>
        {children}
      </Component>
    </Wrapper>
  );
};

export const Canvas: React.FC = () => {
  const rootId = useEditorStore((state) => state.rootId) || 'root';
  
  return (
    <div className="w-full h-full overflow-hidden">
      <Renderer nodeId={rootId} />
    </div>
  );
};
