'use client';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useSidebar((state) => state);

  return (
    <aside
      className={cn(
        'fixed left-0 z-50 flex h-full w-60 flex-col border-r border-[#2D2E35] bg-background',
        collapsed && 'w-[70px]'
      )}
    >
      {children}
    </aside>
  );
};
