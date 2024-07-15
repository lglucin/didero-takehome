'use client';

import { Slot } from '@radix-ui/react-slot';
import { use100vh } from 'react-div-100vh';

function FullHeight(
  props: React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean },
): JSX.Element {
  const { style, asChild, ...rest } = props;
  const height = use100vh();
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp style={{ height: height ? height : '100vh', ...style }} {...rest} />
  );
}

export { FullHeight };
