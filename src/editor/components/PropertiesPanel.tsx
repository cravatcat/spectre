import React from 'react';
import { useEditorStore } from '../../editor/core/store';
import { registry } from '../../editor/core/registry';
import { Divider, Typography } from 'antd';

const { Title } = Typography;

export const PropertiesPanel: React.FC = () => {
  const selectedId = useEditorStore((state) => state.selectedId);
  const selectedNode = useEditorStore((state) => selectedId ? state.components[selectedId] : null);
  const updateProps = useEditorStore((state) => state.updateProps);

  if (!selectedNode) {
    return (
      <div className="p-5 text-gray-400 text-center">
        Select a component to edit properties
      </div>
    );
  }

  const def = registry.get(selectedNode.type);
  const FormComponent = def?.formComponent;

  const handlePropChange = (key: string, value: any) => {
    updateProps(selectedNode.id, { [key]: value });
  };
  
  const handleStyleChange = (key: string, value: any) => {
      updateProps(selectedNode.id, {
        style: {
          [key]: value
        }
      });
  };

  return (
    <div className="p-4">
       <Title level={5}>Properties: {selectedNode.type}</Title>
       <div className="mb-3 text-xs text-gray-400">ID: {selectedNode.id}</div>
       <Divider className="my-3" />
       
       {FormComponent ? (
         <FormComponent 
            node={selectedNode}
            onChange={handlePropChange}
            onStyleChange={handleStyleChange}
         />
       ) : (
         <div>No properties available</div>
       )}
    </div>
  );
};
