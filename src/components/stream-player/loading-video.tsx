import { Loader } from 'lucide-react';

interface LoadingVideoProps {
  label: string;
}

export const LoadingVideo = ({ label }: LoadingVideoProps) => (
  <div className='flex h-full flex-col items-center justify-center space-y-4'>
    <Loader className='h-10 w-10 animate-spin text-muted-foreground' />
    <p className='capitalize text-muted-foreground'>{label}</p>
  </div>
);
