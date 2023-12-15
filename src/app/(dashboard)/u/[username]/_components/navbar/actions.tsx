import { UserButton } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const Actions = () => (
  <div className='flex items-center justify-end gap-x-2'>
    <Button size='sm' variant='ghost' className='to-muted-foreground hover:text-primary' asChild>
      <Link href='/'>
        <LogOut className='mr-2 h-5 w-5' />
        Exit
      </Link>
    </Button>
    <UserButton afterSignOutUrl='/' />
  </div>
);
