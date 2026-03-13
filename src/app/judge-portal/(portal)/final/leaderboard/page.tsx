import Link from 'next/link';
import { isJudgeAuthenticated } from '@/lib/judgeAuth';
import { getLeaderboard } from '@/actions/scores';
import { Leaderboard } from '@/components/judge/Leaderboard';
import { Button } from '@/components/ui/button';

export default async function FinalLeaderboardPage() {
  const session = await isJudgeAuthenticated();
  if (!session) return null;

  const data = await getLeaderboard('final');

  return (
    <div className="min-h-screen bg-white halftone-bg p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/judge-portal/final">
            <Button variant="ghost" className="font-manga-marker">
              ← Back to Final
            </Button>
          </Link>
          <h1 className="text-3xl font-manga-title font-bold text-red-600 skew-x-[-12deg]">
            Final Round Leaderboard
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Auto-refreshes every 30 seconds
        </p>
        <Leaderboard round="final" initialData={data} />
      </div>
    </div>
  );
}
