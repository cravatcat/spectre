import React from 'react';
import { Form as AntForm, Button, Space, message } from 'antd';
import type { BaseMaterialProps } from '../../editor/core/types';

export interface FormProps extends BaseMaterialProps {
  layout?: 'horizontal' | 'vertical' | 'inline';
}

export const Form: React.FC<FormProps> = ({
  children,
  style,
  layout = 'vertical',
  className,
  ...rest
}) => {
  const onFinish = (values: any) => {
    console.log('Form values:', values);
    message.success('Form submitted successfully! Check console for values.');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Form submission failed. Please check the fields.');
  };

  return (
    <AntForm
      layout={layout}
      style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', ...style }}
      className={className}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      {...rest}
    >
      <div className="flex-1 w-full overflow-auto">
        {children}
      </div>
      <div className="mt-auto pt-4 flex justify-end shrink-0">
        <Space>
          <Button htmlType="reset">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </div>
    </AntForm>
  );
};
