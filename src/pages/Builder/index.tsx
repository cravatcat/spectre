import { Canvas } from '../../editor/components/Canvas';
import { PropertiesPanel } from '../../editor/components/PropertiesPanel';

// Register Components
import '../../materials/Container';

export default function BuilderPage() {
  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex-1 flex flex-col h-full p-4 bg-gray-50">
          <Canvas />
      </div>
      <div className="w-[350px] bg-white border-l border-gray-200 overflow-auto">
        <PropertiesPanel />
      </div>
    </div>
  );
}
