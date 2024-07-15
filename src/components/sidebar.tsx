import type { LinkProps } from 'next/link';
import NextLink from 'next/link';
import { forwardRef } from 'react';

import type { ButtonProps } from '@/components/button';
import { Button as BaseButton } from '@/components/button';
import { Stack } from '@/components/stack';
import { Text } from '@/components/text';
import { cn } from '@/utils';

interface SectionProps {
  title?: string;
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

function Section(props: SectionProps) {
  const { title, children, size = 'sm' } = props;
  return (
    <Stack
      className={cn({
        'p-6': size === 'md',
        'py-3.5 px-2.5': size === 'sm',
      })}
      gap={size === 'sm' ? '3' : '4'}
      width="full"
    >
      {title ? (
        <Text className="text-gray-500 px-2.5" size="xs" weight="medium">
          {title}
        </Text>
      ) : null}
      <Stack gap="1" width="full">
        {children}
      </Stack>
    </Stack>
  );
}

function ButtonLink(props: ButtonProps & { href?: LinkProps['href'] }) {
  const { href, ...rest } = props;

  if (href) {
    return (
      <NextLink className="w-full" href={href}>
        <Button {...rest} />
      </NextLink>
    );
  }

  return <Button {...rest} />;
}

const Button = forwardRef(function Button(
  props: ButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  return (
    <BaseButton
      className="justify-start"
      ref={ref}
      variant="ghost"
      width="full"
      {...props}
    />
  );
});

const Sidebar = {
  Button,
  ButtonLink,
  Section,
};

export { Sidebar };
