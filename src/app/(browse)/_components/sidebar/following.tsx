/* eslint-disable react/no-array-index-key */

'use client';

import { Follow, User } from '@prisma/client';

import { useSidebar } from '@/store/use-sidebar';

import { UserItem, UserItemSkeleton } from './user-item';

interface FollowingProps {
  data: (Follow & { following: User })[];
}

export const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar((state) => state);

  if (!data.length) {
    return null;
  }

  return (
    <div>
      {!collapsed && (
        <div className='mb-4 pl-6'>
          <p className='text-sm text-muted-foreground'>Following</p>
        </div>
      )}
      <ul className='space-y-2 px-2'>
        {data.map((follow) => (
          <UserItem
            key={follow.following.id}
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => (
  <ul className='px-2 pt-2 lg:pt-0'>
    {[...Array(3)].map((_, i) => (
      <UserItemSkeleton key={i} />
    ))}
  </ul>
);
