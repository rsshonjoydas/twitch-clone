'use client';

import { Stream, User } from '@prisma/client';

import { useViewerToken } from '@/hooks/use-viewer-token';

interface StreamPlayerProps {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
}

export const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
  console.log(
    '🚀 ~ file: stream-player.tsx:14 ~ StreamPlayer ~ stream, isFollowing:',
    stream,
    isFollowing
  );
  const { token, name, identity } = useViewerToken(user.id);

  if (!token || !name || !identity) {
    return <div>Cannot watch the stream</div>;
  }

  return <div>Allowed to watch the stream</div>;
};
