import { useCanvasStore } from '../../store/useCanvasStore';

const RecursiveRealViewRenderer = ({ parentId }: { parentId: string }) => {
  const items = useCanvasStore((state) => state.items);
  const childItems = items.filter(item => item.parentId === parentId);

  if (childItems.length === 0) return null;

  return (
    <>
      {childItems.map((item) => {
        const Component = item.data?.component;
        const props = item.data?.props || {};
        
        if (Component) {
          const hasChildren = items.some(i => i.parentId === item.uniqueId);
          return (
            <Component key={item.uniqueId} {...item} {...props}>
              {hasChildren ? <RecursiveRealViewRenderer parentId={item.uniqueId} /> : undefined}
            </Component>
          );
        }
        return null;
      })}
    </>
  );
};

export function ComponentRealView() {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900 text-sm">Real Preview</h2>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <RecursiveRealViewRenderer parentId="canvas-droppable" />
      </div>
    </div>
  );
}
