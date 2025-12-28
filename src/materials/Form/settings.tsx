import React from 'react';
import { Form as AntForm, Select } from 'antd';
import type { ComponentNode } from '../../editor/core/types';

export interface FormSettingsProps {
  node: ComponentNode;
  onChange: (key: string, value: any) => void;
  onStyleChange: (key: string, value: any) => void;
}

export const FormSettings: React.FC<FormSettingsProps> = ({ node, onChange }) => {
  return (
    <AntForm layout="vertical">
      <AntForm.Item label="Layout">
        <Select
          value={node.props.layout || 'vertical'}
          onChange={(value) => onChange('layout', value)}
        >
          <Select.Option value="horizontal">Horizontal</Select.Option>
          <Select.Option value="vertical">Vertical</Select.Option>
          <Select.Option value="inline">Inline</Select.Option>
        </Select>
      </AntForm.Item>
    </AntForm>
  );
};
