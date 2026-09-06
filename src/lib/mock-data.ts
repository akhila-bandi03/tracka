export interface CollegeData {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  location: string;
  state: string;
  city: string;
  stream: string; // Engineering, Management, Medical, Law
  establishmentYear: number;
  type: string; // Public, Private, Autonomous
  nirfRank: number;
  naacGrade: string;
  rating: number;
  totalReviews: number;
  avgPackage: number; // LPA
  highestPackage: number; // LPA
  tuitionFeesMin: number;
  tuitionFeesMax: number;
  campusSize: string;
  image: string;
  logo: string;
  bannerImage: string;
  description: string;
  featured: boolean;
  courses: {
    id: string;
    name: string;
    stream: string;
    degree: string;
    duration: string;
    totalFees: number;
    seats: number;
    eligibility: string;
  }[];
  placementStats: {
    id: string;
    year: number;
    avgPackage: number;
    highestPackage: number;
    medianPackage: number;
    placementPercentage: number;
    topRecruiters: string[];
  }[];
  reviews: {
    id: string;
    authorName: string;
    authorRole: string;
    rating: number;
    title: string;
    comment: string;
    pros: string;
    cons: string;
    createdAt: string;
  }[];
  cutoffs: {
    id: string;
    exam: string;
    category: string;
    courseName: string;
    openingRank: number;
    closingRank: number;
    percentile?: number;
    year: number;
  }[];
}

