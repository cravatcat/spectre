import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { create as mutative } from 'mutative';
import type { EditorState, ComponentNode } from './types';
import { registry } from './registry';

const initialComponents: Record<string, ComponentNode> = {
  'root': {
    id: 'root',
    type: 'Container', // Renamed from Layout to Container for clarity
    props: {
      layoutType: 'flex',
      direction: 'column',
      justify: 'start',
      align: 'stretch',
      style: { height: '100%', padding: '20px', background: '#f0f2f5' }
    },
    children: [],
    style: { height: '100%', minHeight: '500px' }
  }
};

// Custom middleware for mutative integration with Zustand
const mutativeMiddleware = (config: any) => (set: any, get: any, api: any) =>
  config(
    (partial: any, replace: any) => {
      const nextState = typeof partial === 'function'
        ? mutative(get(), partial)
        : partial;
      set(nextState, replace);
    },
    get,
    api
  );

export const useEditorStore = create<EditorState>()(
  mutativeMiddleware(
    (set: any) => ({
      components: initialComponents,
      selectedId: 'root',

      selectComponent: (id: string | null) => set((state: EditorState) => {
        state.selectedId = id;
      }),

      addChild: (parentId: string, type: string, initialProps?: Record<string, any>) => set((state: EditorState) => {
        const newId = nanoid();
        
        // Get defaults from registry
        const def = registry.get(type);
        const defaultProps = def?.behavior?.defaultProps || {};
        const defaultStyle = def?.behavior?.defaultStyle || {};

        const newNode: ComponentNode = {
          id: newId,
          type,
          props: {
            ...defaultProps,
            ...initialProps,
            style: { 
              ...defaultStyle,
              ...(initialProps?.style || {})
            }
          },
          // We also keep style on the node level for the wrapper, but sync it with props.style
          style: { 
            ...defaultStyle,
            ...(initialProps?.style || {})
          },
          children: [],
          parentId
        };

        // Add new node
        state.components[newId] = newNode;
        
        // Update parent
        if (state.components[parentId]) {
          state.components[parentId].children.push(newId);
        }
        
        // Auto select
        state.selectedId = newId;
      }),

      removeComponent: (id: string) => set((state: EditorState) => {
        const node = state.components[id];
        if (!node || !node.parentId) return; // Cannot delete root or orphan

        // Remove from parent's children list
        const parent = state.components[node.parentId];
        if (parent) {
          parent.children = parent.children.filter(childId => childId !== id);
        }

        // Recursively delete node and its children
        const deleteRecursive = (nodeId: string) => {
          const targetNode = state.components[nodeId];
          if (targetNode) {
            targetNode.children.forEach(deleteRecursive);
            delete state.components[nodeId];
          }
        };

        deleteRecursive(id);

        // Deselect if deleted node was selected
        if (state.selectedId === id) {
          state.selectedId = null;
        }
      }),

      updateProps: (id: string, newProps: any) => set((state: EditorState) => {
        const node = state.components[id];
        if (!node) return;

        const { style, ...restProps } = newProps;
        
        node.props = { ...node.props, ...restProps };
        
        if (style) {
          node.style = { ...node.style, ...style };
        }
      })
    })
  )
);
