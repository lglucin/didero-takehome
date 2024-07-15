'use client';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/button';
import { PageLayout } from '@/components/page-layout';
import { Stack } from '@/components/stack';

interface SubheaderProps {
  buttonsProps: SubheaderButtonProps[];
}

function Subheader({ buttonsProps }: SubheaderProps) {
  const pathname = usePathname();
  return (
    <PageLayout.Subheader className="px-2.5">
      <Stack align="center" direction="row" gap="2">
        {buttonsProps.map((p) => (
          <SubheaderButton key={p.href} {...p} selected={p.href === pathname} />
        ))}
      </Stack>
    </PageLayout.Subheader>
  );
}

interface SubheaderButtonProps {
  href: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  children?: React.ReactNode;
  value?: string;
  selected?: boolean;
}

/**
 * A custom button component used in the subheader section.
 */
function SubheaderButton({
  href,
  leadingIcon,
  trailingIcon,
  value,
  selected,
}: SubheaderButtonProps) {
  return (
    <Button
      asChild
      data-state={selected ? 'active' : 'inactive'}
      leadingIcon={leadingIcon}
      trailingIcon={trailingIcon}
      variant="ghost"
    >
      <NextLink href={href}>{value}</NextLink>
    </Button>
  );
}

export { Subheader, SubheaderButton, type SubheaderButtonProps };
