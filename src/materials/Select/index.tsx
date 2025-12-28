import React from 'react';
import { Form as AntForm, Select as AntSelect } from 'antd';
import type { BaseMaterialProps } from '../../editor/core/types';

export interface SelectProps extends BaseMaterialProps {
  label?: string;
  name?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  style,
  label,
  name,
  required,
  options = [],
  placeholder,
  className,
  ...rest
}) => {
  return (
    <AntForm.Item
      label={label}
      name={name}
      rules={[{ required, message: `${label || 'Field'} is required` }]}
      style={style}
      className={className}
      {...rest}
    >
      <AntSelect placeholder={placeholder} options={options} />
    </AntForm.Item>
  );
};
