import React from 'react';

// Core Component Node Structure
export interface ComponentNode {
  id: string;
  type: string; // Maps to Registry key
  props: Record<string, any>; // Component-specific props
  style?: React.CSSProperties; // Wrapper/Layout styles
  children: string[]; // Child IDs
  parentId?: string;
}

// Editor State
export interface EditorState {
  components: Record<string, ComponentNode>;
  selectedId: string | null;
  rootId?: string;
  
  // Actions
  selectComponent: (id: string | null) => void;
  addChild: (parentId: string, type: string, initialProps?: Record<string, any>) => void;
  removeComponent: (id: string) => void;
  updateProps: (id: string, props: any) => void;
}

// Base Props for all Materials
export interface BaseMaterialProps {
  id?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
}

// Registry Definition
export interface MaterialDefinition {
  type: string;
  component: React.FC<any>; // The View
  formComponent?: React.FC<any>; // The Props Form
  wrapper?: React.FC<any>; // Optional Custom Wrapper (rarely used if generic is good)
  behavior?: {
    whitelist?: string[]; // What can go inside
    droppable?: boolean; // Can it accept children?
    defaultProps?: Record<string, any>;
    defaultStyle?: React.CSSProperties;
  };
}
