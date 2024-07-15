import NextLink from 'next/link';
import * as React from 'react';
import { Fragment } from 'react';

import { ChevronRightIcon } from '@/assets';
import { FullHeight } from '@/components/full-height';
import { Link } from '@/components/link';
import { Skeleton } from '@/components/skeleton';
import { Stack } from '@/components/stack';
import { cn, HEADER_HEIGHT } from '@/utils';

/**
 * Layout root
 */

function Root(props: React.PropsWithChildren) {
  return (
    <FullHeight asChild>
      <Stack className="items-stretch" direction="row">
        {props.children}
      </Stack>
    </FullHeight>
  );
}

/**
 * Base header
 */
const BaseHeader = React.forwardRef(function BaseHeader(
  props: React.HTMLAttributes<HTMLDivElement>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { className, style, ...rest } = props;
  return (
    <Stack align="center" asChild direction="row" gap="2.5" justify="between">
      <div
        className={cn(
          'border-b',
          'border-gray-600/10',
          'dark:border-gray-400/10',
          className,
        )}
        ref={ref}
        style={{ height: HEADER_HEIGHT, ...style }}
        {...rest}
      />
    </Stack>
  );
});

/**
 * Header
 */
export interface Breadcrumb {
  title?: string | React.ReactNode;
  href: string;
}

interface HeaderProps {
  breadcrumbs: Breadcrumb[];
  sticky?: boolean;
  action?: React.ReactNode;
}

function Header(props: HeaderProps) {
  const { breadcrumbs, action } = props;
  return (
    <BaseHeader className="pl-5 pr-3">
      <Stack align="center" direction="row" gap="1">
        {breadcrumbs.map((breadcrumb, index) => (
          <Fragment key={breadcrumb.href}>
            {index !== 0 && <ChevronRightIcon />}
            {breadcrumb.title ? (
              <Link asChild size="base" weight="semibold">
                <NextLink href={breadcrumb.href}>{breadcrumb.title}</NextLink>
              </Link>
            ) : (
              <Skeleton className="h-3 rounded-full w-20" />
            )}
          </Fragment>
        ))}
      </Stack>
      {action}
    </BaseHeader>
  );
}

/**
 * Body
 */
function Body(props: React.PropsWithChildren) {
  return (
    <Stack align="stretch" asChild className="flex-1">
      <main>{props.children}</main>
    </Stack>
  );
}

/**
 * ScrollPane
 */
const PageLayout = {
  Body,
  Header,
  Root,
  Subheader: BaseHeader,
};

export { PageLayout };
