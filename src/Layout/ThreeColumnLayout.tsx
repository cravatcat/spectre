import type { ReactNode } from "react";

interface ThreeColumnLayoutProps {
  left?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
}

export default function ThreeColumnLayout({ left, right, children }: ThreeColumnLayoutProps) {
  return (
    <div className="flex w-full h-full overflow-hidden">
      {left && (
        <aside className="w-64 flex-none border-r border-gray-200 bg-gray-50 overflow-y-auto hidden md:block">
          {left}
        </aside>
      )}
      
      <main className="w-120 min-w-0 overflow-y-auto bg-white">
        {children}
      </main>

      {right && (
        <aside className="flex-1 border-l border-gray-200 bg-gray-50 overflow-y-auto hidden lg:block">
          {right}
        </aside>
      )}
    </div>
  );
}
