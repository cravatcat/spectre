import { create } from 'zustand';
import { arrayMove } from '@dnd-kit/sortable';

export interface CanvasItem {
  uniqueId: string;
  id: string;
  name: string;
  parentId?: string;
  [key: string]: any;
}

interface CanvasState {
  items: CanvasItem[];
  addItem: (item: CanvasItem) => void;
  updateItem: (uniqueId: string, props: Partial<CanvasItem>) => void;
  setItems: (items: CanvasItem[]) => void;
  removeItem: (uniqueId: string) => void;
  moveItem: (oldIndex: number, newIndex: number) => void;
  activeDrawerId: string | null;
  setActiveDrawerId: (id: string | null) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  items: [],
  activeDrawerId: null,
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  updateItem: (uniqueId, props) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.uniqueId === uniqueId ? { ...item, ...props } : item
      ),
    })),
  setItems: (items) => set({ items }),
  removeItem: (uniqueId) =>
    set((state) => {
      const getIdsToRemove = (rootId: string, items: CanvasItem[]): string[] => {
        const ids = [rootId];
        const children = items.filter((item) => item.parentId === rootId);
        children.forEach((child) => {
          ids.push(...getIdsToRemove(child.uniqueId, items));
        });
        return ids;
      };
      
      const idsToRemove = getIdsToRemove(uniqueId, state.items);
      // If the removed item has an open drawer, close it
      const activeDrawerId = state.activeDrawerId;
      const newActiveDrawerId = idsToRemove.includes(activeDrawerId || '') ? null : activeDrawerId;

      return { 
        items: state.items.filter((i) => !idsToRemove.includes(i.uniqueId)),
        activeDrawerId: newActiveDrawerId
      };
    }),
  moveItem: (oldIndex, newIndex) =>
    set((state) => ({
      items: arrayMove(state.items, oldIndex, newIndex),
    })),
  setActiveDrawerId: (id) => set({ activeDrawerId: id }),
}));
