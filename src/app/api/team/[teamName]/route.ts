import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Team from '@/lib/models/Team';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ teamName: string }> }
) {
  try {
    const { teamName } = await params;

    if (!teamName) {
      return NextResponse.json(
        { error: 'Team name is required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Case-insensitive search - convert search term to uppercase and match stored uppercase names
    const team = await Team.findOne({ teamName: teamName.toUpperCase() });
    
    if (!team) {
      return NextResponse.json(
        { error: 'Team not found' },
        { status: 404 }
      );
    }

    // Convert MongoDB object to plain object for serialization
    const plainTeam = {
      ...team.toObject(),
      _id: team._id.toString(),
      createdAt: team.createdAt.toISOString(),
    };

    return NextResponse.json(plainTeam);
  } catch (error) {
    console.error('Team fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
