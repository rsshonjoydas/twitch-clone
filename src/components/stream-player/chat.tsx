/* eslint-disable no-shadow */

'use client';

import { useChat, useConnectionState, useRemoteParticipant } from '@livekit/components-react';
import { ConnectionState } from 'livekit-client';
import { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar';

import { ChatCommunity } from './chat-community';
import { ChatForm, ChatFormSkeleton } from './chat-form';
import { ChatHeader, ChatHeaderSkeleton } from './chat-header';
import { ChatList, ChatListSkeleton } from './chat-list';

interface ChatProps {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const Chat = ({
  hostName,
  hostIdentity,
  viewerName,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: ChatProps) => {
  const matches = useMediaQuery('(max-width: 1024px)');
  const { variant, onExpand } = useChatSidebar((state) => state);
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState('');
  const { chatMessages: messages, send } = useChat();

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const reversedMessages = useMemo(
    () => messages.sort((a, b) => b.timestamp - a.timestamp),
    [messages]
  );

  const onSubmit = () => {
    if (!send) return;

    send(value);
    setValue('');
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className='flex h-[calc(100vh-80px)] flex-col border-b border-l bg-background pt-0'>
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <ChatList messages={reversedMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <ChatCommunity viewerName={viewerName} hostName={hostName} isHidden={isHidden} />
      )}
    </div>
  );
};

export const ChatSkeleton = () => (
  <div className='flex h-[calc(100vh-80px)] flex-col border-2 border-b border-l pt-0'>
    <ChatHeaderSkeleton />
    <ChatListSkeleton />
    <ChatFormSkeleton />
  </div>
);
