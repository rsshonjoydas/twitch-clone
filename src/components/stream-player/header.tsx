'use client';

import { useParticipants, useRemoteParticipant } from '@livekit/components-react';
import { UserIcon } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar, UserAvatarSkeleton } from '@/components/user-avatar';
import { VerifiedMark } from '@/components/verified-mark';

import { Actions, ActionsSkeleton } from './actions';

interface HeaderProps {
  imageUrl: string;
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  isFollowing: boolean;
  name: string;
}

export const Header = ({
  imageUrl,
  hostName,
  hostIdentity,
  viewerIdentity,
  isFollowing,
  name,
}: HeaderProps) => {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);

  const isLive = !!participant;
  const participantCount = participants.length - 1;

  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  return (
    <div className='flex flex-col items-start justify-between gap-y-4 px-4 lg:flex-row lg:gap-y-0'>
      <div className='flex items-center gap-x-3'>
        <UserAvatar imageUrl={imageUrl} username={hostName} size='lg' isLive={isLive} showBadge />
        <div className='space-y-1'>
          <div className='flex items-center gap-x-2'>
            <h2 className='text-lg font-semibold'>{hostName}</h2>
            <VerifiedMark />
          </div>
          <p className='text-sm font-semibold'>{name}</p>
          {isLive ? (
            <div className='flex items-center gap-x-1 text-xs font-semibold text-rose-500'>
              <UserIcon className='h-4 w-4' />
              <p>
                {participantCount} {participantCount === 1 ? 'viewer' : 'viewers'}
              </p>
            </div>
          ) : (
            <p className='text-xs font-semibold text-muted-foreground'>Offline</p>
          )}
        </div>
      </div>
      <Actions isFollowing={isFollowing} hostIdentity={hostIdentity} isHost={isHost} />
    </div>
  );
};

export const HeaderSkeleton = () => (
  <div className='flex flex-col items-start justify-between gap-y-4 px-4 lg:flex-row lg:gap-y-0'>
    <div className='flex items-center gap-x-2'>
      <UserAvatarSkeleton size='lg' />
      <div className='space-y-2'>
        <Skeleton className='h-6 w-32' />
        <Skeleton className='h-4 w-24' />
      </div>
    </div>
    <ActionsSkeleton />
  </div>
);
