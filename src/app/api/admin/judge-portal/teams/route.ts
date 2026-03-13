import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import JudgeTeam from '@/lib/models/JudgeTeam';

export async function GET() {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('adminToken')?.value;
  if (adminToken !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();
  const teams = await JudgeTeam.find({})
    .select('id inFinal')
    .lean();
  
  // Convert MongoDB objects to plain objects
  const plainTeams = teams.map(team => ({
    ...team,
    _id: team._id.toString(),
  }));
  
  return NextResponse.json(plainTeams);
}
