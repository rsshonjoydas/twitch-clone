'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

const ErrorPage = () => (
  <div className='flex h-full flex-col items-center justify-center space-y-4 text-muted-foreground'>
    <p>Something went wrong</p>
    <Button variant='secondary' asChild>
      <Link href='/'>Go back home</Link>
    </Button>
  </div>
);

export default ErrorPage;
