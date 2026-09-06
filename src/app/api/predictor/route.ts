import { NextResponse } from 'next/server';
import { predictColleges } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { exam, rank, category, stream } = body;

    if (!exam || rank === undefined || rank === null) {
      return NextResponse.json(
        { success: false, error: 'Exam name and valid rank are required' },
        { status: 400 }
      );
    }

    const predictions = await predictColleges({
      exam,
      rank: Number(rank),
      category: category || 'General',
      stream: stream || 'Engineering',
    });

    return NextResponse.json({
      success: true,
      data: predictions,
    });
  } catch (error) {
    console.error('Error running rank predictor:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate predictions' },
      { status: 500 }
    );
  }
}
