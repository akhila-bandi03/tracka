import { NextResponse } from 'next/server';
import { getCollegeBySlug } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params;
    const college = await getCollegeBySlug(resolvedParams.slug);

    if (!college) {
      return NextResponse.json(
        { success: false, error: 'College not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: college,
    });
  } catch (error) {
    console.error('Error fetching college detail:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch college detail' },
      { status: 500 }
    );
  }
}
