'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { PurchaseOrder, PurchaseOrderStatus } from '@/types';
import { get, patch, del } from '@/utils/api';

const OrderDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const [order, setOrder] = useState<PurchaseOrder | null>(null);
  const [status, setStatus] = useState<PurchaseOrderStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await get<{ data: PurchaseOrder }>(`orders/${id}`);
        setOrder(response.data);
        setStatus(response.data.orderStatus);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
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
      const response = await patch<{ data: PurchaseOrder }>(`orders/${id}`, updatedOrder);
      setOrder(response.data);
      console.log("Order updated successfully:", JSON.stringify(response.data));
      alert('Order status updated successfully');
      router.push('/orders'); // Redirect to orders list page
    } catch (error) {
      console.error('Error updating order status:', error);
      // Comment: PATCH function was called, but it encountered an issue.
    }
  };

  const handleDelete = async () => {
    try {
      console.log(`Deleting order with ID: ${id}`);
      await del<{ message: string }>(`orders/${id}`);
      alert('Order deleted successfully');
      router.push('/orders'); // Redirect to orders list page
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-xl font-semibold">Loading order details...</h2>
          <p className="text-gray-500">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (!order) return <div>Order not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Order Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <p><strong>PO Number:</strong> {order.poNumber}</p>
        <p><strong>Supplier:</strong> {order.supplier?.name || 'N/A'}</p>
        <p><strong>Shipping Address:</strong> {order.shippingAddressLine1}</p>
        <p><strong>Internal Notes:</strong> {order.internalNotes}</p>
        <p><strong>Vendor Notes:</strong> {order.vendorNotes}</p>
        <p><strong>Order Status:</strong> {order.orderStatus}</p>
        <p><strong>Placement Time:</strong> {order.placementTime}</p>
        <p><strong>Requested Ship Date:</strong> {order.requestedShipDate}</p>
        <div>
          <p><strong>Items:</strong></p>
          <ul className="list-disc list-inside">
            {order.items.map(item => (
              <li key={item.id}>{item.item.itemName} - {item.quantity} x {item.priceCurrency} {item.price}</li>
            ))}
          </ul>
        </div>

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
            className="mt-2 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm"
          >
            Update Status
          </button>
        </div>

        <button
          onClick={handleDelete}
          className="mt-4 inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-md shadow-sm"
        >
          Delete Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
