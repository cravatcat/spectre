import { useState } from 'react';
import { Canvas } from '../../editor/components/Canvas';
import { PropertiesPanel } from '../../editor/components/PropertiesPanel';
import { PreviewModal } from '../../editor/components/PreviewModal';
import { Button, message, Space } from 'antd';
import { SaveOutlined, EyeOutlined } from '@ant-design/icons';
import { useEditorStore } from '../../editor/core/store';

// Register Components
import '../../materials/Container';
import '../../materials/Form';
import '../../materials/Input';
import '../../materials/Select';

export default function BuilderPage() {
  const components = useEditorStore((state) => state.components);
  const [previewVisible, setPreviewVisible] = useState(false);

  const handleSave = () => {
    const json = JSON.stringify(components, null, 2);
    console.log('Saved JSON:', json);
    
    // In a real app, this would save to a backend
    // For now, we'll just log it and show a message
    // We could also copy to clipboard or download file
    navigator.clipboard.writeText(json).then(() => {
      message.success('Schema saved to clipboard!');
    }).catch(() => {
      message.success('Schema saved (check console)!');
    });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="h-12 border-b border-gray-200 bg-white flex items-center justify-between px-4 shrink-0 z-10">
        <div className="font-semibold text-gray-700">Spectre Builder</div>
        <Space>
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => setPreviewVisible(true)}
            size="small"
          >
            Preview
          </Button>
          <Button 
            type="primary" 
            icon={<SaveOutlined />} 
            onClick={handleSave}
            size="small"
          >
            Save
          </Button>
        </Space>
      </div>

      {/* Workspace */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col h-full p-4 bg-gray-50 overflow-auto">
            <Canvas />
        </div>
        <div className="w-[350px] bg-white border-l border-gray-200 overflow-auto">
          <PropertiesPanel />
        </div>
      </div>

      <PreviewModal 
        open={previewVisible} 
        onCancel={() => setPreviewVisible(false)} 
      />
    </div>
  );
}
