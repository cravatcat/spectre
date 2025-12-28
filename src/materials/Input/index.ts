import { registry } from '../../editor/core/registry';
import { Input } from './index.tsx';
import { InputSettings } from './settings';

registry.register({
  type: 'Input',
  component: Input,
  formComponent: InputSettings,
  behavior: {
    droppable: false,
    defaultProps: {
      label: 'Input Field',
      name: 'input_field',
      required: true,
      placeholder: 'Please enter...',
    },
  }
});
