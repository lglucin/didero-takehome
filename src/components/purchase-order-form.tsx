'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SupplierDropdown from '@/components/supplier-dropdown';
import ItemsDropdown from '@/components/items-dropdown';
import { DatePickerInput } from '@/components/date-picker-input';
import { Supplier, Item, PurchaseOrder, PurchaseOrderStatus, TDateISO } from '@/types';
import { post } from '@/utils/api';

// Validation schema using yup
const schema = yup.object().shape({
  quantity: yup.number().min(1).required('Quantity is required'),
  shippingAddressLine1: yup.string().required('Shipping Address is required'),
  internalNotes: yup.string().required('Internal Notes are required'),
  vendorNotes: yup.string().required('Vendor Notes are required'),
  requestedShipDate: yup.date().nullable().required('Requested Ship Date is required'),
});

const PurchaseOrderForm = () => {
  const router = useRouter();
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const { control, handleSubmit, formState: { errors, isValid }, watch } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const onSubmit = async (data: {
    quantity: number;
    shippingAddressLine1: string;
    internalNotes: string;
    vendorNotes: string;
    requestedShipDate: Date | null;
  }) => {
    if (!selectedSupplier || !selectedItem) {
      alert("Please select a supplier and item.");
      return;
    }

    const newOrder: PurchaseOrder = {
      id: Date.now(),
      approvals: [],
      poNumber: `PO-${Date.now()}`,
      placedById: 1,
      shippingAddressLine1: data.shippingAddressLine1,
      internalNotes: data.internalNotes,
      vendorNotes: data.vendorNotes,
      orderStatus: PurchaseOrderStatus.Draft,
      placementTime: new Date().toISOString() as TDateISO,
      requestedShipDate: data.requestedShipDate ? data.requestedShipDate.toISOString() as TDateISO : null,
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
      router.push('/orders'); // Redirect to orders list page
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  const allFieldsFilled = selectedSupplier && selectedItem && isValid;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
      <div className="flex gap-8">
        <SupplierDropdown onSelectSupplier={setSelectedSupplier} />
        {selectedSupplier && <ItemsDropdown supplier={selectedSupplier} onSelectItem={setSelectedItem} />}
      </div>

      {selectedSupplier && selectedItem && (
        <>
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
          <div>
            <label htmlFor="shippingAddressLine1" className="block text-sm font-medium text-gray-700">
              Shipping Address
            </label>
            <Controller
              name="shippingAddressLine1"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="text"
                  id="shippingAddressLine1"
                  {...field}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              )}
            />
            {errors.shippingAddressLine1 && <p className="text-red-600">{errors.shippingAddressLine1.message}</p>}
          </div>
          <div>
            <label htmlFor="internalNotes" className="block text-sm font-medium text-gray-700">
              Internal Notes
            </label>
            <Controller
              name="internalNotes"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <textarea
                  id="internalNotes"
                  {...field}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              )}
            />
            {errors.internalNotes && <p className="text-red-600">{errors.internalNotes.message}</p>}
          </div>
          <div>
            <label htmlFor="vendorNotes" className="block text-sm font-medium text-gray-700">
              Vendor Notes
            </label>
            <Controller
              name="vendorNotes"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <textarea
                  id="vendorNotes"
                  {...field}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              )}
            />
            {errors.vendorNotes && <p className="text-red-600">{errors.vendorNotes.message}</p>}
          </div>
          <div>
            <label htmlFor="requestedShipDate" className="block text-sm font-medium text-gray-700">
              Requested Ship Date
            </label>
            <Controller
              name="requestedShipDate"
              control={control}
              render={({ field }) => (
                <DatePickerInput
                  selected={field.value}
                  onChange={field.onChange}
                  className="mt-1 block w-full shadow-sm"
                />
              )}
            />
            {errors.requestedShipDate && <p className="text-red-600">{errors.requestedShipDate.message}</p>}
          </div>

          <button
            type="submit"
            className={`mt-2 inline-flex items-center px-4 py-2 rounded-md shadow-sm ${
              allFieldsFilled ? 'bg-blue-500 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
            }`}
            disabled={!allFieldsFilled}
          >
            Submit Order
          </button>
        </>
      )}
    </form>
  );
};

export default PurchaseOrderForm;
