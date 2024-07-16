'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { get } from '@/utils/api';
import { PurchaseOrder } from '@/types';

const OrdersPage = () => {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await get<{ data: PurchaseOrder[] }>('orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-xl font-semibold">Loading orders...</h2>
          <p className="text-gray-500">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) return <div>No orders found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="border p-4 rounded-lg shadow">
            <Link href={`/orders/${order.id}`} className="text-blue-500 hover:underline">
              <h2 className="text-xl font-semibold">{order.poNumber}</h2>
            </Link>
            <p><strong>Supplier:</strong> {order.supplier?.name || 'N/A'}</p>
            <p><strong>Status:</strong> {order.orderStatus}</p>
            <p><strong>Placement Time:</strong> {order.placementTime}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
