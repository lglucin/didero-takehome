'use client';

import type { DialogProps as DialogPrimitiveProps } from '@radix-ui/react-dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { PropsWithChildren } from 'react';
import React from 'react';

import { CloseIcon } from '@/assets';
import { Button } from '@/components/button';
import { Heading } from '@/components/heading';
import { Stack } from '@/components/stack';
import { cn } from '@/utils';

interface BottomDrawerProps
  extends PropsWithChildren,
    Pick<DialogPrimitiveProps, 'onOpenChange' | 'open'> {
  trigger?: React.ReactNode;
}

function BottomDrawerBase(props: BottomDrawerProps) {
  const { children, trigger, ...rest } = props;
  return (
    <DialogPrimitive.Root modal={false} {...rest}>
      {trigger ? (
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      ) : null}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          className={cn(
            'ring-1',
            'shadow-2xl',

            'bg-white',
            'ring-gray-900/10',

            'z-50',
            'fixed',
            'bottom-0',
            'right-20',

            'dark:shadow-2xl',
            'dark:bg-gray-950',

            'flex',
            'flex-col',

            'w-screen',
            'max-w-xl',

            'h-[95vh]',
            'max-h-[720px]',
            'rounded-t-2xl',
            'overflow-hidden',

            'focus-visible:outline-none',

            'data-[state=open]:motion-safe:slide-in-from-bottom',
            'data-[state=closed]:motion-safe:slide-out-to-bottom',

            'data-[state=open]:motion-safe:animate-in',
            'data-[state=open]:motion-safe:duration-500',
            'data-[state=open]:motion-safe:ease-smooth',

            'data-[state=closed]:motion-safe:animate-out',
            'data-[state=closed]:motion-safe:duration-500',
            'data-[state=closed]:motion-safe:ease-smooth',
          )}
          onInteractOutside={(event) => {
            event.preventDefault();
          }}
          onPointerDownOutside={(event) => {
            event.preventDefault();
          }}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function CloseButton() {
  return (
    <DialogPrimitive.Close asChild>
      <Button standaloneIcon={<CloseIcon />} variant="ghost" />
    </DialogPrimitive.Close>
  );
}

interface HeaderProps {
  title: string;
}

function Header(props: HeaderProps) {
  const { title } = props;
  return (
    <Stack
      align="center"
      className="p-4 border-b border-gray-600/10"
      direction="row"
      justify="between"
    >
      <DialogPrimitive.Title asChild>
        <Heading>{title}</Heading>
      </DialogPrimitive.Title>
      <CloseButton />
    </Stack>
  );
}

const BottomDrawer = Object.assign(BottomDrawerBase, {
  Header,
  Close: DialogPrimitive.Close,
  CloseButton,
});

export { BottomDrawer };
