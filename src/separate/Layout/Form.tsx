import React from 'react';
import { Form, Select, InputNumber, Radio } from 'antd';
import type { LayoutProps } from './types';

interface LayoutFormProps {
  initialValues?: LayoutProps;
  onValuesChange?: (changedValues: unknown, allValues: LayoutProps) => void;
}

export const LayoutForm: React.FC<LayoutFormProps> = ({ initialValues, onValuesChange }) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onValuesChange={onValuesChange}
    >
      <Form.Item name="layoutType" label="Layout Type">
        <Radio.Group>
          <Radio.Button value="grid">Grid</Radio.Button>
          <Radio.Button value="flex">Flex</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item noStyle dependencies={['layoutType']}>
        {({ getFieldValue }) => {
          const layoutType = getFieldValue('layoutType');
          if (layoutType === 'grid') {
            return (
               <Form.Item label="Gutter">
                 <div style={{ display: 'flex', gap: 8 }}>
                    <Form.Item name={['gutter', 0]} noStyle>
                        <InputNumber placeholder="Horizontal" />
                    </Form.Item>
                    <span>-</span>
                    <Form.Item name={['gutter', 1]} noStyle>
                        <InputNumber placeholder="Vertical" />
                    </Form.Item>
                 </div>
               </Form.Item>
            );
          }
          return (
            <>
              <Form.Item name="direction" label="Direction">
                 <Select>
                   <Select.Option value="row">Row</Select.Option>
                   <Select.Option value="column">Column</Select.Option>
                 </Select>
              </Form.Item>
              <Form.Item name="justify" label="Justify">
                 <Select>
                   <Select.Option value="start">Start</Select.Option>
                   <Select.Option value="end">End</Select.Option>
                   <Select.Option value="center">Center</Select.Option>
                   <Select.Option value="space-between">Space Between</Select.Option>
                   <Select.Option value="space-around">Space Around</Select.Option>
                 </Select>
              </Form.Item>
              <Form.Item name="align" label="Align">
                 <Select>
                   <Select.Option value="top">Top</Select.Option>
                   <Select.Option value="middle">Middle</Select.Option>
                   <Select.Option value="bottom">Bottom</Select.Option>
                 </Select>
              </Form.Item>
            </>
          );
        }}
      </Form.Item>
    </Form>
  );
};
