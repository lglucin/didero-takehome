'use client';

import * as React from 'react';

import { cn, SIDEBAR_WIDTH } from '@/utils';

import { ScrollArea } from './scroll-area';

function PageSidebar(props: React.PropsWithChildren) {
  return (
    <ScrollArea.Root
      className={cn(
        'flex',
        'flex-1',
        'flex-col',
        'border-r',
        'h-screen',

        'bg-gray-50',
        'dark:bg-gray-900/20',
        'border-gray-600/10',
        'dark:border-gray-400/10',
      )}
      style={{
        width: SIDEBAR_WIDTH,
        maxWidth: SIDEBAR_WIDTH,
      }}
    >
      <ScrollArea.Viewport
        className={cn(
          '[&>div]:!flex',
          '[&>div]:flex-col',
          '[&>div]:min-h-screen',
        )}
      >
        {props.children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical" />
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
}

export { PageSidebar };