export const COLLEGES_DATA: CollegeData[] = [
  {
    id: "iit-bombay",
    slug: "iit-bombay",
    name: "Indian Institute of Technology Bombay",
    shortName: "IIT Bombay",
    location: "Powai, Mumbai",
    state: "Maharashtra",
    city: "Mumbai",
    stream: "Engineering",
    establishmentYear: 1958,
    type: "Public / Autonomous",
    nirfRank: 3,
    naacGrade: "A++",
    rating: 4.9,
    totalReviews: 1850,
    avgPackage: 23.5,
    highestPackage: 367.0,
    tuitionFeesMin: 800000,
    tuitionFeesMax: 1000000,
    campusSize: "550 Acres",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop",
    description: "IIT Bombay is a globally acclaimed institute of national importance known for world-class technical education, research innovation, and vibrant campus life in Powai, Mumbai.",
    featured: true,
    courses: [
      {
        id: "c-iitb-1",
        name: "B.Tech Computer Science & Engineering",
        stream: "Engineering",
        degree: "B.Tech",
        duration: "4 Years",
        totalFees: 920000,
        seats: 145,
        eligibility: "10+2 with 75% marks in PCM + Rank in JEE Advanced"
      },
      {
        id: "c-iitb-2",
        name: "B.Tech Electrical Engineering",
        stream: "Engineering",
        degree: "B.Tech",
        duration: "4 Years",
        totalFees: 920000,
        seats: 120,
        eligibility: "10+2 with 75% marks in PCM + Rank in JEE Advanced"
      },
      {
        id: "c-iitb-3",
        name: "B.Tech Mechanical Engineering",
        stream: "Engineering",
        degree: "B.Tech",
        duration: "4 Years",
        totalFees: 920000,
        seats: 160,
        eligibility: "10+2 with 75% marks in PCM + Rank in JEE Advanced"
      }
    ],
    placementStats: [
      {
        id: "p-iitb-2024",
        year: 2024,
        avgPackage: 23.5,
        highestPackage: 367.0,
        medianPackage: 19.8,
        placementPercentage: 96.2,
        topRecruiters: ["Google", "Microsoft", "Apple", "Uber", "Jane Street", "Goldman Sachs", "Texas Instruments"]
      }
    ],
    reviews: [
      {
        id: "r-iitb-1",
        authorName: "Aarav Sharma",
        authorRole: "B.Tech CSE, Batch 2024",
        rating: 5.0,
        title: "Peer group and research facilities are peerless in Asia!",
        comment: "The learning environment is intensely motivating. Techfest and Mood Indigo make campus life unforgettable.",
        pros: "World class faculty, top tier placements, sprawling lakeside campus.",
        cons: "Highly competitive atmosphere and rigorous academic workload.",
        createdAt: "2024-03-15"
      }
    ],
    cutoffs: [
      {
        id: "cut-iitb-1",
        exam: "JEE Advanced",
        category: "General",
        courseName: "Computer Science & Engineering",
        openingRank: 1,
        closingRank: 67,
        year: 2024
      },
      {
        id: "cut-iitb-2",
        exam: "JEE Advanced",
        category: "General",
        courseName: "Electrical Engineering",
        openingRank: 68,
        closingRank: 480,
        year: 2024
      },
      {
        id: "cut-iitb-3",
        exam: "JEE Advanced",
        category: "OBC",
        courseName: "Computer Science & Engineering",
        openingRank: 1,
        closingRank: 25,
        year: 2024
      }
    ]
  },
  {
    id: "iit-delhi",
    slug: "iit-delhi",
    name: "Indian Institute of Technology Delhi",
    shortName: "IIT Delhi",
    location: "Hauz Khas, New Delhi",
    state: "Delhi",
    city: "New Delhi",
    stream: "Engineering",
    establishmentYear: 1961,
    type: "Public / Autonomous",
    nirfRank: 2,
    naacGrade: "A++",
    rating: 4.9,
    totalReviews: 1620,
    avgPackage: 25.8,
    highestPackage: 240.0,
    tuitionFeesMin: 850000,
    tuitionFeesMax: 1050000,
    campusSize: "320 Acres",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1600&auto=format&fit=crop",
    description: "IIT Delhi is a premier center of excellence in engineering and technology in the heart of the national capital region, known for startup incubators and cutting-edge labs.",
    featured: true,
    courses: [
      {
        id: "c-iitd-1",
        name: "B.Tech Computer Science & Engineering",
        stream: "Engineering",
        degree: "B.Tech",
        duration: "4 Years",
        totalFees: 950000,
        seats: 120,
        eligibility: "10+2 with 75% marks in PCM + Rank in JEE Advanced"
      },
      {
        id: "c-iitd-2",
        name: "B.Tech Mathematics & Computing",
        stream: "Engineering",
        degree: "B.Tech",
        duration: "4 Years",
        totalFees: 950000,
        seats: 90,
        eligibility: "10+2 with 75% marks in PCM + Rank in JEE Advanced"
      }
    ],
    placementStats: [
      {
        id: "p-iitd-2024",
        year: 2024,
        avgPackage: 25.8,
        highestPackage: 240.0,
        medianPackage: 20.5,
        placementPercentage: 97.1,
        topRecruiters: ["Microsoft", "Google", "Brain & Co", "McKinsey", "Rubrik", "Optiver"]
      }
    ],
    reviews: [
      {
        id: "r-iitd-1",
        authorName: "Ananya Roy",
        authorRole: "B.Tech MnC, Batch 2023",
        rating: 4.9,
        title: "Incredible tech ecosystem in Delhi NCR",
        comment: "Great proximity to major corporate headquarters and startup incubators. Campus life is lively.",
        pros: "Location advantage, high median packages, vibrant student clubs.",
        cons: "Hostel rooms can be compact.",
        createdAt: "2024-02-10"
      }
    ],
    cutoffs: [
      {
        id: "cut-iitd-1",
        exam: "JEE Advanced",
        category: "General",
        courseName: "Computer Science & Engineering",
        openingRank: 15,
        closingRank: 118,
        year: 2024
      },
      {
        id: "cut-iitd-2",
        exam: "JEE Advanced",
        category: "General",
        courseName: "Mathematics & Computing",
        openingRank: 119,
        closingRank: 330,
        year: 2024
      }
    ]
  },
  {
    id: "iit-madras",
    slug: "iit-madras",
    name: "Indian Institute of Technology Madras",
    shortName: "IIT Madras",
    location: "Adyar, Chennai",
    state: "Tamil Nadu",
    city: "Chennai",
    stream: "Engineering",
    establishmentYear: 1959,
    type: "Public / Autonomous",
    nirfRank: 1,
    naacGrade: "A++",
    rating: 4.95,
    totalReviews: 2100,
    avgPackage: 22.0,
    highestPackage: 198.0,
    tuitionFeesMin: 800000,
    tuitionFeesMax: 1000000,
    campusSize: "630 Acres",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop",
    description: "Ranked #1 overall in India by NIRF for multiple consecutive years, IIT Madras features a lush green campus with blackbucks and national research parks.",
    featured: true,
    courses: [
      {
        id: "c-iitm-1",
        name: "B.Tech Computer Science & Engineering",
        stream: "Engineering",
        degree: "B.Tech",
        duration: "4 Years",
        totalFees: 900000,
        seats: 130,
        eligibility: "10+2 with 75% marks in PCM + Rank in JEE Advanced"
      },
      {
        id: "c-iitm-2",
        name: "B.Tech Aerospace Engineering",
        stream: "Engineering",
        degree: "B.Tech",
        duration: "4 Years",
        totalFees: 900000,
        seats: 60,
        eligibility: "10+2 with 75% marks in PCM + Rank in JEE Advanced"
      }
    ],
    placementStats: [
      {
        id: "p-iitm-2024",
        year: 2024,
        avgPackage: 22.0,
        highestPackage: 198.0,
        medianPackage: 18.5,
        placementPercentage: 95.8,
        topRecruiters: ["Qualcomm", "Intel", "Samsung R&D", "Google", "Amazon", "Boeing"]
      }
    ],
    reviews: [
      {
        id: "r-iitm-1",
        authorName: "Karthik Subramanian",
        authorRole: "B.Tech Aerospace, Batch 2024",
        rating: 5.0,
        title: "Rank 1 institute for a reason!",
        comment: "IIT Madras Research Park is world-class. Plenty of research fellowships and international exchanges.",
        pros: "Lush green campus, top NIRF ranking, exceptional faculty.",
        cons: "Humid weather during summer.",
        createdAt: "2024-01-22"
      }
    ],
    cutoffs: [
      {
        id: "cut-iitm-1",
        exam: "JEE Advanced",
        category: "General",
        courseName: "Computer Science & Engineering",
        openingRank: 40,
        closingRank: 148,
        year: 2024
      }
    ]
  },
  {
    id: "iim-ahmedabad",
    slug: "iim-ahmedabad",
    name: "Indian Institute of Management Ahmedabad",
    shortName: "IIM Ahmedabad",
    location: "Vastrapur, Ahmedabad",
    state: "Gujarat",
    city: "Ahmedabad",
    stream: "Management",
    establishmentYear: 1961,
    type: "Public / Autonomous",
    nirfRank: 1,
    naacGrade: "A++",
    rating: 4.95,
    totalReviews: 1400,
    avgPackage: 34.45,
    highestPackage: 115.0,
    tuitionFeesMin: 2400000,
    tuitionFeesMax: 2600000,
    campusSize: "106 Acres",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1000&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1600&auto=format&fit=crop",
    description: "The premier business school in Asia, famous for Louis Kahn architecture, case study pedagogy, and producing top corporate leaders globally.",
    featured: true,
    courses: [
      {
        id: "c-iima-1",
        name: "PGP (MBA) Master of Business Administration",
        stream: "Management",
        degree: "MBA",
        duration: "2 Years",
        totalFees: 2500000,
        seats: 400,
        eligibility: "Bachelor's Degree with 50% + CAT Score + GD/PI"
      },
      {
        id: "c-iima-2",
        name: "PGP-FABM (Food & Agribusiness Management)",
        stream: "Management",
        degree: "MBA",
        duration: "2 Years",
        totalFees: 2500000,
        seats: 50,
        eligibility: "Bachelor's Degree in Agri/Allied + CAT Score"
      }
    ],
    placementStats: [
      {
        id: "p-iima-2024",
        year: 2024,
        avgPackage: 34.45,
        highestPackage: 115.0,
        medianPackage: 31.5,
        placementPercentage: 100.0,
        topRecruiters: ["McKinsey & Company", "BCG", "Bain & Company", "Goldman Sachs", "Morgan Stanley", "Tata Administrative Services"]
      }
    ],
    reviews: [
      {
        id: "r-iima-1",
        authorName: "Rohan Varma",
        authorRole: "PGP Student, Batch 2023",
        rating: 5.0,
        title: "Transformative 2 years at WAKA (WIMA)",
        comment: "Case method brings real boardroom decision-making into the classroom daily.",
        pros: "100% placement record, elite alumni network, top consulting & IB roles.",
        cons: "Extreme academic rigor and sleep deprivation in term 1.",
        createdAt: "2024-04-01"
      }
    ],
    cutoffs: [
      {
        id: "cut-iima-1",
        exam: "CAT",
        category: "General",
        courseName: "PGP (MBA)",
        openingRank: 99.5,
        closingRank: 99.9,
        percentile: 99.6,
        year: 2024
      }
    ]
  },
  {
    id: "bits-pilani",
    slug: "bits-pilani",
    name: "Birla Institute of Technology and Science Pilani",
    shortName: "BITS Pilani",
    location: "Vidya Vihar, Pilani",
    state: "Rajasthan",
    city: "Pilani",
    stream: "Engineering",
    establishmentYear: 1964,
    type: "Private / Deemed",
    nirfRank: 20,
    naacGrade: "A",
    rating: 4.75,
    totalReviews: 2400,
    avgPackage: 20.8,
    highestPackage: 60.7,
    tuitionFeesMin: 1900000,
    tuitionFeesMax: 2200000,
    campusSize: "328 Acres",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1600&auto=format&fit=crop",
    description: "BITS Pilani is India's highest rated private university, famous for Zero Attendance Policy, Practice School (PS-II) paid corporate internships, and BITSAT exam.",
    featured: true,
    courses: [
      {
        id: "c-bits-1",
        name: "B.E. Computer Science",
        stream: "Engineering",
        degree: "B.E.",
        duration: "4 Years",
        totalFees: 2050000,
        seats: 140,
        eligibility: "10+2 with 75% aggregate in PCM + Score in BITSAT"
      },
      {
        id: "c-bits-2",
        name: "B.E. Electronics & Communication",
        stream: "Engineering",
        degree: "B.E.",
        duration: "4 Years",
        totalFees: 2050000,
        seats: 120,
        eligibility: "10+2 with 75% aggregate in PCM + Score in BITSAT"
      }
    ],
    placementStats: [
      {
        id: "p-bits-2024",
        year: 2024,
        avgPackage: 20.8,
        highestPackage: 60.7,
        medianPackage: 17.5,
        placementPercentage: 94.5,
        topRecruiters: ["NVIDIA", "Salesforce", "Google", "DE Shaw", "Oracle", "Qualcomm"]
      }
    ],
    reviews: [
      {
        id: "r-bits-1",
        authorName: "Devansh Mehta",
        authorRole: "B.E. CS, Batch 2024",
        rating: 4.8,
        title: "Zero attendance policy gives freedom to innovate & build startups",
        comment: "Practice school program guaranteed my 6-month paid internship at Salesforce which converted into FTE.",
        pros: "No reservation system, Practice School internship, vibrant fests (Oasis, APOGEE).",
        cons: "High tuition fees compared to government IITs.",
        createdAt: "2024-03-28"
      }
    ],
    cutoffs: [
      {
        id: "cut-bits-1",
        exam: "BITSAT",
        category: "General",
        courseName: "B.E. Computer Science",
        openingRank: 331,
        closingRank: 390,
        year: 2024
      }
    ]
  },
  {
    id: "aiims-new-delhi",
    slug: "aiims-new-delhi",
    name: "All India Institute of Medical Sciences New Delhi",
    shortName: "AIIMS Delhi",
    location: "Ansari Nagar, New Delhi",
    state: "Delhi",
    city: "New Delhi",
    stream: "Medical",
    establishmentYear: 1956,
    type: "Public / Autonomous",
    nirfRank: 1,
    naacGrade: "A++",
    rating: 4.98,
    totalReviews: 950,
    avgPackage: 18.0,
    highestPackage: 35.0,
    tuitionFeesMin: 6850,
    tuitionFeesMax: 10000,
    campusSize: "115 Acres",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1000&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1600&auto=format&fit=crop",
    description: "AIIMS New Delhi is India's apex medical institution, offering world-class medical training, clinical research, patient care, and virtually subsidized tuition fees.",
    featured: true,
    courses: [
      {
        id: "c-aiims-1",
        name: "MBBS (Bachelor of Medicine and Bachelor of Surgery)",
        stream: "Medical",
        degree: "MBBS",
        duration: "5.5 Years",
        totalFees: 6850,
        seats: 125,
        eligibility: "10+2 with PCB + Top rank in NEET UG"
      },
      {
        id: "c-aiims-2",
        name: "B.Sc (Hons) Nursing",
        stream: "Medical",
        degree: "B.Sc",
        duration: "4 Years",
        totalFees: 3200,
        seats: 96,
        eligibility: "10+2 with PCB + AIIMS Nursing Entrance"
      }
    ],
    placementStats: [
      {
        id: "p-aiims-2024",
        year: 2024,
        avgPackage: 18.0,
        highestPackage: 35.0,
        medianPackage: 16.0,
        placementPercentage: 100.0,
        topRecruiters: ["AIIMS Residency", "Apollo Hospitals", "Max Healthcare", "Fortis", "NHS UK", "Mayo Clinic (Fellowship)"]
      }
    ],
    reviews: [
      {
        id: "r-aiims-1",
        authorName: "Dr. Priyamvada Singh",
        authorRole: "MBBS Intern, Batch 2023",
        rating: 5.0,
        title: "The Mecca of Medical Education in India",
        comment: "Unmatched clinical exposure. You see rare medical cases every single day in OPD and wards.",
        pros: "Minimal fee (~Rs 5800 total), top medical residency matches, prestige.",
        cons: "Extremely high workload and long duty hours.",
        createdAt: "2024-02-18"
      }
    ],
    cutoffs: [
      {
        id: "cut-aiims-1",
        exam: "NEET UG",
        category: "General",
        courseName: "MBBS",
        openingRank: 1,
        closingRank: 57,
        year: 2024
      },
      {
        id: "cut-aiims-2",
        exam: "NEET UG",
        category: "OBC",
        courseName: "MBBS",
        openingRank: 58,
        closingRank: 250,
        year: 2024
      }
    ]
  },
  {
    id: "vit-vellore",
    slug: "vit-vellore",
    name: "Vellore Institute of Technology",
    shortName: "VIT Vellore",
    location: "Katpadi, Vellore",
    state: "Tamil Nadu",
    city: "Vellore",
    stream: "Engineering",
    establishmentYear: 1984,
    type: "Private / Deemed",
    nirfRank: 11,
    naacGrade: "A++",
    rating: 4.4,
    totalReviews: 3800,
    avgPackage: 9.2,
    highestPackage: 102.0,
    tuitionFeesMin: 780000,
    tuitionFeesMax: 1400000,
    campusSize: "372 Acres",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop",
    description: "VIT Vellore is one of India's largest and most popular private technology institutes, known for its Flexible Credit System (FFCS) and massive placement drives.",
    featured: false,
    courses: [
      {
        id: "c-vit-1",
        name: "B.Tech Computer Science & Engineering",
        stream: "Engineering",
        degree: "B.Tech",
        duration: "4 Years",
        totalFees: 780000,
        seats: 1200,
        eligibility: "10+2 with 60% in PCM + VITEEE Rank"
      }
    ],
    placementStats: [
      {
        id: "p-vit-2024",
        year: 2024,
        avgPackage: 9.2,
        highestPackage: 102.0,
        medianPackage: 8.0,
        placementPercentage: 90.0,
        topRecruiters: ["TCS", "Cognizant", "Wipro", "Amazon", "Microsoft", "PayPal"]
      }
    ],
    reviews: [
      {
        id: "r-vit-1",
        authorName: "Siddharth Jain",
        authorRole: "B.Tech CSE Student",
        rating: 4.3,
        title: "Great infrastructure and exposure",
        comment: "FFCS gives freedom to select preferred professors and timetables.",
        pros: "Massive campus, diverse peer group, high placement volume.",
        cons: "Strict campus curfew for first year students.",
        createdAt: "2024-03-05"
      }
    ],
    cutoffs: [
      {
        id: "cut-vit-1",
        exam: "VITEEE",
        category: "General",
        courseName: "B.Tech CSE (Category 1)",
        openingRank: 1,
        closingRank: 7500,
        year: 2024
      }
    ]
  },
  {
    id: "dtu-delhi",
    slug: "dtu-delhi",
    name: "Delhi Technological University",
    shortName: "DTU Delhi",
    location: "Bawana Road, Delhi",
    state: "Delhi",
    city: "New Delhi",
    stream: "Engineering",
    establishmentYear: 1941,
    type: "Public / State Govt",
    nirfRank: 29,
    naacGrade: "A",
    rating: 4.6,
    totalReviews: 2150,
    avgPackage: 16.8,
    highestPackage: 82.5,
    tuitionFeesMin: 880000,
    tuitionFeesMax: 980000,
    campusSize: "164 Acres",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=200&auto=format&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop",
    description: "Formerly known as Delhi College of Engineering (DCE), DTU is one of India's oldest and most prestigious engineering institutions with stellar placement records.",
    featured: true,
    courses: [
      {
        id: "c-dtu-1",
        name: "B.Tech Computer Engineering",
        stream: "Engineering",
        degree: "B.Tech",
        duration: "4 Years",
        totalFees: 900000,
        seats: 360,
        eligibility: "10+2 with PCM + Rank in JEE Main + JAC Delhi Counseling"
      },
      {
        id: "c-dtu-2",
        name: "B.Tech Information Technology",
        stream: "Engineering",
        degree: "B.Tech",
        duration: "4 Years",
        totalFees: 900000,
        seats: 180,
        eligibility: "10+2 with PCM + Rank in JEE Main + JAC Delhi Counseling"
      }
    ],
    placementStats: [
      {
        id: "p-dtu-2024",
        year: 2024,
        avgPackage: 16.8,
        highestPackage: 82.5,
        medianPackage: 14.5,
        placementPercentage: 92.5,
        topRecruiters: ["Adobe", "Atlassian", "Uber", "Sprinklr", "Amazon", "Goldman Sachs"]
      }
    ],
    reviews: [
      {
        id: "r-dtu-1",
        authorName: "Vikas Kumar",
        authorRole: "B.Tech COE, Batch 2023",
        rating: 4.7,
        title: "Superb coding culture and tech fests",
        comment: "Engifest is huge. Placement season brings almost all tech giants to campus.",
        pros: "85% Delhi quota, excellent ROI, active tech societies.",
        cons: "Crowded lecture halls due to high intake.",
        createdAt: "2024-02-20"
      }
    ],
    cutoffs: [
      {
        id: "cut-dtu-1",
        exam: "JEE Main",
        category: "General (Delhi)",
        courseName: "Computer Engineering",
        openingRank: 1200,
        closingRank: 6200,
        year: 2024
      },
      {
        id: "cut-dtu-2",
        exam: "JEE Main",
        category: "General (Outside Delhi)",
        courseName: "Computer Engineering",
        openingRank: 500,
        closingRank: 2400,
        year: 2024
      }
    ]
  }
];

