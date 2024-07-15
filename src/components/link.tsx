import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const link = tv({
  base: [
    'cursor-pointer',
    'duration-300',
    'ease-smooth',
    'transition-combined',
    'will-change-transform',

    'focus-visible:rounded-sm',
    'focus-visible:outline',
    'focus-visible:outline-2',
    'focus-visible:outline-offset-4',
  ],
  variants: {
    size: {
      xs: ['text-xs', 'tracking-snug'],
      sm: ['text-sm', 'tracking-snug'],
      base: ['text-base', 'tracking-snug'],
      lg: ['text-lg', 'tracking-snug'],
      xl: ['text-xl', 'tracking-snug'],
      '2xl': ['text-2xl', 'tracking-snug'],
      '3xl': ['text-3xl', 'tracking-snug'],
      '4xl': ['text-4xl', 'tracking-snug'],
      '5xl': ['text-5xl', 'tracking-snug'],
      '6xl': ['text-6xl', 'tracking-snug'],
      '7xl': ['text-7xl', 'tracking-snug'],
      '8xl': ['text-8xl', 'tracking-snug'],
      '9xl': ['text-9xl', 'tracking-snug'],
    },
    font: {
      sans: ['font-sans'],
      mono: ['font-mono'],
    },
    variant: {
      primary: [
        'text-gray-950',
        'hover:text-gray-600',
        'focus-visible:outline-gray-950/10',

        'dark:text-gray-200',
        'dark:hover:text-gray-400',
        'dark:focus-visible:outline-gray-100/20',
      ],
      secondary: [
        'text-gray-600',
        'hover:text-gray-950',
        'focus-visible:outline-gray-950/10',

        'dark:text-gray-400',
        'dark:hover:text-gray-200',
        'dark:focus-visible:outline-gray-100/20',
      ],
      current: [
        'text-current',
        'hover:opacity-60',
        'focus-visible:outline-gray-950/10',
        'dark:focus-visible:outline-gray-100/20',
      ],
    },
    underline: {
      true: ['underline', 'underline-offset-[3px]'],
      false: [],
    },
    weight: {
      regular: ['font-normal'],
      medium: ['font-medium'],
      semibold: ['font-semibold'],
      bold: ['font-bold'],
    },
    truncate: {
      true: ['truncate', 'flex-grow', 'basis-0'],
      false: [],
    },
  },
  defaultVariants: {
    variant: 'primary',
    weight: 'medium',
    font: 'sans',
  },
});

interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof link> {
  asChild?: boolean;
}
/**
  All purpose link component
  */
const Link = forwardRef(function Link(
  props: LinkProps,
  ref: React.Ref<HTMLAnchorElement>,
) {
  const {
    asChild,
    children,
    className,
    font,
    size,
    underline,
    variant,
    weight,
    ...rest
  } = props;
  const Comp = asChild ? Slot : 'a';
  return (
    <Comp
      className={link({ className, size, variant, weight, font, underline })}
      ref={ref}
      {...rest}
    >
      {children}
    </Comp>
  );
});

export { Link, type LinkProps };
