import { Slot } from '@radix-ui/react-slot';
import { tv, type VariantProps } from 'tailwind-variants';

const body = tv({
  base: ['flex', 'flex-col', 'mx-auto', 'px-6'],
  variants: {
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
    size: {
      sm: ['max-w-sm'],
      md: ['max-w-md'],
      lg: ['max-w-lg'],
      '3xl': ['max-w-3xl'],
      '4xl': ['max-w-4xl'],
      '6xl': ['max-w-6xl'],
      '7xl': ['max-w-7xl'],
      '8xl': ['max-w-8xl'],
    },
  },
  defaultVariants: {
    size: '8xl',
  },
});

interface BodyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof body> {
  asChild?: boolean;
}

function Body(props: BodyProps): JSX.Element {
  const { asChild, size, className, gap, ...rest } = props;
  const Comp = asChild ? Slot : 'div';
  return <Comp className={body({ className, size, gap })} {...rest} />;
}

export { Body, type BodyProps };
