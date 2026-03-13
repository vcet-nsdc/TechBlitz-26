import Link from 'next/link';
import { isJudgeAuthenticated } from '@/lib/judgeAuth';
import { getTeamsInFinal } from '@/actions/teams';
import { getScoresByJudge } from '@/actions/scores';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DOMAIN_COLORS: Record<string, string> = {
  AI: 'bg-purple-500',
  Vibeathon: 'bg-green-500',
  'UI/UX': 'bg-blue-500',
};

export default async function FinalTeamsPage() {
  const session = await isJudgeAuthenticated();
  if (!session) return null;

  const [teams, judgeScores] = await Promise.all([
    getTeamsInFinal(),
    getScoresByJudge(session.name, 'final'),
  ]);

  const scoredTeamIds = new Set(judgeScores.map((s) => s.teamId));

  const byDomain = teams.reduce<Record<string, typeof teams>>((acc, t) => {
    if (!acc[t.domain]) acc[t.domain] = [];
    acc[t.domain].push(t);
    return acc;
  }, {});

  const domains = ['AI', 'Vibeathon', 'UI/UX'] as const;

  return (
    <div className="min-h-screen bg-white halftone-bg p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <Link href="/judge-portal/lab">
            <Button variant="ghost" className="font-manga-marker text-sm sm:text-base">
              ← Back to Labs
            </Button>
          </Link>
          <div className="flex gap-2">
            <Link href="/judge-portal/final/leaderboard">
              <Button variant="outline" className="font-manga-marker text-xs sm:text-sm">
                Final Leaderboard
              </Button>
            </Link>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-manga-title font-bold text-red-600 -skew-x-12 mb-6 sm:mb-8">
          Final Round — Teams
        </h1>

        <div className="space-y-6 sm:space-y-8">
          {domains.map((domain) => {
            const domainTeams = byDomain[domain] ?? [];
            if (domainTeams.length === 0) return null;

            const domainColor = DOMAIN_COLORS[domain] ?? 'bg-gray-500';

            return (
              <div key={domain}>
                <h2
                  className={`inline-block px-2 sm:px-3 py-1 text-white font-manga-marker mb-3 sm:mb-4 text-sm sm:text-base ${domainColor}`}
                >
                  {domain}
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  {domainTeams.map((team) => {
                    const isScored = scoredTeamIds.has(team.id);
                    return (
                      <Link
                        key={team.id}
                        href={`/judge-portal/final/${team.id}`}
                      >
                        <Card className="manga-panel border-4 border-black hover:shadow-manga-red transition-shadow cursor-pointer">
                          <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 gap-2">
                            <div className="flex-1">
                              <p className="font-manga-title font-semibold text-sm sm:text-base">
                                {team.name}
                              </p>
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                {team.members.join(' • ')}
                              </p>
                            </div>
                            <span
                              className={`font-manga-marker text-xs sm:text-sm ${
                                isScored
                                  ? 'text-green-600'
                                  : 'text-muted-foreground'
                              }`}
                            >
                              {isScored ? '✓ Scored' : '○ Pending'}
                            </span>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
