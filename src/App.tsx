import { useState } from 'react'
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core'
import { createPortal } from 'react-dom'
import './App.css'
import HostLayout from './Layout/HostLayout'
import ThreeColumnLayout from './Layout/ThreeColumnLayout'
import { ComponentLibrary, type ComponentItem } from './components/ThreeColumn/ComponentLibrary'
import { ComponentLayoutPreview } from './components/ThreeColumn/ComponentLayoutPreview'
import { ComponentRealView } from './components/ThreeColumn/ComponentRealView'
import { useCanvasStore } from './store/useCanvasStore'

function App() {
  const [activeDragItem, setActiveDragItem] = useState<ComponentItem | null>(null);
  const addItem = useCanvasStore((state) => state.addItem);
  const items = useCanvasStore((state) => state.items);
  const moveItem = useCanvasStore((state) => state.moveItem);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const existingItem = items.find(i => i.uniqueId === active.id);

    if (existingItem) {
      setActiveDragItem({
        id: existingItem.uniqueId,
        name: existingItem.name,
        icon: (() => null) as any,
        data: existingItem.data
      });
    } else {
      setActiveDragItem(active.data.current as ComponentItem);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {

    const { active, over } = event;
    console.log(active, over);
    setActiveDragItem(null);
    if (!over) return;
    // Helper to determine parent ID from drop target
    const getTargetParentId = (overId: string): string | undefined => {
      if (overId === 'canvas-droppable') return 'canvas-droppable';
      if (overId.endsWith('-droppable')) {
        return overId.replace('-droppable', '');
      }
      // Dropped on an item? Find its parent
      const overItem = items.find(i => i.uniqueId === overId);
      return overItem?.parentId;
    };

    const targetParentId = getTargetParentId(over.id as string);

    // 1. Handle New Item Drop
    const isNewItem = !items.find(i => i.uniqueId === active.id);
    if (isNewItem) {
      // Only allow dropping if we identified a valid parent (canvas or layout)
      // If targetParentId is undefined, it might mean we dropped on something weird, but let's assume root if unclear? 
      // No, strict check.
      if (targetParentId) {
        const newItem = active.data.current as ComponentItem;
        if (newItem) {
          addItem({
            uniqueId: `${newItem.id}-${Date.now()}`,
            ...newItem,
            parentId: targetParentId
          });
        }
      }
      console.log(useCanvasStore.getState())

      return;
    }

    // 2. Handle Existing Item Move/Sort
    const activeId = active.id;
    const overId = over.id;

    // If dropped on self, do nothing
    if (activeId === overId) return;

    const oldIndex = items.findIndex((item) => item.uniqueId === activeId);
    // Note: overId might be a "-droppable" id, which doesn't exist in items.
    // If overId is a container drop zone, we are just reparenting, not necessarily sorting against a specific sibling.
    // In that case, we might want to move it to the end of that container's list?

    const activeItem = items[oldIndex];

    // Case A: Dropped into a container (empty area)
    if (String(overId).endsWith('-droppable') || overId === 'canvas-droppable') {
      const newParentId = overId === 'canvas-droppable' ? 'canvas-droppable' : String(overId).replace('-droppable', '');

      // Prevent dropping a parent into its own child (infinite loop prevention)
      // If the dragged item is a container, and we try to drop it into one of its descendants.
      // Since we only have one level of nesting support in UI logic for now, let's just check:
      // If activeItem.uniqueId === newParentId, we are dropping into itself, which is invalid.
      if (activeItem.uniqueId === newParentId) return;

      if (activeItem.parentId !== newParentId) {
        // Update parent
        useCanvasStore.getState().updateItem(activeItem.uniqueId, { parentId: newParentId });
      }
      return;
    }

    // Case B: Dropped on another item (Reordering)
    const newIndex = items.findIndex((item) => item.uniqueId === overId);
    
    if (oldIndex !== -1 && newIndex !== -1) {
      const overItem = items[newIndex];
      
      // Prevent dropping a parent into its own child (infinite loop)
      // Simple check: if activeItem is an ancestor of overItem
      // For now, since we only have 1 level of nesting visually or simple nesting, 
      // let's at least ensure we don't set parentId to self.
      if (overItem.uniqueId === activeItem.uniqueId) return;

      // Check if we need to change parent
      if (activeItem.parentId !== overItem.parentId) {
         // If we are moving to a different list, we should likely update the parentId FIRST
         // But wait, if we update parentId, we are effectively moving it conceptually.
         // However, if we also want to insert it at a specific index relative to the new siblings,
         // we need to be careful.
         
         // If we are sorting across different containers, dnd-kit's arrayMove might be weird if we don't filter?
         // No, arrayMove just moves elements in the big array. 
         // The RecursiveRenderer filters by parentId.
         
         // So:
         // 1. Update Parent ID
         useCanvasStore.getState().updateItem(activeItem.uniqueId, { parentId: overItem.parentId });
      }
      
      // Reorder
      // Only reorder if the index actually changes in the global array.
      // BUT, visual order depends on the filtered list.
      // If we move item A (index 0) to be after item B (index 10), but they are in different parents,
      // changing the global index DOES matter if we want to persist the "order of creation" or similar,
      // but for rendering, what matters is the order relative to siblings.
      
      // If we just updated parentId, the item is now a sibling of overItem.
      // We want it to be placed close to overItem in the array so that map() renders them in order?
      // Yes, because RecursiveRenderer maps over `items.filter(...)`.
      // The filter preserves the relative order of items in the original array.
      // So to change visual order, we MUST change array order.
      
      if (oldIndex !== newIndex) {
        moveItem(oldIndex, newIndex);
      }
    }

  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <HostLayout>
        <ThreeColumnLayout
          left={<ComponentLibrary />}
          right={<ComponentRealView />}
        >
          <ComponentLayoutPreview />
        </ThreeColumnLayout>
      </HostLayout>
      {createPortal(
        <DragOverlay>
          {activeDragItem ? (
            <div className="p-3 bg-white border border-blue-500 rounded shadow-lg opacity-90 cursor-grabbing">
              <span className="text-sm font-medium text-gray-900">
                {activeDragItem.name}
              </span>
            </div>
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
}

export default App
