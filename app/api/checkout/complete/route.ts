import { NextResponse } from 'next/server';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST() {
  await delay(800);
  
  // Simulate successful order completion
  return NextResponse.json({ 
    success: true, 
    orderId: `ORD-${Math.floor(Math.random() * 100000)}`,
    message: 'Order completed successfully' 
  });
}
