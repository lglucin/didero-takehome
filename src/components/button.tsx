import { Slot, Slottable } from '@radix-ui/react-slot';
import type { ButtonHTMLAttributes } from 'react';
import React, { forwardRef } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import {
  ChildrenWithIcon,
  type ChildrenWithIconProps,
} from '@/components/children-with-icon';

const baseButtonStyles = [
  // Basic reset
  'appearance-none',
  'bg-transparent',
  'cursor-pointer',
  'ring-1',
  'ring-transparent',
  'select-none',

  // Layout
  'py-0',
  'flex',
  'box-border',
  'items-center',
  'justify-center',

  // Typography
  'font-sans',
  'font-medium',
  'text-center',
  'no-underline',
  'tracking-snug',

  // Transition
  'duration-300',
  'ease-smooth',
  'transition-combined',
  'will-change-transform',

  // Repeated active styles
  'active:translate-y-px',
  'active:outline-transparent',

  // Repeated focus styles
  'focus-visible:outline-none',
  'focus-visible:outline-gray-300',

  // It's easier to replicate the disabled state across all variants
  'disabled:pointer-events-none',
  'disabled:opacity-50',
];

const primaryButtonStyles = [
  'border-none',
  'bg-gray-900',
  'text-gray-50',
  'ring-gray-900',

  'dark:bg-gray-100',
  'dark:text-gray-950',
  'dark:ring-gray-100',

  // Hover state
  'hover:shadow-md',
  'hover:bg-gray-950',
  'hover:ring-gray-950',
  'hover:-translate-y-px',

  // Active state
  'active:shadow-none',
];

const secondaryButtonStyles = [
  'bg-white',
  'text-gray-950',
  'ring-gray-600/20',
  'shadow-sm-longer',
  'border-none',

  'dark:bg-gray-950',
  'dark:text-gray-50',
  'dark:ring-gray-400/20',

  // Hover state
  'hover:bg-gray-50',
  'hover:shadow-md',
  'hover:ring-gray-600/40',
  'hover:-translate-y-px',

  'dark:hover:bg-gray-900/50',
  'dark:hover:ring-gray-400/40',

  // Focus state
  'focus-visible:ring-gray-600',
  'dark:focus-visible:ring-gray-400',

  // Active state
  'active:bg-gray-100',
  'active:ring-gray-600/25',
  'active:shadow-sm-longer',

  'dark:active:bg-gray-900/25',
  'dark:active:ring-gray-400/25',

  // Pressed state (for popovers etc)
  'data-[state=open]:bg-gray-100',
  'data-[state=open]:ring-gray-600/40',
  'data-[state=open]:hover:shadow-sm-longer',
  'data-[state=open]:hover:translate-y-0',
  'data-[state=open]:hover:bg-gray-200/75',
  'data-[state=open]:hover:ring-gray-600/50',
];

const ghostButtonStyles = [
  'bg-transparent',
  'text-gray-950',
  'dark:text-gray-50',

  // Hover state
  'hover:bg-gray-400/20',
  'hover:ring-gray-400/20',
  'active:bg-gray-400/40',
  'active:ring-transparent',

  'hover:dark:bg-gray-600/20',
  'hover:dark:ring-gray-600/20',
  'active:dark:bg-gray-600/40',

  // Focus state
  'focus-visible:ring-gray-600',

  // Pressed state (for popovers etc)
  'data-[state=open]:bg-gray-400/10',
  'data-[state=open]:ring-gray-400/10',
  'data-[state=open]:hover:ring-gray-400/20',
  'data-[state=open]:hover:bg-gray-400/20',

  'data-[state=active]:bg-gray-400/10',
  'data-[state=active]:ring-gray-400/10',
  'data-[state=active]:hover:ring-gray-400/20',
  'data-[state=active]:hover:bg-gray-400/20',
];

const dangerButtonStyles = [
  'bg-red-600',
  'text-white',
  'ring-red-600',

  'dark:bg-red-500',
  'dark:ring-red-500',

  // Hover state
  'hover:shadow-md',
  'hover:bg-red-700',
  'hover:ring-red-700',
  'hover:-translate-y-px',

  'dark:hover:bg-red-400',
  'dark:hover:ring-red-400',

  // Active state
  'active:shadow-none',
];

