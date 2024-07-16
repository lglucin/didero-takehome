'use client'

import React, { useState } from 'react';
import { PageLayout } from '@/components/page-layout';
import { Stack } from '@/components/stack';
import SupplierDropdown from '@/components/supplier-dropdown';
import ItemsDropdown from '@/components/items-dropdown';
import PurchaseOrderForm from '@/components/purchase-order-form';
import { Supplier } from '@/types';

export default function Dashboard() {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  return (
    <>
      <PageLayout.Header
        breadcrumbs={[
          {
            title: (
              <Stack align="center" direction="row" gap="1.5">
                Home
              </Stack>
            ),
            href: '/dashboard',
          },
        ]}
      />
      <Stack className="p-6" gap="8" width="full">
        <PurchaseOrderForm></PurchaseOrderForm>
      </Stack>
    </>
  );
}
