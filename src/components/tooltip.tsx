import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React from 'react';
import { tv } from 'tailwind-variants';

const contentPrimitive = tv({
  base: [
    'rounded-md',
    'bg-gray-900/90',
    'px-2.5',
    'py-1.5',
    'text-xs',
    'font-medium',
    'text-gray-100',

    'data-[state=delayed-open]:motion-safe:animate-in',
    'data-[state=delayed-open]:motion-safe:fade-in',
    'data-[state=delayed-open]:motion-safe:duration-200',
    'data-[state=delayed-open]:motion-safe:ease-smooth',
    'data-[state=delayed-open]:motion-safe:slide-in-from-bottom-2',

    'data-[state=closed]:motion-safe:animate-out',
    'data-[state=closed]:motion-safe:fade-out',
    'data-[state=closed]:motion-safe:duration-200',
    'data-[state=closed]:motion-safe:ease-smooth',
    'data-[state=closed]:motion-safe:slide-out-to-bottom-2',

    'relative',
    'z-[600]', // TODO: {tailwind} Sort this out when we move away from z-indexes in the dashboard
  ],
  variants: {},
  defaultVariants: {},
});

function Content(props: TooltipPrimitive.TooltipContentProps) {
  const { className, ...rest } = props;
  return (
    <TooltipPrimitive.Content
      className={contentPrimitive({ className })}
      sideOffset={8}
      {...rest}
    />
  );
}

interface TooltipBaseProps {
  contentClassName?: string;
  children: React.ReactNode;
  content?: string | React.ReactNode;
  open?: boolean;
}

function TooltipBase(props: TooltipBaseProps) {
  const { children, content, open, contentClassName } = props;

  if (!content) {
    return <>{children}</>;
  }

  return (
    <TooltipPrimitive.Root open={open}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          className={contentPrimitive({ className: contentClassName })}
          sideOffset={8}
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

function Root(props: TooltipPrimitive.TooltipProps) {
  const { delayDuration = 0, ...rest } = props;
  return <TooltipPrimitive.Root delayDuration={delayDuration} {...rest} />;
}

const Tooltip = Object.assign(TooltipBase, {
  Provider: TooltipPrimitive.Provider,
  Root,
  Trigger: TooltipPrimitive.Trigger,
  Portal: TooltipPrimitive.Portal,
  Content,
});

export { Tooltip, type TooltipBaseProps };
