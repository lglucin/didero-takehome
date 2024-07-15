import { Slot } from '@radix-ui/react-slot';
import { tv, type VariantProps } from 'tailwind-variants';

const badge = tv({
  base: [
    'inline-flex',
    'items-center',
    'font-medium',
    'rounded-md',
    'ring-1',
    'ring-inset',
  ],
  variants: {
    variant: {
      gray: [
        'bg-gray-50',
        'text-gray-600',
        'ring-gray-600/20',

        'dark:bg-gray-400/10',
        'dark:text-gray-400',
        'ring-gray-400/20',
      ],
      yellow: [
        'bg-yellow-50',
        'text-yellow-800',
        'ring-yellow-600/20',

        'dark:bg-yellow-400/10',
        'dark:text-yellow-400',
        'dark:ring-yellow-400/20',
      ],
      red: [
        'bg-red-50',
        'text-red-700',
        'ring-red-600/20',

        'dark:bg-red-400/10',
        'dark:text-red-400',
        'dark:ring-red-400/20',
      ],
      green: [
        'bg-green-50',
        'text-green-700',
        'ring-green-600/20',

        'dark:bg-green-500/10',
        'dark:text-green-400',
        'dark:ring-green-400/20',
      ],
      blue: [
        'bg-sky-50',
        'text-sky-700',
        'ring-sky-600/20',

        'dark:bg-sky-400/10',
        'dark:text-sky-400',
        'dark:ring-sky-400/20',
      ],
      purple: [
        'bg-purple-50',
        'text-purple-700',
        'ring-purple-600/20',

        'dark:bg-purple-400/10',
        'dark:text-purple-400',
        'dark:ring-purple-400/20',
      ],
      pink: [
        'bg-pink-50',
        'text-pink-700',
        'ring-pink-600/20',

        'dark:bg-pink-400/10',
        'dark:text-pink-400',
        'dark:ring-pink-400/20',
      ],
      orange: [
        'bg-orange-50',
        'text-orange-700',
        'ring-orange-600/20',

        'dark:bg-orange-400/10',
        'dark:text-orange-400',
        'dark:ring-orange-400/20',
      ],
    },
    size: {
      base: ['h-[22px]', 'pl-1.5', 'pr-1.5', 'text-sm'],
      large: ['h-8', 'px-3', 'text-lg'],
    },
  },
  defaultVariants: {
    variant: 'gray',
    size: 'base',
  },
});

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badge> {
  asChild?: boolean;
}

/**
  All purpose badge component
  */
function Badge(props: BadgeProps): JSX.Element {
  const { asChild, variant, className, size, ...rest } = props;
  const Comp = asChild ? Slot : 'span';
  return (
    <Comp
      className={badge({
        className,
        size,
        variant,
      })}
      {...rest}
    />
  );
}

export { Badge, type BadgeProps };
