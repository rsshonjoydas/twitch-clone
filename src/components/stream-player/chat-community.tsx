'use client';

import { useParticipants } from '@livekit/components-react';
import { LocalParticipant, RemoteParticipant } from 'livekit-client';
import { useMemo, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

import { CommunityItem } from './community-item';

interface ChatCommunityProps {
  hostName: string;
  viewerName: string;
  isHidden: boolean;
}

export const ChatCommunity = ({ hostName, viewerName, isHidden }: ChatCommunityProps) => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce<string>(value, 500);

  const participants = useParticipants();

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce(
      (acc, participant) => {
        const hostAsViewer = `host-${participant.identity}`;
        if (!acc.some((p) => p.identity === hostAsViewer)) {
          acc.push(participant);
        }
        return acc;
      },
      [] as (RemoteParticipant | LocalParticipant)[]
    );

    return deduped.filter(
      (participant) => participant.name?.toLowerCase().includes(debouncedValue.toLowerCase())
    );
  }, [participants, debouncedValue]);

  if (isHidden) {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <p className='text-sm text-muted-foreground'>Community is disabled</p>
      </div>
    );
  }

  return (
    <div className='p-4'>
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder='Search community'
        className='border-white/10'
      />
      <ScrollArea className='mt-4 gap-y-2'>
        <p className='hidden p-2 text-center text-sm text-muted-foreground last:block'>
          No results
        </p>
        {filteredParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};
