'use client';

import { Skeleton } from '@/components/ui/skeleton';

import { ChatToggle } from './chat-toggle';
import { VariantToggle } from './variant-toggle';

export const ChatHeader = () => (
  <div className='relative border-b p-3'>
    <div className='absolute left-2 top-2 hidden lg:block'>
      <ChatToggle />
    </div>
    <p className='text-priamry text-center font-semibold'>Stream Chat</p>
    <div className='absolute right-2 top-2'>
      <VariantToggle />
    </div>
  </div>
);

export const ChatHeaderSkeleton = () => (
  <div className='relative hidden border-b p-3 md:block'>
    <Skeleton className='absolute left-3 top-3 h-6 w-6' />
    <Skeleton className='mx-auto h-6 w-28' />
  </div>
);
