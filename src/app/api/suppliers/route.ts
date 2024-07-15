import { inMemorySuppliers } from '@/stub';

export function GET() {
  if (inMemorySuppliers.length === 0) {
    return new Response('No orders found', { status: 404 });
  }

  return Response.json({ data: inMemorySuppliers });
}
