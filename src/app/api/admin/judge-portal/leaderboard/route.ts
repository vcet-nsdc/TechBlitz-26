import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getLeaderboard } from '@/actions/scores';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('adminToken')?.value;
  if (adminToken !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const round = (request.nextUrl.searchParams.get('round') || 'lab') as
    | 'lab'
    | 'final';
  const data = await getLeaderboard(round);
  return NextResponse.json(data);
}
