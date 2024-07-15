'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { ActiveEmail } from '@/components/email/active-email';
import { EmailList } from '@/components/email/email-list';
import { useCreateQueryString } from '@/hooks/use-create-query-string';

interface CommunicationsProps {
  supplierId: number;
  orderId?: number;
}

export function Communications(props: CommunicationsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const emailIdFromParams = Number(searchParams.get('email'));
  const createQueryString = useCreateQueryString(searchParams);

  // Set active email
  const [activeEmail, setActiveEmail] = useState<number | null>(
    emailIdFromParams,
  );

  const onSelectEmail = (id: number | null) => {
    if (!id) {
      return;
    }
    setActiveEmail(id);
    router.push(`${pathname}?${createQueryString('email', id.toString())}`, {
      scroll: false,
    });
  };

  const onDeselectEmail = () => {
    setActiveEmail(null);
    router.push(pathname, { scroll: false });
  };

  return activeEmail ? (
    <ActiveEmail
      emailId={activeEmail}
      onClose={onDeselectEmail}
      orderId={props.orderId}
      supplierId={props.supplierId}
    />
  ) : (
    <EmailList
      activeEmail={activeEmail}
      onSelectEmail={onSelectEmail}
      orderId={props.orderId}
      supplierId={props.supplierId}
    />
  );
}
