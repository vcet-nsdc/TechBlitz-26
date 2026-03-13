import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import JudgeTeam from '@/lib/models/JudgeTeam';
import Score from '@/lib/models/Score';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default async function AdminJudgePortalOverview() {
  await connectDB();

  const [teamCount, scoreCount, labScoreCount, finalScoreCount, inFinalCount] =
    await Promise.all([
      JudgeTeam.countDocuments(),
      Score.countDocuments(),
      Score.countDocuments({ round: 'lab' }),
      Score.countDocuments({ round: 'final' }),
      JudgeTeam.countDocuments({ inFinal: true }),
    ]);

  const domains = await JudgeTeam.aggregate([
    { $group: { _id: '$domain', count: { $sum: 1 } } },
  ]);
  const judges = await Score.distinct('judgeName');

  return (
    <div className="min-h-screen bg-white halftone-bg p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-manga-title font-bold action-text-red -skew-x-12">
            Judge Portal — Admin
          </h1>
          <Link href="/admin/dashboard">
            <Button variant="outline" className="font-manga-marker text-sm sm:text-base">
              ← Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="manga-panel border-4 border-black">
            <CardHeader className="pb-2 p-3 sm:p-4">
              <p className="text-xs sm:text-sm font-manga-marker text-muted-foreground">
                Total Teams
              </p>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-0">
              <p className="text-2xl sm:text-3xl font-manga-action">{teamCount}</p>
            </CardContent>
          </Card>
          <Card className="manga-panel border-4 border-black">
            <CardHeader className="pb-2 p-3 sm:p-4">
              <p className="text-xs sm:text-sm font-manga-marker text-muted-foreground">
                Lab Scores
              </p>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-0">
              <p className="text-2xl sm:text-3xl font-manga-action">{labScoreCount}</p>
            </CardContent>
          </Card>
          <Card className="manga-panel border-4 border-black">
            <CardHeader className="pb-2 p-3 sm:p-4">
              <p className="text-xs sm:text-sm font-manga-marker text-muted-foreground">
                Final Scores
              </p>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-0">
              <p className="text-2xl sm:text-3xl font-manga-action">{finalScoreCount}</p>
            </CardContent>
          </Card>
          <Card className="manga-panel border-4 border-black">
            <CardHeader className="pb-2 p-3 sm:p-4">
              <p className="text-xs sm:text-sm font-manga-marker text-muted-foreground">
                In Final
              </p>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-0">
              <p className="text-2xl sm:text-3xl font-manga-action">{inFinalCount}</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-4 sm:mb-6 manga-panel p-3 sm:p-4 border-4 border-black">
          <h2 className="font-manga-title font-bold mb-2 text-sm sm:text-base">Domain Breakdown</h2>
          <div className="flex gap-2 sm:gap-4 flex-wrap">
            {domains.map((d) => (
              <span key={d._id} className="font-manga-marker text-xs sm:text-sm">
                {d._id}: {d.count}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4 sm:mb-6 manga-panel p-3 sm:p-4 border-4 border-black">
          <h2 className="font-manga-title font-bold mb-2 text-sm sm:text-base">
            Active Judges ({judges.length})
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-manga-marker break-words">
            {judges.join(', ') || 'None yet'}
          </p>
        </div>

        <div className="flex gap-2 sm:gap-4 flex-wrap">
          <Link href="/admin/judge-portal/promote">
            <Button className="font-manga-marker manga-panel text-sm sm:text-base">
              Promote to Final
            </Button>
          </Link>
          <Link href="/admin/judge-portal/results">
            <Button variant="outline" className="font-manga-marker text-sm sm:text-base">
              Results Export
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
