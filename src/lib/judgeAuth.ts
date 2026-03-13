import { cookies } from 'next/headers';

const JUDGE_COOKIE = 'judge_session';
const JUDGE_PASSCODE = process.env.JUDGE_PASSCODE || '';

export interface JudgeSession {
  name: string;
  token: string;
}

/**
 * Create a simple hash of the passcode for cookie storage (not for security, just obfuscation)
 */
function hashPasscode(passcode: string): string {
  let hash = 0;
  for (let i = 0; i < passcode.length; i++) {
    const char = passcode.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

/**
 * Check if judge is authenticated via judge_session cookie
 */
export async function isJudgeAuthenticated(): Promise<JudgeSession | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(JUDGE_COOKIE)?.value;
  if (!value) return null;

  try {
    const session: JudgeSession = JSON.parse(
      Buffer.from(value, 'base64').toString('utf-8')
    );
    const expectedToken = hashPasscode(JUDGE_PASSCODE);
    if (session.token === expectedToken && session.name) {
      return session;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Set judge cookie with name + hashed passcode
 */
export async function setJudgeCookie(judgeName: string): Promise<void> {
  const cookieStore = await cookies();
  const token = hashPasscode(JUDGE_PASSCODE);
  const session: JudgeSession = { name: judgeName, token };
  const encoded = Buffer.from(JSON.stringify(session), 'utf-8').toString(
    'base64'
  );

  cookieStore.set(JUDGE_COOKIE, encoded, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60,
    path: '/',
  });
}

/**
 * Clear judge cookie
 */
export async function clearJudgeCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(JUDGE_COOKIE);
}

/**
 * Validate passcode against env var
 */
export function validateJudgePasscode(passcode: string): boolean {
  return !!JUDGE_PASSCODE && passcode === JUDGE_PASSCODE;
}
