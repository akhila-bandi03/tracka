import { COLLEGES_DATA, INITIAL_QUESTIONS, CollegeData } from './mock-data';

export async function getColleges(filters?: {
  search?: string;
  stream?: string;
  state?: string;
  type?: string;
  minFee?: number;
  maxFee?: number;
  minRating?: number;
  sortBy?: string;
}): Promise<CollegeData[]> {
  let list = [...COLLEGES_DATA];

  if (filters?.search) {
    const query = filters.search.toLowerCase();
    list = list.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.shortName.toLowerCase().includes(query) ||
        c.location.toLowerCase().includes(query) ||
        c.city.toLowerCase().includes(query)
    );
  }

  if (filters?.stream && filters.stream !== 'All') {
    list = list.filter((c) => c.stream.toLowerCase() === filters.stream?.toLowerCase());
  }

  if (filters?.state && filters.state !== 'All') {
    list = list.filter((c) => c.state.toLowerCase() === filters.state?.toLowerCase());
  }

  if (filters?.type && filters.type !== 'All') {
    list = list.filter((c) => c.type.toLowerCase().includes(filters.type?.toLowerCase() || ''));
  }

  if (filters?.minFee !== undefined && filters?.minFee !== null) {
    list = list.filter((c) => c.tuitionFeesMin >= filters.minFee!);
  }

  if (filters?.maxFee !== undefined && filters?.maxFee !== null) {
    list = list.filter((c) => c.tuitionFeesMax <= filters.maxFee!);
  }

  if (filters?.minRating) {
    list = list.filter((c) => c.rating >= filters.minRating!);
  }

  if (filters?.sortBy) {
    switch (filters.sortBy) {
      case 'nirf':
        list.sort((a, b) => a.nirfRank - b.nirfRank);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'avgPackage':
        list.sort((a, b) => b.avgPackage - a.avgPackage);
        break;
      case 'highestPackage':
        list.sort((a, b) => b.highestPackage - a.highestPackage);
        break;
      case 'feesLowToHigh':
        list.sort((a, b) => a.tuitionFeesMin - b.tuitionFeesMin);
        break;
      default:
        break;
    }
  }

  return list;
}

export async function getCollegeBySlug(slug: string): Promise<CollegeData | null> {
  const college = COLLEGES_DATA.find((c) => c.slug.toLowerCase() === slug.toLowerCase() || c.id === slug);
  return college || null;
}

export async function getCollegesByIds(ids: string[]): Promise<CollegeData[]> {
  return COLLEGES_DATA.filter((c) => ids.includes(c.id) || ids.includes(c.slug));
}

export async function predictColleges(params: {
  exam: string;
  rank: number;
  category: string;
  stream?: string;
}) {
  const { exam, rank, category, stream } = params;

  let candidates = [...COLLEGES_DATA];

  if (stream && stream !== 'All') {
    candidates = candidates.filter((c) => c.stream.toLowerCase() === stream.toLowerCase());
  }

  const results = candidates.map((college) => {
    const cutoffs = college.cutoffs.filter(
      (cut) =>
        cut.exam.toLowerCase().includes(exam.toLowerCase()) ||
        exam.toLowerCase().includes(cut.exam.toLowerCase())
    );

    let matchProbability: 'High' | 'Moderate' | 'Low' = 'Moderate';
    let matchedCourse = college.courses[0]?.name || 'General Admission';
    let closingRankFound = 100000;

    if (cutoffs.length > 0) {
      const matchCutoff = cutoffs[0];
      closingRankFound = matchCutoff.closingRank;
      matchedCourse = matchCutoff.courseName;

      if (rank <= matchCutoff.closingRank * 0.85) {
        matchProbability = 'High';
      } else if (rank <= matchCutoff.closingRank * 1.15) {
        matchProbability = 'Moderate';
      } else {
        matchProbability = 'Low';
      }
    } else {
      if (rank <= 500) matchProbability = 'High';
      else if (rank <= 3000) matchProbability = 'Moderate';
      else matchProbability = 'Low';
    }

    return {
      college,
      matchedCourse,
      closingRank: closingRankFound,
      matchProbability,
      recommendationScore: matchProbability === 'High' ? 95 : matchProbability === 'Moderate' ? 75 : 45
    };
  });

  return results.sort((a, b) => b.recommendationScore - a.recommendationScore);
}

export async function getQuestions() {
  return INITIAL_QUESTIONS;
}
