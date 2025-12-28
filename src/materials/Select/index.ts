import { registry } from '../../editor/core/registry';
import { Select } from './index.tsx';
import { SelectSettings } from './settings';

registry.register({
  type: 'Select',
  component: Select,
  formComponent: SelectSettings,
  behavior: {
    droppable: false,
    defaultProps: {
      label: 'Select Field',
      name: 'select_field',
      required: true,
      placeholder: 'Please select...',
      options: [
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' },
      ]
    },
  }
});
