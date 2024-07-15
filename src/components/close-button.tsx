import React, { forwardRef } from 'react';

import { CloseIcon } from '@/assets';
import type { ButtonProps } from '@/components/button';
import { Button } from '@/components/button';

const CloseButton = forwardRef(function CloseButton(
  props: Omit<ButtonProps, 'standaloneIcon'>,
  ref: React.Ref<HTMLButtonElement>,
) {
  return <Button ref={ref} standaloneIcon={<CloseIcon />} {...props} />;
});

export { CloseButton };
