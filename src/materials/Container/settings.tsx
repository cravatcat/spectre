import React from 'react';
import { Form as AntForm, Input, Select, Radio } from 'antd';
import type { ComponentNode } from '../../editor/core/types';

export interface ContainerSettingsProps {
  node: ComponentNode;
  onChange: (key: string, value: any) => void;
  onStyleChange: (key: string, value: any) => void;
}

export const ContainerSettings: React.FC<ContainerSettingsProps> = ({ node, onChange }) => {
  return (
    <AntForm layout="vertical" key={node.id}>
      <AntForm.Item label="ID">
        <Input disabled value={node.id} />
      </AntForm.Item>

      <AntForm.Item label="Layout Type" hidden>
        <Radio.Group 
          value={node.props.layoutType || 'flex'}
          onChange={e => onChange('layoutType', e.target.value)}
        >
          <Radio.Button value="flex">Flex</Radio.Button>
        </Radio.Group>
      </AntForm.Item>

      <AntForm.Item label="Direction">
        <Select 
          value={node.props.direction || 'row'}
          onChange={val => onChange('direction', val)}
        >
          <Select.Option value="row">Row</Select.Option>
          <Select.Option value="column">Column</Select.Option>
        </Select>
      </AntForm.Item>

      <AntForm.Item label="Justify">
        <Select 
          value={node.props.justify || 'start'}
          onChange={val => onChange('justify', val)}
        >
          <Select.Option value="start">Start</Select.Option>
          <Select.Option value="center">Center</Select.Option>
          <Select.Option value="end">End</Select.Option>
          <Select.Option value="space-between">Space Between</Select.Option>
        </Select>
      </AntForm.Item>

      <AntForm.Item label="Align Items">
        <Select 
          value={node.props.align || 'stretch'}
          onChange={val => onChange('align', val)}
        >
          <Select.Option value="stretch">Stretch</Select.Option>
          <Select.Option value="flex-start">Start</Select.Option>
          <Select.Option value="center">Center</Select.Option>
          <Select.Option value="flex-end">End</Select.Option>
        </Select>
      </AntForm.Item>
    </AntForm>
  );
};
