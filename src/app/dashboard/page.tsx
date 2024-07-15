import { PageLayout } from '@/components/page-layout';
import { Stack } from '@/components/stack';
import SupplierDropdown from '@/components/supplier-dropdown';

export default function Dashboard() {
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
        <SupplierDropdown></SupplierDropdown>
      </Stack>
    </>
  );
}
