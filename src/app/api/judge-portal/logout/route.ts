import { NextResponse } from 'next/server';
import { clearJudgeCookie } from '@/lib/judgeAuth';

export async function POST() {
  await clearJudgeCookie();
  return NextResponse.json({ success: true });
}
