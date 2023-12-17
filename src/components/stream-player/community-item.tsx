'use client';

import { MinusCircle } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { onBlock } from '@/actions/block';
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { cn, stringToColor } from '@/lib/utils';

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

export const CommunityItem = ({
  hostName,
  viewerName,
  participantIdentity,
  participantName,
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition();

  const color = stringToColor(participantName || '');
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return;

    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => toast.success(`Blocked ${participantName}`))
        .catch(() => toast.error('Something went wrong'));
    });
  };

  return (
    <div
      className={cn(
        'group flex w-full items-center justify-between rounded-md p-2 text-sm hover:bg-white/5',
        isPending && 'pointer-events-none opacity-50'
      )}
    >
      <p style={{ color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label='Block'>
          <Button
            variant='ghost'
            disabled={isPending}
            onClick={handleBlock}
            className='h-auto w-auto p-1 opacity-0 transition group-hover:opacity-100'
          >
            <MinusCircle className='h-4 w-4 text-muted-foreground' />
          </Button>
        </Hint>
      )}
    </div>
  );
};
