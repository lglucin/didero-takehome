import { inMemoryOrders } from '@/stub';
import type { PurchaseOrder } from '@/types';

export function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const order = inMemoryOrders.find((o) => o.id === Number(id));
  return Response.json({ data: order });
}

export function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const orderIndex = inMemoryOrders.findIndex((o) => o.id === Number(id));

  if (orderIndex === -1) {
    return new Response(JSON.stringify({ error: 'Order not found' }), {
      status: 404,
    });
  }

  const deletedOrder = inMemoryOrders.splice(orderIndex, 1);
  return Response.json({ data: deletedOrder[0] });
}

export function PATCH(
  req: Request,
  { params, body }: { params: { id: string }; body: PurchaseOrder },
) {
  const id = params.id;
  const orderIndex = inMemoryOrders.findIndex((o) => o.id === Number(id));

  if (orderIndex === -1) {
    return new Response(JSON.stringify({ error: 'Order not found' }), {
      status: 404,
    });
  }

  inMemoryOrders[orderIndex] = { ...inMemoryOrders[orderIndex], ...body };
  return Response.json({ data: inMemoryOrders[orderIndex] });
}
