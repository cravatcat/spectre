# Project Context

## Purpose

Spectre is a **dynamic form builder and low-code platform** designed to generate complex UI forms from JSON schemas. It aims to simplify the creation of data-driven applications by decoupling the UI definition from the rendering logic. The project supports visual construction of forms (implied by drag-and-drop dependencies) and schema-based rendering using Ant Design components.

## Tech Stack

- **Core Framework:** React 19, TypeScript, Vite
- **Routing:** React Router 7
- **UI Component Library:** Ant Design (antd)
- **Styling:** Tailwind CSS 4, clsx, tailwind-merge
- **State Management:** Use `use-mutative` or `zustand` (with mutative middleware) for complex state updates to ensure immutability with better performance than Immer.
- **Drag & Drop:** @dnd-kit (core, sortable, utilities) - Chosen for flexibility, performance, and modern hook-based API.
- **Icons:** Lucide React
- **Build Tool:** Vite (swc)

## Project Conventions

### Code Style

- **Functional Components:** All components are written as React functional components using Hooks.
- **TypeScript:** Strict typing is encouraged. Interfaces and types should be defined for component props and data structures (e.g., schema definitions).
- **Styling:**
  - Use **Tailwind CSS** for layout, spacing, and typography.
  - Use **Ant Design** for complex interactive components (Forms, Inputs, Selects, etc.).
  - Utility classes like `clsx` and `tailwind-merge` are used for dynamic class name generation.
- **State Management:** Use `use-mutative` or `zustand` (with mutative middleware) for complex state updates. Avoid `immer`.

### Architecture Patterns

- **Schema-Driven UI:** The application's core logic revolves around interpreting JSON schemas to render React components.
- **Global State (Zustand):** Used for sharing schema state and UI state (e.g., selected component) across the Layout panels (Sidebar, Canvas, Properties) to avoid prop drilling.
- **Layout Composition:**
  - `HostLayout`: Provides the main application structure (Header + Content).
  - `ThreeColumnLayout`: Implements a workspace layout with left (sidebar), center (canvas/preview), and right (properties) panels.
- **Component Abstraction:** Components are designed to be generic and configurable via props or schema definitions.


### Testing Strategy

- Currently, no specific testing framework (like Jest or Vitest) is explicitly configured in `package.json` scripts beyond the default build checks.
- *Recommendation:* Implement unit tests for schema parsing logic and component rendering.

### Git Workflow

- Standard feature-branch workflow is assumed.
- Commit messages should be clear and descriptive.

## Domain Context

## Important Constraints

- **Ant Design Dependency:** The rendering engine is tightly coupled with Ant Design.
- **Tailwind v4:** The project uses the latest Tailwind CSS v4.

## External Dependencies

- **Ant Design:** Primary UI library.
- **Tailwind CSS:** Utility-first CSS framework.
- **@dnd-kit:** Toolkit for drag-and-drop interfaces.
