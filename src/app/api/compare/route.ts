import { NextResponse } from 'next/server';
import { getCollegesByIds } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get('ids');

    if (!idsParam) {
      return NextResponse.json({ success: true, data: [] });
    }

    const ids = idsParam.split(',').map((id) => id.trim()).filter(Boolean);
    const colleges = await getCollegesByIds(ids);

    return NextResponse.json({
      success: true,
      data: colleges,
    });
  } catch (error) {
    console.error('Error fetching compare colleges:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch comparison data' },
      { status: 500 }
    );
  }
}
