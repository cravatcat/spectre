import { registry } from '../../editor/core/registry';
import { Form } from './index.tsx';
import { FormSettings } from './settings';

registry.register({
  type: 'Form',
  component: Form,
  formComponent: FormSettings,
  behavior: {
    whitelist: ['Input', 'Select'],
    droppable: true,
    defaultProps: {
      layout: 'vertical',
    },
    defaultStyle: {
      padding: '20px',
      minHeight: '100px',
      backgroundColor: '#ffffff',
      flex: 1, // Default to flex: 1 to fill container
    }
  }
});
