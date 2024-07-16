'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { get, patch, del } from '@/utils/api';
import { PurchaseOrder, PurchaseOrderStatus } from '@/types';

const OrderDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const [order, setOrder] = useState<PurchaseOrder | null>(null);
  const [status, setStatus] = useState<PurchaseOrderStatus | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await get<{ data: PurchaseOrder }>(`orders/${id}`);
        setOrder(response.data);
        setStatus(response.data.orderStatus);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  const handleStatusChange = async () => {
    if (!status || !order) return;
    try {
      console.log("Current status:", status);
      const updatedOrder: PurchaseOrder = {
        ...order,
        orderStatus: status,
      };
      console.log("Updated order:", JSON.stringify(updatedOrder));
      const response = await patch<{ data: PurchaseOrder }>(`orders/${id}`, {body: updatedOrder});
      setOrder(response.data);
      console.log("Order updated successfully:", JSON.stringify(response.data));
      alert('Order status updated successfully');
      router.push('/orders'); // Redirect to orders list page
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await del<{ message: string }>(`orders/${id}`);
      alert('Order deleted successfully');
      router.push('/orders'); // Redirect to orders list page
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

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

      <div className="mt-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Update Status</label>
        <select
          id="status"
          value={status || ''}
          onChange={(e) => setStatus(e.target.value as PurchaseOrderStatus)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          {Object.values(PurchaseOrderStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <button
          onClick={handleStatusChange}
          className="mt-2 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Update Status
        </button>
      </div>

      <button
        onClick={handleDelete}
        className="mt-4 inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Delete Order
      </button>
    </div>
  );
};

export default OrderDetails;
