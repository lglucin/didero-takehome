import React from 'react';

import { cn } from '@/utils';

function Skeleton(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        'isolate',
        'relative',
        'rounded-md',
        'overflow-hidden',
        'before:absolute',
        'before:inset-0',
        'before:-translate-x-full',
        'before:animate-[shimmer_1.25s_infinite]',
        'before:bg-gradient-to-r',
        'before:from-transparent',
        'before:to-transparent',

        'bg-gray-200/50',
        'before:via-gray-400/10',

        'dark:bg-gray-800/50',
        'dark:before:via-gray-600/10',
        className,
      )}
      {...rest}
    />
  );
}

export { Skeleton };
