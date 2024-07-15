import { inMemoryItems } from '@/stub';

export function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const supplierItems = inMemoryItems.filter(
    (item) => item.supplierId === Number(id),
  );

  if (supplierItems.length === 0) {
    return new Response('No items found for this supplier', { status: 404 });
  }

  return Response.json({ data: supplierItems });
}
