import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const Logo = () => (
  <Link href='/'>
    <div className='flex items-center gap-x-4 transition hover:opacity-75'>
      <div className='mr-12 shrink-0 rounded-full bg-white p-1 lg:mr-0 lg:shrink'>
        <Image src='/spooky.svg' alt='Gamehub' height='32' width='32' />
      </div>
      <div className={cn('hidden lg:block', font.className)}>
        <p className='text-lg font-semibold'>Gamehub</p>
        <p className='text-xs text-muted-foreground'>Creator dashboard</p>
      </div>
    </div>
  </Link>
);
