'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';

import {
  CheckmarkIcon,
  ChevronDownBigIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@/assets';
import { Button } from '@/components/button';
import { Heading } from '@/components/heading';
import { cn } from '@/utils';

const Trigger = React.forwardRef(function Trigger(
  props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
  ref: React.Ref<HTMLButtonElement>,
) {
  const { children, id } = props;
  return (
    <SelectPrimitive.Trigger asChild ref={ref}>
      <Button
        className="justify-between w-full"
        id={id}
        trailingIcon={
          <SelectPrimitive.Icon asChild>
            <ChevronDownBigIcon />
          </SelectPrimitive.Icon>
        }
      >
        {children}
      </Button>
    </SelectPrimitive.Trigger>
  );
});

const ScrollUpButton = React.forwardRef(function ScrollUpButton(
  props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { className, ...rest } = props;
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn(
        'flex',
        'py-1',
        'items-center',
        'cursor-default',
        'justify-center',
        className,
      )}
      ref={ref}
      {...rest}
    >
      <ChevronUpIcon className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
  );
});

const ScrollDownButton = React.forwardRef(function ScrollDownButton(
  props: React.ComponentPropsWithoutRef<
    typeof SelectPrimitive.ScrollDownButton
  >,
  ref: React.Ref<HTMLDivElement>,
) {
  const { className, ...rest } = props;
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn(
        'flex',
        'py-1',
        'items-center',
        'cursor-default',
        'justify-center',
        className,
      )}
      ref={ref}
      {...rest}
    >
      <ChevronDownIcon className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
  );
});

const Content = React.forwardRef(function Content(
  props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { className, children, position = 'popper', ...rest } = props;
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          'bg-white',
          'dark:bg-gray-950',

          'z-50',
          'ring-1',
          'relative',
          'max-h-96',
          'min-w-[8rem]',
          'overflow-hidden',

          'shadow-lg',
          'rounded-lg',
          'ring-gray-600/10',

          'dark:bg-gray-950',
          'dark:text-gray-50',
          'dark:ring-gray-400/10',

          'data-[state=open]:motion-safe:animate-in',
          'data-[state=open]:motion-safe:fade-in-0',
          'data-[state=open]:motion-safe:zoom-in-95',
          'data-[state=open]:motion-safe:duration-200',
          'data-[state=open]:motion-safe:ease-smooth',

          'data-[state=closed]:motion-safe:animate-out',
          'data-[state=closed]:motion-safe:fade-out-0',
          'data-[state=closed]:motion-safe:zoom-out-95',
          'data-[state=closed]:motion-safe:duration-200',
          'data-[state=closed]:motion-safe:ease-smooth',

          'data-[side=top]:motion-safe:slide-in-from-bottom-2',
          'data-[side=right]:motion-safe:slide-in-from-left-2',
          'data-[side=bottom]:motion-safe:slide-in-from-top-2',
          'data-[side=left]:motion-safe:slide-in-from-right-2',

          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        ref={ref}
        {...rest}
      >
        <ScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'gap-1',
            'p-1.5',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <ScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});

const Label = React.forwardRef(function Label(
  props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { className, ...rest } = props;
  return (
    <SelectPrimitive.Label
      asChild
      className={cn('h-8', 'leading-8', 'pl-2.5', 'pr-2.5', className)}
      ref={ref}
      {...rest}
    >
      <Heading size="sm" weight="bold">
        {props.children}
      </Heading>
    </SelectPrimitive.Label>
  );
});

const Item = React.forwardRef(function Item(
  props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { children, disabled, ...rest } = props;
  return (
    <SelectPrimitive.Item asChild ref={ref} {...rest}>
      <Button
        className="justify-between w-full !rounded font-normal text-gray-600 dark:text-gray-400"
        disabled={disabled}
        trailingIcon={
          <SelectPrimitive.ItemIndicator>
            <CheckmarkIcon className="h-4 w-4" />
          </SelectPrimitive.ItemIndicator>
        }
        variant="ghost"
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </Button>
    </SelectPrimitive.Item>
  );
});

const Separator = React.forwardRef(function Separator(
  props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { className, ...rest } = props;
  return (
    <SelectPrimitive.Separator
      className={cn(
        '-mx-1',
        'my-1',
        'h-px',
        'bg-gray-600/10',
        'dark:bg-gray-400/10',
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
});

const Select = {
  Content,
  Group: SelectPrimitive.Group,
  Item,
  Label,
  Root: SelectPrimitive.Root,
  ScrollDownButton,
  ScrollUpButton,
  Separator,
  Trigger,
  Value: SelectPrimitive.Value,
};

export { Select };
