import { Button } from '@/components/ui/button';

type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className='flex min-h-[400px] items-center justify-center'>
      <div className='max-w-md text-center'>
        <div className='mb-4'>
          <svg
            className='text-destructive mx-auto h-12 w-12'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            />
          </svg>
        </div>
        <h3 className='mb-2 text-lg font-semibold'>Something went wrong</h3>
        <p className='text-muted-foreground mb-6'>{message}</p>
        {onRetry && (
          <Button onClick={onRetry} variant='outline'>
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};
