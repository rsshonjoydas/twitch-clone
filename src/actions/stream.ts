'use server';

import { Stream } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { getSelf } from '@/lib/auth-service';
import { db } from '@/lib/db';

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf();

    const selfStream = await db.stream.findUnique({
      where: {
        userId: self.id,
      },
    });

    if (!selfStream) {
      throw new Error('Stream not found');
    }

    const validData = {
      name: values.name,
      thumbnailUrl: values.thumbnailUrl,
      isChatEnabled: values.isChatEnabled,
      isChatFollowersOnly: values.isChatFollowersOnly,
      isChatDelayed: values.isChatDelayed,
    };

    const stream = await db.stream.update({
      where: {
        id: selfStream.id,
      },
      data: {
        ...validData,
      },
    });

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return stream;
  } catch {
    throw new Error('Internal Error');
  }
};
