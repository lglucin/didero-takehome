import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import { Text } from '@/components/text';
import { cn } from '@/utils';

const root = tv({
  base: [
    // Basic root layout
    'flex',
    'flex-col',
    'relative',
    'items-start',

    // Controlling leading and trailing icons
    '[&>svg]:top-1/2',
    '[&>svg]:absolute',
    '[&>svg]:-translate-y-1/2',
    '[&>svg]:pointer-events-none',

    // Disabled state
    '[&>div>input:disabled]:cursor-not-allowed',
    '[&>div>textarea:disabled]:cursor-not-allowed',

    // Typography
    '[&>div>input]:font-body',
    '[&>div>textarea]:font-body',
  ],
  variants: {
    size: {
      base: [
        // Spacing the input composition elements
        'gap-2',

        // Label sizing
        `[&>label]:text-sm`,

        // Input sizing
        '[&>div>input]:h-[34px]', // To match the Button, which has 1px extra top/bottom
        '[&>div>input]:pl-2.5',
        '[&>div>input]:pr-2.5',
        '[&>div>input]:py-0',
        '[&>div>input]:rounded-lg',
        '[&>div>input]:text-sm',

        // Textarea sizing
        '[&>div>textarea]:pl-3',
        '[&>div>textarea]:pr-3',
        '[&>div>textarea]:py-2.5',
        '[&>div>textarea]:rounded-lg',
        '[&>div>textarea]:text-sm',
        '[&>div>textarea]:leading-normal',

        // Icon sizing
        '[&>svg]:h-4.5',
        '[&>svg]:w-4.5',
      ],
    },
    variant: {
      base: [
        '[&>div>input]:ring-0',
        '[&>div>input]:border-transparent',
        '[&>div>input]:placeholder-gray-600/60',
        'focus:[&>div>input]:border-transparent',
        'focus:[&>div>input]:outline-none',

        '[&>div>textarea]:ring-0',
        '[&>div>textarea]:border-transparent',
        '[&>div>textarea]:placeholder-gray-600/60',
        'focus:[&>div>textarea]:border-transparent',
        'focus:[&>div>textarea]:outline-none',
      ],
      primary: [
        // Default state
        '[&>div>input]:shadow-input--resting',
        '[&>div>input]:text-gray-950',
        '[&>div>input]:border-gray-600/20',
        '[&>div>input]:hover:border-gray-600/40',
        '[&>div>input]:placeholder-gray-600/60',

        '[&>div>input]:dark:text-gray-50',
        '[&>div>input]:dark:shadow-input--resting--dark',
        '[&>div>input]:dark:border-gray-400/20',
        '[&>div>input]:dark:hover:border-gray-400/40',

        '[&>div>textarea]:shadow-input--resting',
        '[&>div>textarea]:text-gray-950',
        '[&>div>textarea]:border-gray-600/20',
        '[&>div>textarea]:hover:border-gray-600/40',
        '[&>div>textarea]:placeholder-gray-600/60',

        '[&>div>textarea]:dark:shadow-input--resting--dark',
        '[&>div>textarea]:dark:text-gray-50',
        '[&>div>textarea]:dark:border-gray-400/20',
        '[&>div>textarea]:dark:hover:border-gray-400/40',

        // Focus
        'focus:[&>div>input]:border-gray-600',
        'focus:[&>div>input]:outline-none',
        'focus:[&>div>input]:shadow-input--focus',
        'focus:[&>div>input]:ring-0',

        'focus:[&>div>input]:dark:border-gray-400',
        'focus:[&>div>input]:dark:shadow-input--focus--dark',

        'focus:[&>div>textarea]:border-gray-600',
        'focus:[&>div>textarea]:outline-none',
        'focus:[&>div>textarea]:shadow-input--focus',
        'focus:[&>div>textarea]:ring-0',

        'focus:[&>div>textarea]:dark:border-gray-600',
        'focus:[&>div>textarea]:dark:shadow-input--focus--dark',

        // Disabled
        '[&>div>input:disabled]:pointer-events-none',
        '[&>div>input:disabled]:opacity-50',
        '[&>div>input:disabled]:hover:border-gray-600/20',
        '[&>div>input:disabled]:dark:hover:border-gray-400/20',

        '[&>div>textarea:disabled]:pointer-events-none',
        '[&>div>textarea:disabled]:opacity-50',
        '[&>div>textarea:disabled]:hover:border-gray-600/20',
        '[&>div>textarea:disabled]:dark:hover:border-gray-400/20',
      ],
    },
    leadingIcon: {
      true: [],
      false: [],
    },
    trailingIcon: {
      true: [],
      false: [],
    },
    width: {
      full: [
        'w-full',
        '[&>div]:w-full',
        '[&>div>input]:w-full',
        '[&>div>textarea]:w-full',
      ],
    },
  },
  compoundVariants: [
    {
      size: 'base',
      leadingIcon: true,
      className: [
        '[&>svg]:left-2',
        '[&>div>input]:pl-8',
        '[&>div>textarea]:pl-8',
      ],
    },
    {
      size: 'base',
      trailingIcon: true,
      className: [
        '[&>svg]:right-2',
        '[&>div>input]:pr-8',
        '[&>div>textarea]:pr-8',
      ],
    },
  ],
  defaultVariants: {
    size: 'base',
    variant: 'primary',
  },
});

