import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const separator = tv({
  base: ['bg-gray-600/10', 'dark:bg-gray-400/10'],
  variants: {
    direction: {
      horizontal: ['h-px', 'w-full'],
      vertical: ['h-full', 'w-px'],
    },
  },
  defaultVariants: {
    direction: 'horizontal',
  },
});

type SeparatorProps = VariantProps<typeof separator> & {
  className?: string;
};

function Separator(props: SeparatorProps) {
  const { className, direction } = props;
  return <div className={separator({ className, direction })} />;
}

export { Separator, type SeparatorProps };
