import React from 'react';

import { Loader as LoaderPrimitive } from '@/components/loader';

const ICON_CLASSNAME = 'children-with-icon--icon';

interface ChildrenWithIconProps {
  children?: React.ReactNode;
  isLoading?: boolean;
  leadingIcon?: React.ReactNode;
  standaloneIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

/**
 * To used when you have to conditionally render a child with an icon next to it
 * and also show a loading state.
 */
function ChildrenWithIconBase(props: ChildrenWithIconProps) {
  const { isLoading, standaloneIcon, leadingIcon, trailingIcon, children } =
    props;

  if (isLoading && standaloneIcon) {
    return <Loader />;
  }

  if (!isLoading && standaloneIcon) {
    return <Icon>{standaloneIcon}</Icon>;
  }

  if (isLoading) {
    return (
      <>
        <Loader />
        {children}
      </>
    );
  }

  if (leadingIcon) {
    return (
      <>
        <Icon>{leadingIcon}</Icon>
        {children}
      </>
    );
  }

  if (trailingIcon) {
    return (
      <>
        {children}
        <Icon>{trailingIcon}</Icon>
      </>
    );
  }

  return <>{children}</>;
}

function Icon(props: Pick<ChildrenWithIconProps, 'children'>) {
  return <span className={ICON_CLASSNAME}>{props.children}</span>;
}

function Loader() {
  return (
    <Icon>
      <LoaderPrimitive className="animate-spin" />
    </Icon>
  );
}

const ChildrenWithIcon = Object.assign(ChildrenWithIconBase, {
  Icon,
  Loader,
});

export { ChildrenWithIcon, type ChildrenWithIconProps, ICON_CLASSNAME };
