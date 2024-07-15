import type { Item, PurchaseOrder, Supplier, TDateISO } from '@/types';
import { PurchaseOrderStatus } from '@/types';

let i = 0;

export const makeNewPo = (): PurchaseOrder => {
  const id = ++i;
  const now = new Date().toISOString() as TDateISO;

  return {
    id,
    approvals: [],
    poNumber: `PO-${id}`,
    placedById: 1,
    shippingAddressLine1: '123 Fake Street',
    internalNotes: 'This is a stub purchase order',
    vendorNotes: 'This is a stub purchase order',
    orderStatus: PurchaseOrderStatus.Draft,
    placementTime: now,
    requestedShipDate: null,
    items: [],
  };
};

export const inMemoryOrders: PurchaseOrder[] = [
  makeNewPo(),
  makeNewPo(),
  makeNewPo(),
];

let y = 0;
export const makeFakeSupplier = (name: string): Supplier => {
  const now = new Date().toISOString() as TDateISO;
  const formattedName = name.replace(/\s+/g, '-').toLowerCase();

  return {
    id: ++y,
    name,
    websiteUrl: `http://www.${formattedName}.com`,
    address: '123 Test Street',
    avatarUrl: `http://www.${formattedName}.com/avatar.jpg`,
    description: 'This is a test supplier',
    lastContact: now,
    domains: [`${formattedName}.com`],
    createdAt: now,
    modifiedAt: now,
    addressCity: 'Test City',
    addressCountry: 'Test Country',
    addressLine1: '123 Test Street',
    addressLine2: 'Suite 1',
    addressPostCode: '12345',
    addressRegion: 'Test Region',
  };
};

export const inMemorySuppliers: Supplier[] = [
  makeFakeSupplier('Supplier 1'),
  makeFakeSupplier('Supplier 2'),
  makeFakeSupplier('Supplier 3'),
  makeFakeSupplier('Supplier 4'),
  makeFakeSupplier('Supplier 5'),
];

export const makeFakeItem = (supplierId: number, itemName: string): Item => {
  return {
    id: Math.random().toString(36).substring(2),
    supplierId,
    itemName,
    itemSku: itemName.replace(/\s+/g, '-').toUpperCase(),
    price: Math.floor(Math.random() * 100),
    priceCurrency: 'USD',
  };
};

export const inMemoryItems: Item[] = [
  ...inMemorySuppliers.flatMap((supplier) =>
    Array.from({ length: 5 }, (_, i) =>
      makeFakeItem(supplier.id, `Item ${i + 1}`),
    ),
  ),
];
