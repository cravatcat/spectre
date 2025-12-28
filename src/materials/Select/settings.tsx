import React from 'react';
import { Form as AntForm, Input, Switch, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { ComponentNode } from '../../editor/core/types';

export const SelectSettings: React.FC<{ node: ComponentNode, onChange: (key: string, value: any) => void }> = ({ node, onChange }) => {
  const options = node.props.options || [];

  const handleOptionChange = (index: number, key: 'label' | 'value', val: string) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], [key]: val };
    onChange('options', newOptions);
  };

  const addOption = () => {
    onChange('options', [...options, { label: 'New Option', value: 'new_option' }]);
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_: any, i: number) => i !== index);
    onChange('options', newOptions);
  };

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
      
      <AntForm.Item label="Options">
        {options.map((option: any, index: number) => (
          <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
            <Input 
              placeholder="Label" 
              value={option.label} 
              onChange={(e) => handleOptionChange(index, 'label', e.target.value)} 
            />
            <Input 
              placeholder="Value" 
              value={option.value} 
              onChange={(e) => handleOptionChange(index, 'value', e.target.value)} 
            />
            <MinusCircleOutlined onClick={() => removeOption(index)} />
          </Space>
        ))}
        <Button type="dashed" onClick={addOption} block icon={<PlusOutlined />}>
          Add Option
        </Button>
      </AntForm.Item>
    </AntForm>
  );
};
