'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { get } from '@/utils/api';
import { PurchaseOrder } from '@/types';

const OrdersList = () => {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await get<{ data: PurchaseOrder[] }>('orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Purchase Orders</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="mb-4">
              <Link href={`/orders/${order.id}`}>
                <span className="text-blue-500 hover:underline">
                  {order.poNumber} - {order.supplier?.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
};

export default OrdersList;
