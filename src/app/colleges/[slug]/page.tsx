'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CollegeData } from '@/lib/mock-data';
import { useCollegeContext } from '@/context/CollegeContext';
import {
  MapPin,
  Star,
  Award,
  TrendingUp,
  IndianRupee,
  Building,
  Bookmark,
  GitCompare,
  CheckCircle2,
  BookOpen,
  Users,
  Building2,
  Calendar,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  Layers,
} from 'lucide-react';

export default function CollegeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { isSaved, toggleSave, isInCompare, addToCompare, removeFromCompare } = useCollegeContext();

  const [college, setCollege] = useState<CollegeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'placements' | 'cutoffs' | 'reviews'>('overview');

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`/api/colleges/${resolvedParams.slug}`);
        const data = await res.json();
        if (data.success) {
          setCollege(data.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 w-full animate-pulse space-y-6">
          <div className="h-64 bg-slate-900 rounded-3xl" />
          <div className="h-12 bg-slate-900 rounded-xl w-1/3" />
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">College Not Found</h1>
          <p className="text-slate-400 text-sm">The college page you are looking for does not exist or has been removed.</p>
          <Link href="/colleges" className="inline-block px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm">
            Back to All Colleges
          </Link>
        </div>
      </div>
    );
  }

  const saved = isSaved(college.id);
  const inCompare = isInCompare(college.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      {/* Hero Banner Header */}
      <div className="relative bg-slate-900 border-b border-slate-800">
        <div className="h-64 sm:h-80 w-full relative overflow-hidden">
          <img
            src={college.bannerImage || college.image}
            alt={college.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-20 pb-8 z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-900 p-2 border-2 border-indigo-500/40 shadow-2xl overflow-hidden shrink-0">
                <img src={college.logo} alt={college.shortName} className="w-full h-full object-cover rounded-xl" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="px-2.5 py-0.5 text-xs font-bold rounded-lg bg-indigo-600/90 text-white">
                    NIRF #{college.nirfRank}
                  </span>
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    NAAC {college.naacGrade}
                  </span>
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-lg bg-slate-800 text-slate-300">
                    {college.type}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white">{college.name}</h1>
                <p className="text-xs sm:text-sm text-slate-400 flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <span>{college.location}, {college.state}</span>
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => (inCompare ? removeFromCompare(college.id) : addToCompare(college.id))}
                className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center space-x-2 transition ${
                  inCompare
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
                }`}
              >
                <GitCompare className="w-4 h-4" />
                <span>{inCompare ? 'In Comparison' : 'Compare'}</span>
              </button>

              <button
                onClick={() => toggleSave(college.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition ${
                  saved ? 'bg-pink-600 text-white' : 'bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-750'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${saved ? 'fill-white' : ''}`} />
                <span>{saved ? 'Bookmarked' : 'Save'}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium">Avg Package</span>
              <p className="text-lg font-extrabold text-emerald-400">₹{college.avgPackage} LPA</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium">Highest Package</span>
              <p className="text-lg font-extrabold text-purple-400">₹{college.highestPackage} LPA</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium">Est. Year</span>
              <p className="text-lg font-extrabold text-white">{college.establishmentYear}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium">Campus Size</span>
              <p className="text-lg font-extrabold text-indigo-400">{college.campusSize}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="sticky top-16 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-2 overflow-x-auto py-2">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'courses', label: `Courses & Fees (${college.courses.length})` },
            { id: 'placements', label: 'Placements' },
            { id: 'cutoffs', label: 'Entrance Cutoffs' },
            { id: 'reviews', label: `Reviews (${college.reviews.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Contents */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Description */}
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-indigo-400" />
                <span>About {college.name}</span>
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{college.description}</p>
            </div>

            {/* Campus Facilities Checklist */}
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>Campus Infrastructure & Facilities</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  'Wi-Fi Campus',
                  'Central Library & E-Journals',
                  'High Tech Innovation Labs',
                  'Student Hostels',
                  'Sports Complex & Gym',
                  'Medical Health Centre',
                ].map((fac) => (
                  <div key={fac} className="flex items-center space-x-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Offered Degrees & Fee Structure</h2>
            <div className="grid grid-cols-1 gap-4">
              {college.courses.map((course) => (
                <div key={course.id} className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-indigo-500/20 text-indigo-300">
                        {course.degree}
                      </span>
                      <h3 className="text-lg font-bold text-white mt-1">{course.name}</h3>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-xs text-slate-400">Total Program Fee</span>
                      <p className="text-lg font-extrabold text-indigo-400">₹{course.totalFees.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300 border-t border-slate-800/80">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Duration</span>
                      <span className="font-semibold">{course.duration}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Total Intake Seats</span>
                      <span className="font-semibold">{course.seats} Seats</span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-slate-400 block text-[11px]">Eligibility Criteria</span>
                      <span className="font-semibold text-slate-300">{course.eligibility}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'placements' && (
          <div className="space-y-6">
            {college.placementStats.map((p) => (
              <div key={p.id} className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h2 className="text-xl font-bold text-white">Placement Statistics ({p.year})</h2>
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {p.placementPercentage}% Placement Rate
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="text-xs text-slate-400">Average CTC</span>
                    <p className="text-2xl font-extrabold text-emerald-400 mt-1">₹{p.avgPackage} LPA</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="text-xs text-slate-400">Highest Package</span>
                    <p className="text-2xl font-extrabold text-purple-400 mt-1">₹{p.highestPackage} LPA</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="text-xs text-slate-400">Median Package</span>
                    <p className="text-2xl font-extrabold text-indigo-400 mt-1">₹{p.medianPackage} LPA</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Top Recruiters</h3>
                  <div className="flex flex-wrap gap-2">
                    {p.topRecruiters.map((company) => (
                      <span key={company} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-200">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'cutoffs' && (
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Entrance Exam Cutoffs</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-xs">
                  <tr>
                    <th className="p-3">Course</th>
                    <th className="p-3">Exam</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Opening Rank</th>
                    <th className="p-3">Closing Rank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {college.cutoffs.map((cut) => (
                    <tr key={cut.id} className="hover:bg-slate-800/50">
                      <td className="p-3 font-semibold text-white">{cut.courseName}</td>
                      <td className="p-3"><span className="px-2 py-0.5 text-xs rounded bg-indigo-500/20 text-indigo-300">{cut.exam}</span></td>
                      <td className="p-3">{cut.category}</td>
                      <td className="p-3 text-emerald-400 font-bold">#{cut.openingRank}</td>
                      <td className="p-3 text-indigo-400 font-bold">#{cut.closingRank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Verified Student Reviews</h2>
            {college.reviews.map((r) => (
              <div key={r.id} className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base">{r.authorName}</h3>
                    <p className="text-xs text-slate-400">{r.authorRole}</p>
                  </div>
                  <div className="flex items-center space-x-1 bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-lg text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{r.rating} / 5.0</span>
                  </div>
                </div>
                <h4 className="font-semibold text-indigo-300 text-sm">{r.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{r.comment}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-300">
                    <strong className="block mb-0.5">Pros:</strong> {r.pros}
                  </div>
                  <div className="p-2.5 rounded-xl bg-pink-950/30 border border-pink-500/20 text-pink-300">
                    <strong className="block mb-0.5">Cons:</strong> {r.cons}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
