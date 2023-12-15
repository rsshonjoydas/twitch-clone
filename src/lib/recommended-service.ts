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

    users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: {
                in: [...followingUserIds, userId], // Exclude current user from recommended list
              },
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  return users;
};
