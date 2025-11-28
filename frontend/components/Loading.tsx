export const Loading = () => {
  return (
    <div className='flex min-h-[400px] items-center justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <div className='border-primary h-12 w-12 animate-spin rounded-full border-b-2'></div>
        <p className='text-muted-foreground'>Loading...</p>
      </div>
    </div>
  );
};
