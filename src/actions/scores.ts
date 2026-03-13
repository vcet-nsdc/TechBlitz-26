'use server';

import connectDB from '@/lib/mongodb';
import JudgeTeam from '@/lib/models/JudgeTeam';
import Score, { type IScore } from '@/lib/models/Score';

export interface ScoreInput {
  teamId: string;
  judgeName: string;
  round: 'lab' | 'final';
  criteria: {
    innovation: number;
    execution: number;
    presentation: number;
    impact: number;
    feasibility: number;
    scalability: number;
  };
}

function validateCriteria(c: ScoreInput['criteria']): boolean {
  const vals = [
    c.innovation,
    c.execution,
    c.presentation,
    c.impact,
    c.feasibility,
    c.scalability,
  ];
  return vals.every((v) => typeof v === 'number' && v >= 0 && v <= 10);
}

function computeTotal(criteria: ScoreInput['criteria'], round: 'lab' | 'final'): number {
  // Labs: 5 aspects (max 50). Finals: 6 aspects (max 60).
  const base =
    criteria.innovation +
    criteria.execution +
    criteria.presentation +
    criteria.impact +
    criteria.feasibility;
  return round === 'lab' ? base : base + criteria.scalability;
}

export async function submitScore(data: ScoreInput): Promise<
  | { success: true }
  | { success: false; error: string }
> {
  try {
    await connectDB();

    if (!validateCriteria(data.criteria)) {
      return { success: false, error: 'All scores must be between 0 and 10' };
    }

    const total = computeTotal(data.criteria, data.round);

    await Score.findOneAndUpdate(
      {
        teamId: data.teamId,
        judgeName: data.judgeName,
        round: data.round,
      },
      {
        $set: {
          criteria: data.criteria,
          total,
          submittedAt: new Date(),
        },
      },
      { upsert: true, new: true }
    );

    return { success: true };
  } catch (err) {
    console.error('submitScore error:', err);
    return { success: false, error: 'Failed to submit score' };
  }
}

export async function getScoresByTeam(
  teamId: string,
  round: 'lab' | 'final'
): Promise<IScore[]> {
  await connectDB();
  const scores = await Score.find({ teamId, round }).lean();
  return scores.map(score => ({
    ...score,
    _id: score._id.toString(),
    submittedAt: score.submittedAt?.toISOString(),
  })) as IScore[];
}

export async function getScoreForJudge(
  teamId: string,
  judgeName: string,
  round: 'lab' | 'final'
): Promise<IScore | null> {
  await connectDB();
  const score = await Score.findOne({ teamId, judgeName, round }).lean();
  if (!score) return null;
  return {
    ...score,
    _id: score._id.toString(),
    submittedAt: score.submittedAt?.toISOString(),
  } as IScore;
}

export async function getScoresByJudge(
  judgeName: string,
  round: 'lab' | 'final'
): Promise<IScore[]> {
  await connectDB();
  const scores = await Score.find({ judgeName, round }).lean();
  return scores.map(score => ({
    ...score,
    _id: score._id.toString(),
    submittedAt: score.submittedAt?.toISOString(),
  })) as IScore[];
}

export async function getScoredCountByLab(
  judgeName: string,
  round: 'lab' | 'final'
): Promise<Record<string, number>> {
  await connectDB();
  const scores = await Score.find({ judgeName, round }).select('teamId').lean();
  const teamIds = scores.map((s) => s.teamId);
  const teams = await JudgeTeam.find({ id: { $in: teamIds } })
    .select('labId')
    .lean();
  const labCounts: Record<string, number> = {};
  for (const t of teams) {
    labCounts[t.labId] = (labCounts[t.labId] ?? 0) + 1;
  }
  return labCounts;
}

export interface LeaderboardEntry {
  teamId: string;
  teamName: string;
  domain: string;
  labId: string;
  labName: string;
  totalMarks: number;
  judgeCount: number;
  rank?: number;
}

export async function getLeaderboard(
  round: 'lab' | 'final'
): Promise<LeaderboardEntry[]> {
  await connectDB();

  const agg = await Score.aggregate([
    { $match: { round } },
    {
      $group: {
        _id: '$teamId',
        totalMarks: { $sum: '$total' },
        judgeCount: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'judgeteams',
        localField: '_id',
        foreignField: 'id',
        as: 'team',
      },
    },
    { $unwind: '$team' },
    {
      $project: {
        teamId: '$_id',
        teamName: '$team.name',
        domain: '$team.domain',
        labId: '$team.labId',
        labName: '$team.labName',
        totalMarks: { $round: ['$totalMarks', 2] },
        judgeCount: 1,
      },
    },
    { $sort: { totalMarks: -1 } },
  ]);

  return agg.map(entry => ({
    ...entry,
    _id: entry._id?.toString(),
  }));
}
