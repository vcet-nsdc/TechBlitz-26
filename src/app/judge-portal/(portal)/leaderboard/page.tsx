import Link from 'next/link';
import { isJudgeAuthenticated } from '@/lib/judgeAuth';
import { getLeaderboard } from '@/actions/scores';
import { Leaderboard } from '@/components/judge/Leaderboard';
import { Button } from '@/components/ui/button';

export default async function LeaderboardPage() {
  const session = await isJudgeAuthenticated();
  if (!session) return null;

  const data = await getLeaderboard('lab');

  return (
    <div className="min-h-screen bg-white halftone-bg p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/judge-portal/lab">
            <Button variant="ghost" className="font-manga-marker">
              ← Back to Labs
            </Button>
          </Link>
          <h1 className="text-3xl  font-bold text-red-700 skew-x-[-12deg]">
            Lab Round Leaderboard
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Auto-refreshes every 30 seconds
        </p>
        <Leaderboard round="lab" initialData={data} />
      </div>
    </div>
  );
}
