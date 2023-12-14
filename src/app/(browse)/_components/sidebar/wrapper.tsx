'use client';

import { useIsClient } from 'usehooks-ts';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';

import { RecommendedSkeleton } from './recommended';
import { ToggleSkeleton } from './toggle';

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const isClient = useIsClient();
  const { collapsed } = useSidebar((state) => state);

  if (!isClient) {
    return (
      <aside className='fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2D2E35] bg-background lg:w-60'>
        <ToggleSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  }

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
