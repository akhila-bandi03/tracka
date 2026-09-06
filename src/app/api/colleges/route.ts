import { NextResponse } from 'next/server';
import { getColleges } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const stream = searchParams.get('stream') || undefined;
    const state = searchParams.get('state') || undefined;
    const type = searchParams.get('type') || undefined;
    const minFee = searchParams.get('minFee') ? Number(searchParams.get('minFee')) : undefined;
    const maxFee = searchParams.get('maxFee') ? Number(searchParams.get('maxFee')) : undefined;
    const minRating = searchParams.get('minRating') ? Number(searchParams.get('minRating')) : undefined;
    const sortBy = searchParams.get('sortBy') || undefined;

    const colleges = await getColleges({
      search,
      stream,
      state,
      type,
      minFee,
      maxFee,
      minRating,
      sortBy,
    });

    return NextResponse.json({
      success: true,
      total: colleges.length,
      data: colleges,
    });
  } catch (error) {
    console.error('Error fetching colleges:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch colleges' },
      { status: 500 }
    );
  }
}
