import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Team from '@/lib/models/Team';

export async function GET(request: NextRequest) {
  try {
    // Check admin token
    const adminToken = request.cookies.get('adminToken')?.value;
    if (adminToken !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const teams = await Team.find().sort({ createdAt: -1 });
    
    // Convert MongoDB objects to plain objects
    const plainTeams = teams.map(team => ({
      ...team.toObject(),
      _id: team._id.toString(),
      createdAt: team.createdAt.toISOString(),
    }));
    
    return NextResponse.json(plainTeams);
  } catch (error) {
    console.error('Teams fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
