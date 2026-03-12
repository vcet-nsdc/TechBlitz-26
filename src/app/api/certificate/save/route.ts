import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Team from '@/lib/models/Team';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { teamName, participantName, certificateDataUrl } = body;

    // Validate required fields
    if (!teamName || !participantName || !certificateDataUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();

    const team = await Team.findOne({ teamName: teamName.toLowerCase() });
    if (!team) {
      return NextResponse.json(
        { error: 'Team not found' },
        { status: 404 }
      );
    }

    // Add certificate to team
    team.certificates.push({
      participantName,
      certificateDataUrl,
      generatedAt: new Date(),
    });

    await team.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Certificate save error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