const field = tv({
  base: [
    // Basic reset
    'appearance-none',
    'bg-transparent',
    'block',
    'box-border',
    'flex-1',
    'no-underline',
    'w-full',
    'border',
    'select-none',

    // Typography
    'font-regular',
    'text-ellipsis',
    'tracking-normal',

    // Transition
    'duration-300',
    'ease-smooth',
    'transition-combined',
  ],
});

const label = tv({
  base: ['font-body', 'flex', 'flex-col', 'tracking-normal'],
});

interface RootProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof root>, 'leadingIcon' | 'trailingIcon'> {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Root = forwardRef(function Root(
  props: RootProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    children,
    className,
    size,
    variant,
    width,
    leadingIcon,
    trailingIcon,
    ...rest
  } = props;
  return (
    <div
      className={root({
        className,
        size,
        variant,
        width,
        leadingIcon: Boolean(leadingIcon),
        trailingIcon: Boolean(trailingIcon),
      })}
      ref={ref}
      {...rest}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </div>
  );
});

type FieldProps = Required<
  Pick<React.InputHTMLAttributes<HTMLInputElement>, 'id'>
>;

const Field = forwardRef(function Field(
  props: React.InputHTMLAttributes<HTMLInputElement> &
    FieldProps & { parentClassName?: string },
  ref: React.Ref<HTMLInputElement>,
) {
  const { parentClassName, className, ...rest } = props;
  return (
    <div className={`${cn('w-full', parentClassName)}`}>
      <input className={field({ className })} ref={ref} {...rest} />
    </div>
  );
});

const Textarea = forwardRef(function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & FieldProps,
  ref: React.Ref<HTMLTextAreaElement>,
) {
  const { className, ...rest } = props;
  return (
    <div className="w-full">
      <textarea className={field({ className })} ref={ref} {...rest} />
    </div>
  );
});

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> &
  Required<Pick<React.LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>>;

function Label(props: LabelProps) {
  const { className, children, htmlFor, ...rest } = props;
  return (
    <Text asChild variant="primary" weight="medium">
      <label className={label({ className })} htmlFor={htmlFor} {...rest}>
        {children}
      </label>
    </Text>
  );
}

function Error(props: React.HTMLAttributes<HTMLSpanElement>) {
  const { children, ...rest } = props;
  return (
    <Text size="xs" variant="error" {...rest}>
      <p>{children}</p>
    </Text>
  );
}

function Info(props: React.HTMLAttributes<HTMLSpanElement>) {
  const { children, ...rest } = props;
  return (
    <Text size="xs" weight="regular" {...rest}>
      <p>{children}</p>
    </Text>
  );
}

export const Input = {
  Error,
  Field,
  Info,
  Label,
  Root,
  Textarea,
};
