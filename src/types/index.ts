import type { TDateISO } from './datetime';

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
  ? RecursivePartial<U>[]
  : T[P] extends object | undefined
  ? RecursivePartial<T[P]>
  : T[P];
};

interface SupplierBasic {
  id: number;
  name: string;
  websiteUrl: string;
}

interface Supplier extends SupplierBasic {
  address: string;
  avatarUrl: string;
  description: string;
  lastContact: TDateISO | null;
  domains: string[];

  createdAt: TDateISO;
  modifiedAt: TDateISO;

  addressCity: string;
  addressCountry: string;
  addressLine1: string;
  addressLine2: string;
  addressPostCode: string;
  addressRegion: string;
}

interface Item {
  id: string;
  supplierId: number;
  itemName: string;
  itemSku: string;
  price: number;
  priceCurrency: string;
}
interface OrderItem {
  id: number;
  itemId: string;
  item: Item;
  price: number;
  quantity: number;
  priceCurrency: string;
  purchaseOrderId: number;
}

interface PurchaseOrderApproval {
  id: number;
  requestedAt: string | null;
  approvedAt: string | null;
  deniedAt: string | null;
}
interface PurchaseOrder {
  id: number;
  approvals: PurchaseOrderApproval[];
  poNumber: string;
  supplier?: Supplier;

  placedById: number;
  shippingAddressLine1: string;
  shippingAddressLine2?: string;
  internalNotes: string;
  vendorNotes: string;
  orderStatus: PurchaseOrderStatus;

  placementTime: TDateISO;
  requestedShipDate: TDateISO | null;
  items: OrderItem[];
  supplierId?: number | string;
}

enum PurchaseOrderStatus {
  Draft = 'draft',
  ApprovalPending = 'approval_pending',
  ApprovalDenied = 'approval_denied',
  Approved = 'approved',
  Issued = 'issued',
  Confirmed = 'confirmed',
  SupplierDenied = 'supplier_denied',
  Shipped = 'shipped',
  Received = 'received',
}

export {
  type Item,
  type OrderItem,
  type PurchaseOrder,
  type PurchaseOrderApproval,
  PurchaseOrderStatus,
  type RecursivePartial,
  type Supplier,
  type SupplierBasic,
  type TDateISO,
};
