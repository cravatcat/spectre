import React from 'react';
import { Form as AntForm, Input, Switch } from 'antd';
import type { ComponentNode } from '../../editor/core/types';

export const InputSettings: React.FC<{ node: ComponentNode, onChange: (key: string, value: any) => void }> = ({ node, onChange }) => {
  return (
    <AntForm layout="vertical">
      <AntForm.Item label="Label">
        <Input 
          value={node.props.label} 
          onChange={(e) => onChange('label', e.target.value)} 
        />
      </AntForm.Item>
      <AntForm.Item label="Name (Field ID)">
        <Input 
          value={node.props.name} 
          onChange={(e) => onChange('name', e.target.value)} 
        />
      </AntForm.Item>
      <AntForm.Item label="Placeholder">
        <Input 
          value={node.props.placeholder} 
          onChange={(e) => onChange('placeholder', e.target.value)} 
        />
      </AntForm.Item>
      <AntForm.Item label="Required">
        <Switch 
          checked={node.props.required} 
          onChange={(checked) => onChange('required', checked)} 
        />
      </AntForm.Item>
    </AntForm>
  );
};
