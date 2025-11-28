import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='bg-background flex min-h-screen items-center justify-center'>
      <div className='max-w-md px-4 text-center'>
        <div className='mb-8'>
          <h1 className='text-primary text-9xl font-bold'>404</h1>
        </div>
        <h2 className='mb-4 text-3xl font-semibold'>Page Not Found</h2>
        <p className='text-muted-foreground mb-8'>
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className='flex justify-center gap-4'>
          <Button asChild>
            <Link href='/tasks'>Go to Tasks</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