const mdButtonSizeStyles = [
  'h-8',
  'leading-8',

  'pl-2.5',
  'pr-2.5',
  'gap-1.5',
  'text-sm',
  'rounded-lg',

  // Tailwind doesn't work with dynamically generated classes so we'll
  // have to hardcode the class name here. It is defined in ./children-with-icon
  '[&>.children-with-icon--icon>svg]:h-4.5',
  '[&>.children-with-icon--icon>svg]:w-4.5',
];

const button = tv({
  base: ['truncate', ...baseButtonStyles],
  variants: {
    variant: {
      base: [],
      primary: primaryButtonStyles,
      secondary: secondaryButtonStyles,
      ghost: ghostButtonStyles,
      danger: dangerButtonStyles,
    },
    size: {
      base: [],
      md: mdButtonSizeStyles,
      pill: [
        'h-[22px]',
        'pl-[3px]',
        'pr-1.5',
        'rounded-full',
        'gap-[3px]',
        'text-sm',

        // Tailwind doesn't work with dynamically generated classes so we'll
        // have to hardcode the class name here. It is defined in ./children-with-icon
        '[&>.children-with-icon--icon>svg]:h-4',
        '[&>.children-with-icon--icon>svg]:w-4',
      ],
    },
    width: {
      full: ['w-full'],
    },
    leadingIcon: {
      true: [],
      false: [],
    },
    trailingIcon: {
      true: [],
      false: [],
    },
    standaloneIcon: {
      true: ['pl-0', 'pr-0'],
      false: [],
    },
  },
  compoundVariants: [
    // Standalone icon
    {
      className: 'w-8',
      size: 'md',
      standaloneIcon: true,
    },
    // Leading icon
    {
      className: 'pl-2',
      size: 'md',
      leadingIcon: true,
    },
    // Trailing icon
    {
      className: 'pr-2',
      size: 'md',
      trailingIcon: true,
    },
  ],
  defaultVariants: {
    variant: 'secondary',
    size: 'md',
  },
});

type ButtonVariantProps = Omit<
  VariantProps<typeof button>,
  'leadingIcon' | 'trailingIcon' | 'standaloneIcon'
>;

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps,
    ChildrenWithIconProps {
  asChild?: boolean;
  isLoading?: boolean;
}

/**
  All purpose button component with icon support
  */
const Button = forwardRef(function Button(
  props: ButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const {
    asChild,
    children,
    className,
    disabled,
    isLoading,
    leadingIcon,
    size,
    standaloneIcon,
    trailingIcon,
    type = 'button',
    variant,
    width,
    ...rest
  } = props;
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={button({
        className,
        leadingIcon: (Boolean(leadingIcon) || isLoading) && !standaloneIcon,
        size,
        standaloneIcon: Boolean(standaloneIcon),
        trailingIcon: Boolean(trailingIcon) && !isLoading && !standaloneIcon,
        variant,
        width,
      })}
      disabled={disabled || isLoading}
      ref={ref}
      type={type}
      {...rest}
    >
      {isLoading ? (
        <ChildrenWithIcon.Loader />
      ) : (
        <>
          {standaloneIcon || leadingIcon ? (
            <ChildrenWithIcon.Icon>
              {standaloneIcon || leadingIcon}
            </ChildrenWithIcon.Icon>
          ) : null}
        </>
      )}
      <Slottable>{children}</Slottable>
      {!isLoading && !standaloneIcon && trailingIcon ? (
        <ChildrenWithIcon.Icon>{trailingIcon}</ChildrenWithIcon.Icon>
      ) : null}
    </Comp>
  );
});

export {
  baseButtonStyles,
  dangerButtonStyles,
  ghostButtonStyles,
  mdButtonSizeStyles,
  primaryButtonStyles,
  secondaryButtonStyles,
};

export { Button, type ButtonProps };
