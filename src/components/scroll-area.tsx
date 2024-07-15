'use client';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as React from 'react';

import { cn } from '@/utils';

const Root = React.forwardRef(function Root(
  props: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { className, ...rest } = props;
  return (
    <ScrollAreaPrimitive.Root
      className={cn('w-full', 'h-full', 'overflow-hidden', className)}
      ref={ref}
      {...rest}
    />
  );
});

const Viewport = React.forwardRef(function Viewport(
  props: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Viewport>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { className, ...rest } = props;
  return (
    <ScrollAreaPrimitive.Viewport
      className={cn(
        'w-full',
        'h-full',
        '[&>div]:!block',
        '[&>div]:min-h-full',
        '[&>div]:h-full',
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
});

const Scrollbar = React.forwardRef(function Scrollbar(
  props: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { className, orientation, ...rest } = props;
  return (
    <ScrollAreaPrimitive.Scrollbar
      className={cn(
        'data-[state=visible]:motion-safe:animate-in',
        'data-[state=visible]:motion-safe:fade-in',
        'data-[state=visible]:motion-safe:duration-300',

        'data-[state=hidden]:motion-safe:animate-out',
        'data-[state=hidden]:motion-safe:fade-out',
        'data-[state=hidden]:motion-safe:duration-500',

        // Scrollbar
        '[&>div]:bg-gray-600/10',
        'dark:[&>div]:bg-gray-400/10',

        '[&>div]:hover:bg-gray-600/20',
        '[&>div]:dark:hover:bg-gray-400/20',

        // Thumb
        '[&>div>div]:bg-gray-600/30',
        'dark:[&>div>div]:bg-gray-400/30',

        '[&>div>div]:hover:bg-gray-600/50',
        '[&>div>div]:dark:hover:bg-gray-400/50',

        'z-20',

        {
          'py-3': orientation === 'vertical',
          'px-2': orientation === 'vertical',

          'py-2': orientation === 'horizontal',
          'px-3': orientation === 'horizontal',
        },

        className,
      )}
      orientation={orientation}
      ref={ref}
      {...rest}
    >
      <div
        className={cn(
          'ease-smooth',
          'rounded-full',
          'duration-300',
          'transition-colors',
          {
            'w-1': orientation === 'vertical',
            'h-full': orientation === 'vertical',

            'h-1': orientation === 'horizontal',
            'w-full': orientation === 'horizontal',
          },

          className,
        )}
      >
        <ScrollAreaPrimitive.Thumb
          className={cn(
            'rounded-full',
            'duration-300',
            'ease-smooth',
            'transition-colors',
            {
              '!w-1': orientation === 'vertical',
              '!h-1': orientation === 'horizontal',
            },
          )}
          ref={ref}
          {...rest}
        />
      </div>
    </ScrollAreaPrimitive.Scrollbar>
  );
});

const ScrollAreaBase = React.forwardRef(function Scrollarea(
  props: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { children, ...rest } = props;
  return (
    <Root ref={ref} {...rest}>
      <Viewport>{children}</Viewport>
      <Scrollbar orientation="horizontal" />
      <Scrollbar orientation="vertical" />
    </Root>
  );
});

const ScrollArea = Object.assign(ScrollAreaBase, {
  Root,
  Viewport,
  Scrollbar,
  Corner: ScrollAreaPrimitive.Corner,
});

export { ScrollArea };
