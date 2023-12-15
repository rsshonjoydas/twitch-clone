'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { CopyButton } from './copy-button';

interface KeyCardProps {
  value: string | null;
}

export const KeyCard = ({ value }: KeyCardProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className='rounded-xl bg-muted p-6'>
      <div className='flex items-start gap-x-10'>
        <p className='shrink-0 font-semibold'>Stream Key</p>
        <div className='w-full space-y-2'>
          <div className='flex w-full items-center gap-x-2'>
            <Input
              value={value || ''}
              type={show ? 'text' : 'password'}
              disabled
              placeholder='Stream key'
            />
            <CopyButton value={value || ''} />
          </div>
          <Button onClick={() => setShow(!show)} size='sm' variant='link'>
            {show ? 'Hide' : 'Show'}
          </Button>
        </div>
      </div>
    </div>
  );
};
