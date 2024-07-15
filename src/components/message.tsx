import type { HTMLAttributes } from 'react';
import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import { WarningTriangleIcon } from '@/assets';
import type { TextProps } from '@/components/text';
import { Text } from '@/components/text';

const message = tv({
  base: ['py-4', 'px-5', 'rounded-lg', 'text-left', 'w-full'],
  variants: {
    variant: {
      gray: ['bg-gray-100', 'text-gray-800'],
      green: ['bg-green-100', 'text-green-800'],
      pink: ['bg-pink-100', 'text-pink-800'],
      red: ['bg-red-100', 'text-red-800'],
      yellow: ['bg-yellow-100', 'text-yellow-800'],
    },
  },
  defaultVariants: {
    variant: 'gray',
  },
});

interface MessageProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof message> {
  leadingIcon?: React.ReactNode;
  textSize?: TextProps['size'];
}

function Message(props: MessageProps) {
  const {
    children,
    variant,
    className,
    leadingIcon,
    textSize = 'sm',
    ...rest
  } = props;
  return (
    <div className={message({ className, variant })} {...rest}>
      <Text
        className="flex gap-3 [&>svg]:flex-none"
        leading="relaxed"
        size={textSize}
        variant="inherit"
      >
        {leadingIcon}
        <span className="[&>strong]:inline [&>strong]:font-semibold py-px">
          {children}
        </span>
      </Text>
    </div>
  );
}

function ErrorMessage(props: React.PropsWithChildren) {
  const { children } = props;
  return (
    <Message leadingIcon={<WarningTriangleIcon />} variant="red">
      {children}
    </Message>
  );
}

export { ErrorMessage, Message, type MessageProps };
