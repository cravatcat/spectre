import { useState } from 'react';
import {
  Layout,
} from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { layoutSchema } from '../../separate/Layout';

export interface ComponentSchema {
  type: string;
  component: string;
  isLayoutRoot?: boolean;
  props: {
    style?: React.CSSProperties;
    [key: string]: unknown;
  };
  items?: unknown[];
  [key: string]: unknown;
}

export interface ComponentItem {
  id: string;
  name: string;
  icon: React.ElementType;
  data?: any; // To hold schema data
}

interface Category {
  name: string;
  items: ComponentItem[];
}

const categories: Category[] = [
  {
    name: 'Layout',
    items: [
      {
        id: 'layout', // This ID should match what we check for in App.tsx
        name: layoutSchema.type, // "Layout"
        icon: Layout,
        data: layoutSchema, // Attach the full schema here
      },
    ]
  },
];

function DraggableComponentItem({ item, isActive, onClick }: { item: ComponentItem, isActive: boolean, onClick: () => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: item.id,
    data: item, // Pass item directly to match App.tsx expectation
  });

  const Icon = item.icon;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`
        group flex flex-col items-center justify-center p-3 rounded-lg border cursor-grab transition-all duration-200
        ${isActive
          ? 'bg-blue-50 border-blue-200 shadow-sm'
          : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50 hover:shadow-sm'
        }
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      <Icon
        className={`w-5 h-5 mb-2 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`}
        strokeWidth={1.5}
      />
      <span className={`text-xs font-medium ${isActive ? 'text-blue-700' : 'text-gray-600 group-hover:text-gray-900'}`}>
        {item.name}
      </span>
    </div>
  );
}

export function ComponentLibrary() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full bg-white text-sm">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Components</h2>
        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
          Library
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {categories.map((category) => (
          <div key={category.name}>
            <h3 className="px-2 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              {category.name}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {category.items.map((item) => (
                <DraggableComponentItem
                  key={item.id}
                  item={item}
                  isActive={activeId === item.id}
                  onClick={() => setActiveId(item.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
