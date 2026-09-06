import { PrismaClient } from '@prisma/client';
import { COLLEGES_DATA, INITIAL_QUESTIONS } from '../src/lib/mock-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding College Discovery Platform Database...');

  // Clear existing data
  await prisma.answer.deleteMany();
  await prisma.question.deleteMany();
  await prisma.cutoff.deleteMany();
  await prisma.review.deleteMany();
  await prisma.placement.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();

  for (const c of COLLEGES_DATA) {
    await prisma.college.create({
      data: {
        id: c.id,
        slug: c.slug,
        name: c.name,
        shortName: c.shortName,
        location: c.location,
        state: c.state,
        city: c.city,
        stream: c.stream,
        establishmentYear: c.establishmentYear,
        type: c.type,
        nirfRank: c.nirfRank,
        naacGrade: c.naacGrade,
        rating: c.rating,
        totalReviews: c.totalReviews,
        avgPackage: c.avgPackage,
        highestPackage: c.highestPackage,
        tuitionFeesMin: c.tuitionFeesMin,
        tuitionFeesMax: c.tuitionFeesMax,
        campusSize: c.campusSize,
        image: c.image,
        logo: c.logo,
        bannerImage: c.bannerImage,
        description: c.description,
        featured: c.featured,
        courses: {
          create: c.courses.map((course) => ({
            name: course.name,
            stream: course.stream,
            degree: course.degree,
            duration: course.duration,
            totalFees: course.totalFees,
            seats: course.seats,
            eligibility: course.eligibility,
          })),
        },
        placementStats: {
          create: c.placementStats.map((p) => ({
            year: p.year,
            avgPackage: p.avgPackage,
            highestPackage: p.highestPackage,
            medianPackage: p.medianPackage,
            placementPercentage: p.placementPercentage,
            topRecruiters: p.topRecruiters.join(', '),
          })),
        },
        reviews: {
          create: c.reviews.map((r) => ({
            authorName: r.authorName,
            authorRole: r.authorRole,
            rating: r.rating,
            title: r.title,
            comment: r.comment,
            pros: r.pros,
            cons: r.cons,
            createdAt: new Date(r.createdAt),
          })),
        },
        cutoffs: {
          create: c.cutoffs.map((cut) => ({
            exam: cut.exam,
            category: cut.category,
            courseName: cut.courseName,
            openingRank: cut.openingRank,
            closingRank: cut.closingRank,
            percentile: cut.percentile,
            year: cut.year,
          })),
        },
      },
    });
  }

  for (const q of INITIAL_QUESTIONS) {
    await prisma.question.create({
      data: {
        id: q.id,
        collegeId: q.collegeId,
        authorName: q.authorName,
        title: q.title,
        content: q.content,
        category: q.category,
        upvotes: q.upvotes,
        answers: {
          create: q.answers.map((a) => ({
            id: a.id,
            authorName: a.authorName,
            authorRole: a.authorRole,
            content: a.content,
            upvotes: a.upvotes,
            createdAt: new Date(a.createdAt),
          })),
        },
      },
    });
  }

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
