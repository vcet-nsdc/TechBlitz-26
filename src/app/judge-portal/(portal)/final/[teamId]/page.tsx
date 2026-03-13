import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isJudgeAuthenticated } from '@/lib/judgeAuth';
import JudgeTeam from '@/lib/models/JudgeTeam';
import { getScoreForJudge } from '@/actions/scores';
import { ScoringForm } from '@/components/judge/ScoringForm';
import { Button } from '@/components/ui/button';
import connectDB from '@/lib/mongodb';

export default async function FinalScoringPage({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = await params;
  const session = await isJudgeAuthenticated();
  if (!session) return null;

  await connectDB();
  const team = await JudgeTeam.findOne({ id: teamId, inFinal: true }).lean();
  if (!team) notFound();

  // Convert MongoDB object to plain object
  const plainTeam = {
    ...team,
    _id: team._id.toString(),
  };

  const existingScore = await getScoreForJudge(teamId, session.name, 'final');

  return (
    <div className="min-h-screen bg-white halftone-bg p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/judge-portal/final">
          <Button variant="ghost" className="font-manga-marker mb-6">
            ← Back to Final Round
          </Button>
        </Link>

        <ScoringForm
          team={plainTeam}
          existingScore={existingScore}
          round="final"
          judgeName={session.name}
        />
      </div>
    </div>
  );
}
