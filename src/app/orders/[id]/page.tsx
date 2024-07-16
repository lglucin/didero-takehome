'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { get } from '@/utils/api';
import { PurchaseOrder } from '@/types';

const OrderDetails = () => {
  const params = useParams();
  const { id } = params;
  const [order, setOrder] = useState<PurchaseOrder | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await get<{ data: PurchaseOrder }>(`orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Order Details</h1>
      <p><strong>PO Number:</strong> {order.poNumber}</p>
      <p><strong>Supplier:</strong> {order.supplier?.name}</p>
      <p><strong>Shipping Address:</strong> {order.shippingAddressLine1}</p>
      <p><strong>Internal Notes:</strong> {order.internalNotes}</p>
      <p><strong>Vendor Notes:</strong> {order.vendorNotes}</p>
      <p><strong>Order Status:</strong> {order.orderStatus}</p>
      <p><strong>Placement Time:</strong> {order.placementTime}</p>
      <p><strong>Requested Ship Date:</strong> {order.requestedShipDate}</p>
      <p><strong>Items:</strong></p>
      <ul>
        {order.items.map(item => (
          <li key={item.id}>{item.item.itemName} - {item.quantity} x {item.priceCurrency} {item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
