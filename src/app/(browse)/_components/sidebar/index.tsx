import { getFollowedUsers } from '@/lib/follow-service';
import { getRecommended } from '@/lib/recommended-service';

import { Separator } from '@/components/ui/separator';
import { Following, FollowingSkeleton } from './following';
import { Recommended, RecommendedSkeleton } from './recommended';
import { Toggle, ToggleSkeleton } from './toggle';
import { Wrapper } from './wrapper';

export const Sidebar = async () => {
  const recommended = await getRecommended();
  const following = await getFollowedUsers();

  return (
    <Wrapper>
      <Toggle />
      <div className='space-y-4 pt-4 lg:pt-0'>
        <Following data={following} />
        <Separator />
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => (
  <aside className='fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2D2E35] bg-background lg:w-60'>
    <ToggleSkeleton />
    <FollowingSkeleton />
    <RecommendedSkeleton />
  </aside>
);
