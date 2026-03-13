import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import JudgeTeam from '@/lib/models/JudgeTeam';
import Score from '@/lib/models/Score';

export async function GET() {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('adminToken')?.value;
  if (adminToken !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();

  const scores = await Score.find({}).lean();
  
  // Convert MongoDB objects to plain objects
  const plainScores = scores.map(score => ({
    ...score,
    _id: score._id.toString(),
    submittedAt: score.submittedAt?.toISOString(),
  }));
  
  const teamIds = [...new Set(plainScores.map((s) => s.teamId))];
  const teams = await JudgeTeam.find({ id: { $in: teamIds } })
    .select('id name domain labName')
    .lean();

  // Convert teams to plain objects
  const plainTeams = teams.map(team => ({
    ...team,
    _id: team._id.toString(),
  }));

  const teamMap = Object.fromEntries(
    plainTeams.map((t) => [t.id, { name: t.name, domain: t.domain, labName: t.labName }])
  );

  const rows = plainScores.map((s) => {
    const t = teamMap[s.teamId] ?? { name: '', domain: '', labName: '' };
    return {
      teamId: s.teamId,
      teamName: t.name,
      domain: t.domain,
      labName: t.labName,
      judgeName: s.judgeName,
      round: s.round,
      innovation: s.criteria.innovation,
      execution: s.criteria.execution,
      presentation: s.criteria.presentation,
      impact: s.criteria.impact,
      feasibility: s.criteria.feasibility ?? 0,
      scalability: s.criteria.scalability ?? 0,
      total: s.total,
    };
  });

  return NextResponse.json(rows);
}
