import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
export const runtime = 'edge';

export async function GET() {
  revalidatePath('/');
  revalidatePath('/payments');
  revalidatePath('/autopay');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
