'use server';

import connectDB from '@/lib/mongodb';
import JudgeTeam from '@/lib/models/JudgeTeam';

export async function getTeamsByLab(labId: string) {
  await connectDB();
  const teams = await JudgeTeam.find({ labId }).sort({ name: 1 }).lean();
  return teams.map(team => ({
    ...team,
    _id: team._id.toString(),
  }));
}

export async function getTeamsInFinal() {
  await connectDB();
  const teams = await JudgeTeam.find({ inFinal: true })
    .sort({ domain: 1, name: 1 })
    .lean();
  return teams.map(team => ({
    ...team,
    _id: team._id.toString(),
  }));
}

export async function promoteTeamToFinal(
  teamId: string,
  inFinal: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    await connectDB();
    await JudgeTeam.findOneAndUpdate(
      { id: teamId },
      { $set: { inFinal } }
    );
    return { success: true };
  } catch (err) {
    console.error('promoteTeamToFinal error:', err);
    return { success: false, error: 'Failed to update team' };
  }
}

export async function getAllLabsWithStats() {
  await connectDB();
  const labs = await JudgeTeam.aggregate([
    { $group: { _id: '$labId', count: { $sum: 1 }, labName: { $first: '$labName' }, domain: { $first: '$domain' } } },
    { $sort: { _id: 1 } },
  ]);
  return labs.map((l) => ({ 
    labId: l._id, 
    labName: l.labName, 
    domain: l.domain, 
    teamCount: l.count,
    _id: l._id?.toString(),
  }));
}
