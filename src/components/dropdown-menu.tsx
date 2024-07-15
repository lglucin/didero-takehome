import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Slottable } from '@radix-ui/react-slot';
import type { ComponentProps } from 'react';
import React, { forwardRef } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import {
  baseButtonStyles,
  ghostButtonStyles,
  mdButtonSizeStyles,
} from '@/components/button';
import {
  ChildrenWithIcon,
  type ChildrenWithIconProps,
} from '@/components/children-with-icon';

/**
 * Content
 */
const content = tv({
  base: [
    'z-20',
    'ring-1',
    'shadow-xl',
    'rounded-2xl',
    'overflow-auto',

    'p-2',
    'flex',
    'flex-col',
    'gap-0.5',
    'rounded-2xl',

    'bg-white',
    'dark:bg-gray-950',
    'ring-gray-600/10',

    'dark:bg-gray-950',
    'dark:text-gray-50',
    'dark:ring-gray-400/10',

    'data-[state=open]:motion-safe:animate-in',
    'data-[state=open]:motion-safe:fade-in',
    'data-[state=open]:motion-safe:slide-in-from-bottom-[-25px]',
    // 'data-[state=open]:motion-safe:zoom-in-[.9]',
    'data-[state=open]:motion-safe:duration-300',
    'data-[state=open]:motion-safe:ease-smooth',

    'data-[state=closed]:motion-safe:animate-out',
    'data-[state=closed]:motion-safe:fade-out',
    'data-[state=closed]:motion-safe:slide-out-to-bottom-[-25px]',
    // 'data-[state=closed]:motion-safe:zoom-out-[.9]',
    'data-[state=closed]:motion-safe:duration-300',
    'data-[state=closed]:motion-safe:ease-smooth',
  ],
  variants: {},
  defaultVariants: {},
});

interface ContentProps
  extends ComponentProps<typeof DropdownMenuPrimitive.Content>,
    VariantProps<typeof content> {}

function Content(props: ContentProps) {
  const { children, className, sideOffset = 10, ...rest } = props;
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        className={content({ className })}
        sideOffset={sideOffset}
        {...rest}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

/**
 * Select item
 */
const item = tv({
  base: [...baseButtonStyles, 'w-full', 'justify-start'],
  variants: {
    variant: {
      base: [],
      ghost: [...ghostButtonStyles, '!ring-0', '!outline-transparent'],
      danger: [
        ...ghostButtonStyles,
        '!ring-0',
        '!outline-transparent',

        'hover:text-red-900',
        'hover:bg-red-400/20',
        'hover:dark:text-red-100',
        'hover:dark:bg-red-600/20',
      ],
    },
    disabled: {
      true: ['pointer-events-none', 'opacity-50'],
      false: [],
    },
    size: {
      base: [],
      md: mdButtonSizeStyles,
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
    variant: 'ghost',
    size: 'md',
  },
});

type ItemVariantProps = Omit<
  VariantProps<typeof item>,
  'leadingIcon' | 'trailingIcon' | 'standaloneIcon'
>;

interface ItemProps
  extends ComponentProps<typeof DropdownMenuPrimitive.Item>,
    ItemVariantProps,
    ChildrenWithIconProps {
  asChild?: boolean;
}

const Item = forwardRef(function Item(
  props: ItemProps,
  forwardedRef: React.Ref<HTMLInputElement>,
) {
  const {
    className,
    leadingIcon,
    standaloneIcon,
    trailingIcon,
    size,
    variant,
    children,
    disabled,
    ...rest
  } = props;
  return (
    <DropdownMenuPrimitive.Item
      className={item({
        className,
        leadingIcon: Boolean(leadingIcon) && !standaloneIcon,
        size,
        disabled,
        standaloneIcon: Boolean(standaloneIcon),
        trailingIcon: Boolean(trailingIcon) && !standaloneIcon,
        variant,
      })}
      ref={forwardedRef}
      {...rest}
    >
      <>
        {standaloneIcon || leadingIcon ? (
          <ChildrenWithIcon.Icon>
            {standaloneIcon || leadingIcon}
          </ChildrenWithIcon.Icon>
        ) : null}
      </>

      <Slottable>{children}</Slottable>
      {!standaloneIcon && trailingIcon ? (
        <ChildrenWithIcon.Icon>{trailingIcon}</ChildrenWithIcon.Icon>
      ) : null}
    </DropdownMenuPrimitive.Item>
  );
});

function Separator() {
  return (
    <div className="px-2 my-1 w-full">
      <div className="bg-gray-600/10 dark:bg-gray-400/10 h-px w-full" />
    </div>
  );
}

const DropdownMenu = {
  Content,
  Item,
  Root: DropdownMenuPrimitive.Root,
  Separator,
  Trigger: DropdownMenuPrimitive.Trigger,
  Arrow: DropdownMenuPrimitive.Arrow,
  Portal: DropdownMenuPrimitive.Portal,
};

export { DropdownMenu };
