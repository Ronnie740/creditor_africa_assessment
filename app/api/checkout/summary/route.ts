import { NextResponse } from 'next/server';

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
  await delay(600); // Simulate network latency

  return NextResponse.json({
    items: [
      {
        id: '1',
        name: 'Sony Wireless Headphones',
        price: 320.45,
        image: '/sony_headphones.jpg',
        quantity: 1
      }
    ],
    subtotal: 320.45,
    tax: 0.00,
    shipping: 0.00,
    total: 320.45,
    currency: 'GBP'
  });
}
