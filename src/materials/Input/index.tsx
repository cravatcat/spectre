import React from 'react';
import { Form as AntForm, Input as AntInput } from 'antd';
import type { BaseMaterialProps } from '../../editor/core/types';

export interface InputProps extends BaseMaterialProps {
  label?: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  style,
  label,
  name,
  required,
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
      <AntInput placeholder={placeholder} />
    </AntForm.Item>
  );
};
