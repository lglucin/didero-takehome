'use client';

import React, { useState, useEffect } from 'react';
import { get } from '@/utils/api';
import { Item, Supplier } from '@/types';
import { DropdownMenu } from '@/components/dropdown-menu';

interface ApiResponse<T> {
  data: T;
}

const fetchItems = async (supplierId: number): Promise<Item[]> => {
  const response = await get<ApiResponse<Item[]>>(`suppliers/${supplierId}/items`);
  return response.data;
};

interface ItemsDropdownProps {
  supplier: Supplier | null;
}

const ItemsDropdown = ({ supplier }: ItemsDropdownProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    if (supplier) {
      const fetchData = async () => {
        try {
          const data = await fetchItems(supplier.id);
          setItems(data);
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      };

      fetchData();
    }
  }, [supplier]);

  const handleSelect = (item: Item | null) => {
    setSelectedItem(item);
  };

  const renderDropdownItems = () => {
    return items.map((item) => (
      <DropdownMenu.Item
        key={item.id}
        onSelect={() => handleSelect(item)}
        className="cursor-pointer"
      >
        {item.itemName}
      </DropdownMenu.Item>
    ));
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-gray-200 dark:bg-gray-800">
        {selectedItem ? selectedItem.itemName : 'Select an item'}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {items.length > 0 ? (
          renderDropdownItems()
        ) : (
          <div>No items available</div>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default ItemsDropdown;
