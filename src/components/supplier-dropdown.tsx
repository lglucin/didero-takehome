'use client'; // Ensure this component is treated as a client component

import React, { useState, useEffect } from 'react';
import { get } from '@/utils/api';
import { Supplier } from '@/types';
import { DropdownMenu } from '@/components/dropdown-menu';

interface ApiResponse<T> {
  data: T;
}

// Function to fetch suppliers from the API
const fetchSuppliers = async (): Promise<Supplier[]> => {
  const response = await get<ApiResponse<Supplier[]>>('suppliers');
  return response.data;
};

const SupplierDropdown = () => {
  // State to store the list of suppliers
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  // State to store the currently selected supplier
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  // useEffect hook to fetch suppliers when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSuppliers();
        setSuppliers(data); // Update the state with the fetched suppliers
      } catch (error) {
        console.error('Error fetching suppliers:', error); // Log any errors
      }
    };

    fetchData();
  }, []);

  // Function to handle the selection of a supplier from the dropdown
  const handleSelect = (supplier: Supplier | null) => {
    setSelectedSupplier(supplier);
  };

  // Function to render the dropdown items
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