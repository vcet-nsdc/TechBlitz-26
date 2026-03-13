import { NextResponse } from 'next/server';
import {
  validateJudgePasscode,
  setJudgeCookie,
} from '@/lib/judgeAuth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { judgeName, passcode } = body;

    if (!judgeName?.trim() || !passcode) {
      return NextResponse.json(
        { error: 'Judge name and passcode are required' },
        { status: 400 }
      );
    }

    if (!validateJudgePasscode(passcode)) {
      return NextResponse.json({ error: 'Invalid passcode' }, { status: 401 });
    }

    await setJudgeCookie(judgeName.trim());

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
