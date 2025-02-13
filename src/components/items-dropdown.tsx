'use client';

import React, { useState, useEffect } from 'react';
import { get } from '@/utils/api';
import { Item, Supplier } from '@/types';
import { DropdownMenu } from '@/components/dropdown-menu';

interface ItemsDropdownProps {
  supplier: Supplier;
  onSelectItem: (item: Item | null) => void;
}

const ItemsDropdown = ({ supplier, onSelectItem }: ItemsDropdownProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get<{ data: Item[] }>(`suppliers/${supplier.id}/items`);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchData();
  }, [supplier]);

  const handleSelect = (item: Item | null) => {
    setSelectedItem(item);
    onSelectItem(item);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-gray-200 dark:bg-gray-800">
        {selectedItem ? selectedItem.itemName : 'Select an item'}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {items.length > 0 ? (
          items.map((item) => (
            <DropdownMenu.Item
              key={item.id}
              onSelect={() => handleSelect(item)}
              className="cursor-pointer"
            >
              {item.itemName}
            </DropdownMenu.Item>
          ))
        ) : (
          <div>No items available</div>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default ItemsDropdown;
