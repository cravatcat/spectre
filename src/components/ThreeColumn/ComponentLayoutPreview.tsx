import { Layers } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useCanvasStore } from '../../store/useCanvasStore';
import { DraftItemWrapper } from './DraftItemWrapper';

// Recursive renderer for nested components
const RecursiveItemsRenderer = ({ parentId }: { parentId: string }) => {
   const items = useCanvasStore((state) => state.items);
   const updateItem = useCanvasStore((state) => state.updateItem);
   
   const childItems = items.filter(item => item.parentId === parentId);

   if (childItems.length === 0) return null;

   return (
      <SortableContext items={childItems.map(item => item.uniqueId)} strategy={verticalListSortingStrategy}>
         {childItems.map((item) => {
            const DraftComponent = item.data?.draftComponent;
            const componentProps = item.data?.props || {};
            const formComponent = item.data?.formComponent;

            const handleUpdate = (newValues: any) => {
               updateItem(item.uniqueId, {
                  data: {
                     ...item.data,
                     props: {
                        ...componentProps,
                        ...newValues
                     }
                  }
               });
            };

            if (DraftComponent) {
                const hasChildren = items.some(i => i.parentId === item.uniqueId);
                return (
                   <DraftItemWrapper
                      key={item.uniqueId}
                      id={item.uniqueId}
                      itemName={item.name}
                      formComponent={formComponent}
                      initialValues={componentProps}
                      onUpdate={handleUpdate}
                   >
                      <DraftComponent 
                         // Remove id from here to avoid duplicate id issues if needed,
                         // but DraftLayout uses it for Droppable.
                         // So we MUST keep it for DraftLayout.
                         // For normal components, it might be unused but harmless.
                         id={item.uniqueId} 
                         {...componentProps}
                      >
                         {hasChildren ? <RecursiveItemsRenderer parentId={item.uniqueId} /> : undefined}
                      </DraftComponent>
                   </DraftItemWrapper>
                );
             }

            return (
               <div key={item.uniqueId} className="relative z-10 border border-dashed border-gray-300 bg-white p-4">
                  <div className="text-gray-400 text-center">
                     {item.name} Container
                  </div>
               </div>
            );
         })}
      </SortableContext>
   );
};

export function ComponentLayoutPreview() {
   const { isOver, setNodeRef } = useDroppable({
      id: 'canvas-droppable',
   });
   
   // We need to access items to check if root has items for the placeholder check?
   // Actually DraftLayout has placeholder logic, but the root canvas logic is here.
   // Let's keep simple logic for now.

   return (
      <div className="flex flex-col h-full bg-gray-50/50">
         {/* Toolbar */}
         <div className="px-4 py-2 bg-white border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <Layers className="w-4 h-4 text-gray-500" />
               <span className="text-sm font-medium text-gray-700">Layout Preview</span>
            </div>
         </div>

         {/* Canvas Area */}
         <div
            ref={setNodeRef}
            className={`flex-1 overflow-auto p-8 relative flex flex-col items-center justify-start gap-4 transition-colors ${isOver ? 'bg-blue-50/50' : ''}`}
         >
            {/* Dot Pattern Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.4]"
               style={{
                  backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
               }}
            />

            <RecursiveItemsRenderer parentId="canvas-droppable" />
         </div>
      </div>
   );
}
