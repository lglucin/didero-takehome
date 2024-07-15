'use client';

import type {
  CheckboxProps as CheckboxPrimitiveProps,
  CheckedState,
} from '@radix-ui/react-checkbox';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import { CheckmarkIcon, MinusIcon } from '@/assets';

const root = tv({
  base: [
    'flex',
    'items-center',
    'justify-center',
    'cursor-pointer',
    'ring-1',

    // Transition
    'duration-300',
    'ease-smooth',
    'transition-combined',
    'will-change-transform',

    // Repeated disabled styles
    'data-[disabled]:pointer-events-none',
    'data-[disabled]:opacity-50',

    // Repeated active styles
    'active:translate-y-px',
    'active:outline-transparent',
  ],
  variants: {
    variant: {
      primary: [
        'bg-white-900',
        'text-gray-900',
        'ring-gray-600/20',
        'shadow-sm',

        // Hover state
        'hover:bg-gray-50',
        'hover:shadow-md',
        'hover:ring-gray-600/40',

        // Focus state
        'focus-visible:ring-gray-600',
        'focus-visible:outline-none',
        'focus-visible:outline-gray-300',

        // Active state
        'active:bg-gray-100',
        'active:ring-gray-600/25',
        'active:shadow-sm',

        // Checked state
        'data-[state=checked]:bg-gray-900',
        'data-[state=checked]:text-gray-50',
        'data-[state=checked]:ring-gray-900',
      ],
    },
    size: {
      base: [
        'w-4',
        'h-4',
        'rounded-[5px]',
        '[&>span>svg]:w-4',
        '[&>span>svg]:h-4',
      ],
    },
  },
  defaultVariants: {
    size: 'base',
    variant: 'primary',
  },
});

type CheckboxProps = CheckboxPrimitiveProps &
  Required<Pick<CheckboxPrimitiveProps, 'checked' | 'onCheckedChange'>> &
  VariantProps<typeof root>;

function Checkbox(props: CheckboxProps) {
  const { checked, size, variant } = props;
  return (
    <CheckboxPrimitive.Root className={root({ size, variant })} {...props}>
      <CheckboxPrimitive.Indicator>
        {checked === 'indeterminate' && <MinusIcon />}
        {checked === true && <CheckmarkIcon />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox, type CheckboxProps, type CheckedState };
