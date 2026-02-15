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
    // Assuming tax is proportional or fixed, for this exercise I'll keep tax fixed or proportional. 
    // The API returned tax: 0.00, subtotal: 320.45, total: 320.45.
    // Let's assume tax is 0 for simplicity or recalculate if needed. 
    // The original API returned specific values. 
    // Let's recalculate based on the original data structure logic if possible, 
    // but here we only have the client side state.
    
    // For this prototype, I will just update the subtotal and total equals subtotal + tax + shipping.
    // Preserving original tax/shipping from API for now unless we want to simulate complex backend logic.
    // Let's keep tax/shipping constant for this simple "adjust quantity" task unless it was % based.
    
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
