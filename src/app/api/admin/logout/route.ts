import { NextResponse } from 'next/server';
import { clearAdminToken } from '@/lib/adminAuth';

export async function POST() {
  try {
    await clearAdminToken();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
