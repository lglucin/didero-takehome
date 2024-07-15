'use client';

import React, { useState, useEffect } from 'react';
import { get } from '@/utils/api';
import { Supplier } from '@/types';
import { DropdownMenu } from '@/components/dropdown-menu';

interface ApiResponse<T> {
  data: T;
}

const fetchSuppliers = async (): Promise<Supplier[]> => {
  const response = await get<ApiResponse<Supplier[]>>('suppliers');
  return response.data;
};

const SupplierDropdown = ({ onSelectSupplier }: { onSelectSupplier: (supplier: Supplier | null) => void }) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSuppliers();
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelect = (supplier: Supplier | null) => {
    setSelectedSupplier(supplier);
    onSelectSupplier(supplier); // Pass selected supplier to parent component
  };

  const renderDropdownItems = () => {
    return suppliers.map((supplier) => (
      <DropdownMenu.Item
        key={supplier.id}
        onSelect={() => handleSelect(supplier)}
        className="cursor-pointer"
      >
        {supplier.name}
      </DropdownMenu.Item>
    ));
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-gray-200 dark:bg-gray-800">
        {selectedSupplier ? selectedSupplier.name : 'Select a supplier'}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {suppliers.length > 0 ? (
          renderDropdownItems()
        ) : (
          <div>No suppliers available</div>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default SupplierDropdown;
