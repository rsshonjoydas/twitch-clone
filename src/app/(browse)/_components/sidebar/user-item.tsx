'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LiveBadge } from '@/components/live-badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar } from '@/components/user-avatar';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';

interface UserItemProps {
  username: string;
  imageUrl: string;
  isLive?: boolean;
}

export const UserItem = ({ username, imageUrl, isLive }: UserItemProps) => {
  const pathname = usePathname();

  const { collapsed } = useSidebar((state) => state);

  const href = `/${username}`;
  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant='ghost'
      className={cn(
        'h-12 w-full',
        collapsed ? 'justify-center' : 'justify-start',
        isActive && 'bg-accent'
      )}
    >
      <Link href={href}>
        <div className={cn('flex w-full items-center gap-x-4', collapsed && 'justify-center')}>
          <UserAvatar imageUrl={imageUrl} username={username} isLive={isLive} />
          {!collapsed && <p className='truncate'>{username}</p>}
          {!collapsed && isLive && <LiveBadge className='ml-auto' />}
        </div>
      </Link>
    </Button>
  );
};

export const UserItemSkeleton = () => (
  <li className='flex items-center gap-x-4 px-3 py-2'>
    <Skeleton className='min-h-[32px] min-w-[32px] rounded-full' />
    <div className='flex-1'>
      <Skeleton className='h-6' />
    </div>
  </li>
);
