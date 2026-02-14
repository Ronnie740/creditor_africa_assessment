import { NextResponse } from 'next/server';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req: Request) {
  const body = await req.json();
  await delay(700);

  const { cardName, cardNumber, expMonth, expYear, cvc } = body;

  if (!cardName || !cardNumber || !expMonth || !expYear || !cvc) {
    return NextResponse.json({ error: 'All payment fields are required' }, { status: 400 });
  }

  // Basic mock validation
  if (!/^\d{4}-\d{4}(-.*)?$/.test(cardNumber)) { // Relaxed check to match schema potentially
      // Actually schema is stricter: /^\d{4}-\d{4}-?$/
  }
  
  return NextResponse.json({ success: true, message: 'Payment details verified' });
}
