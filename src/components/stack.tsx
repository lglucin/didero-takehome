import { Slot } from '@radix-ui/react-slot';
import type { Ref } from 'react';
import { forwardRef } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

/**
  Renders a stack of elements with a gap in-between
  */
const stack = tv(
  {
    base: ['flex'],
    variants: {
      align: {
        baseline: ['items-baseline'],
        center: ['items-center', 'text-center'],
        end: ['items-end', 'text-right'],
        start: ['items-start', 'text-left'],
        stretch: ['items-stretch'],
      },
      direction: {
        row: ['flex-row'],
        col: ['flex-col'],
        'row-reverse': ['flex-row-reverse'],
        'col-reverse': ['flex-col-reverse'],
      },
      justify: {
        start: ['justify-start'],
        center: ['justify-center'],
        end: ['justify-end'],
        between: ['justify-between'],
      },
      gap: {
        '0': ['gap-0'],
        px: ['gap-px'],
        '0.5': ['gap-0.5'],
        '1': ['gap-1'],
        '1.5': ['gap-1.5'],
        '2': ['gap-2'],
        '2.5': ['gap-2.5'],
        '3': ['gap-3'],
        '3.5': ['gap-3.5'],
        '4': ['gap-4'],
        '4.5': ['gap-4.5'],
        '5': ['gap-5'],
        '6': ['gap-6'],
        '7': ['gap-7'],
        '8': ['gap-8'],
        '9': ['gap-9'],
        '10': ['gap-10'],
        '11': ['gap-11'],
        '12': ['gap-12'],
        '14': ['gap-14'],
        '16': ['gap-16'],
        '20': ['gap-20'],
        '24': ['gap-24'],
        '28': ['gap-28'],
        '32': ['gap-32'],
        '36': ['gap-36'],
        '40': ['gap-40'],
        '44': ['gap-44'],
        '48': ['gap-48'],
        '52': ['gap-52'],
        '56': ['gap-56'],
        '60': ['gap-60'],
        '64': ['gap-64'],
        '72': ['gap-72'],
        '80': ['gap-80'],
        '96': ['gap-96'],
      },
      width: {
        full: ['w-full'],
      },
    },
    defaultVariants: {
      align: 'start',
      direction: 'col',
    },
  },
  {
    responsiveVariants: true,
  },
);

interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stack> {
  asChild?: boolean;
}

const Stack = forwardRef(function Stack(
  props: StackProps,
  ref: Ref<HTMLDivElement>,
) {
  const { asChild, align, className, gap, width, direction, justify, ...rest } =
    props;
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      className={stack({
        align,
        className,
        direction,
        gap,
        justify,
        width,
      })}
      ref={ref}
      {...rest}
    />
  );
});

export { Stack, type StackProps };
