import { cn } from '@/lib/utils';

interface LiveBadgeProps {
  className?: string;
}

export const LiveBadge = ({ className }: LiveBadgeProps) => (
  <div
    className={cn(
      'rounded-md border border-background bg-rose-500 p-0.5 px-1.5 text-center text-[10px] font-semibold uppercase tracking-wide',
      className
    )}
  >
    Live
  </div>
);
