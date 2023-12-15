'use server';

import {
  IngressAudioEncodingPreset,
  IngressClient,
  IngressInput,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  type CreateIngressOptions,
} from 'livekit-server-sdk';
import { revalidatePath } from 'next/cache';

import { TrackSource } from 'livekit-server-sdk/dist/proto/livekit_models';

import { getSelf } from '@/lib/auth-service';
import { db } from '@/lib/db';

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export const resetIngresses = async (hostIdentity: string) => {
  try {
    const ingresses = await ingressClient.listIngress({
      roomName: hostIdentity,
    });

    const rooms = await roomService.listRooms([hostIdentity]);

    await Promise.all(rooms.map((room) => roomService.deleteRoom(room.name)));

    const ingressIdsToDelete = ingresses
      .filter((ingress) => ingress.ingressId !== undefined)
      .map((ingress) => ingress.ingressId as string);

    await Promise.all(
      ingressIdsToDelete.map((ingressId) => ingressClient.deleteIngress(ingressId))
    );
  } catch {
    throw new Error('Error in reset ingresses');
  }
};

export const createIngress = async (ingressType: IngressInput) => {
  const self = await getSelf();

  await resetIngresses(self.id);

  const options: CreateIngressOptions = {
    name: self.username,
    roomName: self.id,
    participantName: self.username,
    participantIdentity: self.id,
  };

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true;
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    };
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
    };
  }

  const ingress = await ingressClient.createIngress(ingressType, options);

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error('Failed to create ingress');
  }

  await db.stream.update({
    where: { userId: self.id },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    },
  });

  revalidatePath(`/u/${self.username}/keys`);
  return ingress;
};