export const INITIAL_QUESTIONS = [
  {
    id: "q-1",
    collegeId: "iit-bombay",
    authorName: "Rahul Verma",
    title: "Is it worth preferring IIT Bombay Electrical over IIT Delhi CSE?",
    content: "I have a rank in JEE Advanced that allows me to get IIT Bombay Electrical or IIT Delhi CSE. How do placement opportunities and research labs compare between the two?",
    category: "Admissions",
    upvotes: 42,
    answers: [
      {
        id: "a-1",
        authorName: "Dr. S. K. Nandi",
        authorRole: "IIT Bombay Alumni & Researcher",
        content: "If your core interest lies strictly in software algorithms and tech roles, IIT Delhi CSE is fantastic. However, IIT Bombay Electrical has a heavy overlap with microelectronics, AI hardware, and modern VLSI. Both institutes carry equal prestige.",
        upvotes: 28,
        createdAt: "2024-05-12"
      }
    ],
    createdAt: "2024-05-10"
  },
  {
    id: "q-2",
    collegeId: "bits-pilani",
    authorName: "Sneha Patel",
    title: "What is the median stipend in BITS Pilani Practice School II?",
    content: "Could anyone share recent stipend figures for Practice School 2 internships at top companies like Salesforce, NVIDIA, or Amazon?",
    category: "Placement",
    upvotes: 19,
    answers: [
      {
        id: "a-2",
        authorName: "Aman Gupta",
        authorRole: "BITS Pilani 4th Year Student",
        content: "Top tech PS-II stations pay stipends ranging from INR 60,000 to INR 1.5 Lakhs per month. Companies like Nutanix, Uber, and Texas Instruments pay on the higher end of that spectrum.",
        upvotes: 14,
        createdAt: "2024-06-01"
      }
    ],
    createdAt: "2024-05-28"
  }
];
