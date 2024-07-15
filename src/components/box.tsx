import { cn } from '@/utils';

function Box(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        'ring-1',
        'w-full',
        'rounded-lg',
        'overflow-hidden',
        'shadow-sm-longer',

        'bg-white',
        'ring-gray-600/20',
        'dark:bg-gray-950',
        'dark:ring-gray-400/20',

        className,
      )}
      {...rest}
    />
  );
}

export { Box };
