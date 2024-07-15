'use client';

import type { TabsContentProps } from '@radix-ui/react-tabs';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

import type { ButtonProps } from '@/components/button';
import { Button } from '@/components/button';
import { cn } from '@/utils';

const List = React.forwardRef(function List(
  props: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { className, ...rest } = props;
  return (
    <TabsPrimitive.List
      className={cn('inline-flex items-center justify-center gap-2', className)}
      ref={ref}
      {...rest}
    />
  );
});

const Trigger = React.forwardRef(function Trigger(
  props: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
    ButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const { children, value, variant, leadingIcon } = props;
  return (
    <Button asChild leadingIcon={leadingIcon} variant={variant}>
      <TabsPrimitive.Trigger ref={ref} value={value}>
        {children}
      </TabsPrimitive.Trigger>
    </Button>
  );
});

const Content = React.forwardRef(function Content(
  props: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { className, ...rest } = props;
  return (
    <TabsPrimitive.Content
      className={cn(
        'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
});

const Tabs = {
  Root: TabsPrimitive.Root,
  List,
  Trigger,
  Content,
};

export { Tabs, type TabsContentProps };
