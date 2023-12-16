import { getSelf } from '@/lib/auth-service';
import { db } from '@/lib/db';

export const getRecommended = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) {
    const followingUserIds = await db.follow
      .findMany({
        where: {
          followerId: userId,
        },
      })
      .then((follows) => follows.map((follow) => follow.followingId));

    const blockedUserIds = await db.block
      .findMany({
        where: {
          blockedId: userId,
        },
      })
      .then((blockings) => blockings.map((blocking) => blocking.blockerId));

    users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: {
                in: [...followingUserIds, ...blockedUserIds, userId], // Exclude current user, following users, and blocked users from recommended list
              },
            },
          },
        ],
      },
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } else {
    users = await db.user.findMany({
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  return users;
};
