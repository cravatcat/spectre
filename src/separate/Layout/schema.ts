import { DraftLayout } from './DraftLayout';
import { Layout } from './Layout';
import { LayoutForm } from './Form';

// 布局组件 Schema
// 作为一个容器组件，用于包裹其他子组件，提供布局能力（Grid/Flex）
const layoutSchema = {
  type: "Layout",
  component: Layout, // 对应前端实现的渲染组件
  draftComponent: DraftLayout, // 对应画布中的预览组件
  formComponent: LayoutForm, // 对应属性配置表单
  // 核心标识：布局根容器
  // true 表示：这是一个必需的父级容器。
  // 在画布逻辑中，如果没有这个容器，普通的原子组件（如Button）不能直接被放置。
  // 它们必须被拖入到拥有此标识的组件内部。
  isLayoutRoot: true,
  
  // 组件的默认属性配置
  props: {
    // 布局模式：'grid' | 'flex'
    layoutType: "grid", 
    
    // Grid 模式下的配置 (对应 Antd Row)
    gutter: [4, 4], // [水平间距, 垂直间距]
    
    // Flex 模式下的配置
    justify: "start", // start | end | center | space-between | space-around
    align: "top",     // top | middle | bottom
    direction: "row", // row | column
    
    // 容器通用样式
    style: {
      width: "100%",
      minHeight: "20px",
      padding: "20px",
      margin: "0 auto",
      backgroundColor: "#ffffff",
      border: "1px solid #e5e5e5",
    },
    // draft 模式下的样式，如果有这个字段，在 draft 模式下会使用这个样式
    draftStyle: {
      width: "100%",
      minHeight: "20px",
      padding: "2px",
      margin: "0 auto",
      backgroundColor: "#f5f5f5",
    }
  },

  // 子组件插槽，所有被拖入的组件都放在这里
  children: [] 
};


export default layoutSchema;
