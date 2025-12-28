import { registry } from '../../editor/core/registry';
import { Container } from './index.tsx';
import { ContainerSettings } from './settings';

registry.register({
  type: 'Container',
  component: Container,
  formComponent: ContainerSettings,
  behavior: {
    whitelist: ['Container', 'Form'],
    droppable: true,
    defaultProps: {
      layoutType: 'flex',
      direction: 'row',
      justify: 'start',
      align: 'stretch',
    },
    defaultStyle: {
      padding: '20px',
      minHeight: '100px',
      backgroundColor: '#ffffff',
      flex: 1, // Default to flex: 1 for equal distribution
    }
  }
});
