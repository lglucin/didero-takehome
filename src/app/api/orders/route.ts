import { inMemoryOrders } from '@/stub';
import type { PurchaseOrder } from '@/types';

export function GET() {
  if (inMemoryOrders.length === 0) {
    return new Response('No orders found', { status: 404 });
  }

  return Response.json({ data: inMemoryOrders });
}

export async function POST(req: Request) {
  const newOrder: PurchaseOrder = await req.json();

  // Assuming newOrder is an object with the correct structure
  inMemoryOrders.push(newOrder);

  return Response.json({ data: newOrder });
}
