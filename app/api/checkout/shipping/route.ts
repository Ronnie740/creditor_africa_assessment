import { NextResponse } from 'next/server';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req: Request) {
  const body = await req.json();
  await delay(600);

  const { addressLine1, streetName, postcode, shippingMethod } = body;

  if (!addressLine1 || !streetName || !postcode || !shippingMethod) {
    return NextResponse.json({ error: 'All shipping fields are required' }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: 'Shipping details saved' });
}
