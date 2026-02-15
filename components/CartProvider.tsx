'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface OrderSummaryData {
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
}

type CartContextType = {
  data: OrderSummaryData | null;
  loading: boolean;
  updateQuantity: (id: string, delta: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OrderSummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/checkout/summary')
      .then((res) => res.json())
      .then((fetchedData) => {
        setData(fetchedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch summary', err);
        setLoading(false);
      });
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    if (!data) return;

    const updatedItems = data.items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    // Recalculate totals
    const newSubtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // Keeping tax and shipping constant as per previous logic for this prototype
    const newTotal = newSubtotal + data.tax + data.shipping;

    setData({
      ...data,
      items: updatedItems,
      subtotal: newSubtotal,
      total: newTotal
    });
  };

  return (
    <CartContext.Provider value={{ data, loading, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
