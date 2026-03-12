import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Team from '@/lib/models/Team';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { teamName, leaderName, member2, member3, domain, submissionUrl } = body;

    // Validate required fields
    if (!teamName || !leaderName || !member2 || !domain || !submissionUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate domain
    if (!['vibecoding', 'agenticai', 'uiux'].includes(domain)) {
      return NextResponse.json(
        { error: 'Invalid domain' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if team name already exists
    const existingTeam = await Team.findOne({ teamName: teamName.toLowerCase() });
    if (existingTeam) {
      return NextResponse.json(
        { error: 'Team name already exists' },
        { status: 409 }
      );
    }

    // Create new team
    const team = new Team({
      teamName: teamName.toLowerCase(),
      leaderName,
      member2,
      member3,
      domain,
      submissionUrl,
    });

    await team.save();

    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
