import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isJudgeAuthenticated } from '@/lib/judgeAuth';
import { getTeamsByLab } from '@/actions/teams';
import { getScoresByJudge } from '@/actions/scores';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DOMAIN_COLORS: Record<string, string> = {
  AI: 'bg-purple-500',
  Vibeathon: 'bg-green-500',
  'UI/UX': 'bg-blue-500',
};

const LAB_IDS = ['lab-1', 'lab-2', 'lab-3', 'lab-4', 'lab-5', 'lab-6', 'lab-7', 'lab-8'];

export default async function LabTeamsPage({
  params,
}: {
  params: Promise<{ labId: string }>;
}) {
  const { labId } = await params;
  if (!LAB_IDS.includes(labId)) notFound();

  const session = await isJudgeAuthenticated();
  if (!session) return null;

  const [teams, judgeScores] = await Promise.all([
    getTeamsByLab(labId),
    getScoresByJudge(session.name, 'lab'),
  ]);

  const scoredTeamIds = new Set(judgeScores.map((s) => s.teamId));

  return (
    <div className="min-h-screen bg-white halftone-bg p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/judge-portal/lab">
            <Button variant="ghost" className="font-manga-marker">
              ← Back to Labs
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-red-600 -skew-x-12">
            {teams[0]?.labName ?? labId}
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => {
            const isScored = scoredTeamIds.has(team.id);
            const domainColor = DOMAIN_COLORS[team.domain] ?? 'bg-gray-500';

            return (
              <Link key={team.id} href={`/judge-portal/lab/${labId}/${team.id}`}>
                <Card className="manga-panel border-4 border-black hover:shadow-manga-red transition-shadow cursor-pointer h-full">
                  <CardContent className="p-4 h-full flex flex-col">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`px-2 py-0.5 text-white text-xs font-bold rounded ${domainColor}`}
                      >
                        {team.domain}
                      </span>
                      <span
                        className={`text-xs ${
                          isScored ? 'text-green-600' : 'text-muted-foreground'
                        }`}
                      >
                        {isScored ? '✓ Scored' : '○ Pending'}
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <p className="font-semibold leading-snug">
                        {team.name}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {team.members.length} member(s)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
