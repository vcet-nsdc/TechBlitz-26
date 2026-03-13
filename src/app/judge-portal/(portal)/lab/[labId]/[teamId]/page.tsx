import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isJudgeAuthenticated } from '@/lib/judgeAuth';
import connectDB from '@/lib/mongodb';
import JudgeTeam from '@/lib/models/JudgeTeam';
import { getScoreForJudge } from '@/actions/scores';
import { ScoringForm } from '@/components/judge/ScoringForm';
import { Button } from '@/components/ui/button';

export default async function LabScoringPage({
  params,
}: {
  params: Promise<{ labId: string; teamId: string }>;
}) {
  const { labId, teamId } = await params;
  const session = await isJudgeAuthenticated();
  if (!session) return null;

  await connectDB();
  const team = await JudgeTeam.findOne({ id: teamId, labId }).lean();
  if (!team) notFound();

  // Convert MongoDB object to plain object
  const plainTeam = {
    ...team,
    _id: team._id.toString(),
  };

  const existingScore = await getScoreForJudge(teamId, session.name, 'lab');

  return (
    <div className="min-h-screen bg-white halftone-bg p-6">
      <div className="max-w-4xl mx-auto">
        <Link href={`/judge-portal/lab/${labId}`}>
          <Button variant="ghost" className="mb-6">
            ← Back to {plainTeam.labName}
          </Button>
        </Link>

        <ScoringForm
          team={plainTeam}
          existingScore={existingScore}
          round="lab"
          judgeName={session.name}
        />
      </div>
    </div>
  );
}
