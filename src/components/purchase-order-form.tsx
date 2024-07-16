'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SupplierDropdown from '@/components/supplier-dropdown';
import ItemsDropdown from '@/components/items-dropdown';
import { Supplier, Item, PurchaseOrder, PurchaseOrderStatus, TDateISO } from '@/types';
import { post } from '@/utils/api';

// Validation schema using yup
const schema = yup.object().shape({
  quantity: yup.number().min(1).required('Quantity is required'),
});

const PurchaseOrderForm = () => {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { quantity: number }) => {
    if (!selectedSupplier || !selectedItem) {
      alert("Please select a supplier and item.");
      return;
    }

    const newOrder: PurchaseOrder = {
      id: Date.now(),
      approvals: [],
      poNumber: `PO-${Date.now()}`,
      placedById: 1,
      shippingAddressLine1: '123 Fake Street',
      internalNotes: 'New Purchase Order',
      vendorNotes: 'New Purchase Order',
      orderStatus: PurchaseOrderStatus.Draft,
      placementTime: new Date().toISOString() as TDateISO, // Ensure the date is in ISO format
      requestedShipDate: null,
      items: [{
        id: Date.now(),
        itemId: selectedItem.id,
        item: selectedItem,
        price: selectedItem.price,
        quantity: data.quantity,
        priceCurrency: selectedItem.priceCurrency,
        purchaseOrderId: Date.now(),
      }],
      supplierId: selectedSupplier.id,
      supplier: selectedSupplier,
    };

    try {
      const response = await post<PurchaseOrder>('orders', newOrder);
      console.log('Order submitted successfully:', response);
      // Redirect to orders list or show success message
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
      <div className="flex gap-8">
        <SupplierDropdown onSelectSupplier={setSelectedSupplier} />
        {selectedSupplier && <ItemsDropdown supplier={selectedSupplier} onSelectItem={setSelectedItem} />}
      </div>
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <Controller
          name="quantity"
          control={control}
          defaultValue={1}
          render={({ field }) => (
            <input
              type="number"
              id="quantity"
              {...field}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              min="1"
            />
          )}
        />
        {errors.quantity && <p className="text-red-600">{errors.quantity.message}</p>}
      </div>
      <button type="submit" className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md">
        Submit Order
      </button>
    </form>
  );
};

export default PurchaseOrderForm;
