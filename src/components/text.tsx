import { Slot } from '@radix-ui/react-slot';
import { tv, type VariantProps } from 'tailwind-variants';

const text = tv(
  {
    variants: {
      align: {
        left: ['text-left'],
        center: ['text-center'],
        right: ['text-right'],
      },
      font: {
        sans: ['font-sans'],
        mono: ['font-mono'],
      },
      size: {
        xxs: ['text-xxs', 'tracking-snug'],
        xs: ['text-xs', 'tracking-snug'],
        '13': ['text-[13px]', 'tracking-snug'],
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
      variant: {
        primary: ['text-gray-950', 'dark:text-gray-50'],
        secondary: ['text-gray-600', 'dark:text-gray-400'],
        inherit: ['text-inherit'],
        error: ['text-red-600', 'dark:text-red-400'],
        warning: ['text-yellow-600', 'dark:text-yellow-400'],
        success: ['text-green-600', 'dark:text-green-400'],
        current: ['text-current'],
      },
      leading: {
        none: ['leading-none'],
        tight: ['leading-tight'],
        snug: ['leading-snug'],
        normal: ['leading-normal'],
        relaxed: ['leading-relaxed'],
        loose: ['leading-loose'],
      },
      weight: {
        regular: ['font-normal'],
        medium: ['font-medium'],
        semibold: ['font-semibold'],
        bold: ['font-bold'],
        extraBold: ['font-extrabold'],
      },
      truncate: {
        true: ['truncate', 'flex-grow', 'basis-0'],
        false: [],
      },
    },
    defaultVariants: {
      align: 'left',
      font: 'sans',
      variant: 'secondary',
    },
  },
  {
    responsiveVariants: true,
  },
);

interface TextProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof text> {
  asChild?: boolean;
}

/**
  To be used for all text elements
  */
function Text(props: TextProps): JSX.Element {
  const {
    align,
    asChild,
    className,
    font,
    leading,
    size,
    truncate,
    variant,
    weight,
    ...rest
  } = props;
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      className={text({
        align,
        className,
        font,
        leading,
        size,
        truncate,
        variant,
        weight,
      })}
      {...rest}
    />
  );
}

export { Text, type TextProps };
