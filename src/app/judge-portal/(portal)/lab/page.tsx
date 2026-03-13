import Link from 'next/link';
import { isJudgeAuthenticated } from '@/lib/judgeAuth';
import { getAllLabsWithStats } from '@/actions/teams';
import { getScoredCountByLab } from '@/actions/scores';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const DOMAIN_COLORS: Record<string, string> = {
  AI: 'bg-purple-500',
  Vibeathon: 'bg-green-500',
  'UI/UX': 'bg-blue-500',
};

export default async function LabSelectorPage() {
  const session = await isJudgeAuthenticated();
  if (!session) return null;

  const [labs, scoredByLab] = await Promise.all([
    getAllLabsWithStats(),
    getScoredCountByLab(session.name, 'lab'),
  ]);

  return (
    <div className="min-h-screen bg-white halftone-bg p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-red-600 skew-x-[-12deg]">
            Select Lab
          </h1>
          <p className="text-sm sm:text-base text-black ">
            Choose a lab to score teams
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {labs.map((lab) => {
            const scored = scoredByLab[lab.labId] ?? 0;
            const total = lab.teamCount;
            const domainColor = DOMAIN_COLORS[lab.domain] ?? 'bg-gray-500';

            return (
              <Link key={lab.labId} href={`/judge-portal/lab/${lab.labId}`}>
                <Card className="manga-panel border-4 border-black hover:shadow-manga-red transition-shadow cursor-pointer h-full">
                  <CardHeader className="pb-2 p-3 sm:p-4">
                    <span
                      className={`inline-block w-fit px-2 py-0.5 text-white text-xs font-bold rounded mb-2 ${domainColor}`}
                    >
                      {lab.domain}
                    </span>
                    <h2 className="text-sm sm:text-base font-semibold">{lab.labName}</h2>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {scored}/{total} scored
                    </p>
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
