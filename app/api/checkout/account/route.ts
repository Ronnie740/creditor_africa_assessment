import { NextResponse } from 'next/server';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req: Request) {
  const body = await req.json();
  await delay(500);

  if (!body.email || !body.password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  // Mock validation
  if (body.password.length < 8) {
    return NextResponse.json({ error: 'Password too short' }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: 'Account details saved' });
}
