'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CollegeData, COLLEGES_DATA } from '@/lib/mock-data';
import { useCollegeContext } from '@/context/CollegeContext';
import {
  GitCompare,
  X,
  Plus,
  Award,
  TrendingUp,
  IndianRupee,
  Building,
  Star,
  CheckCircle2,
  Trash2,
  Bookmark,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function ComparePage() {
  const { compareIds, removeFromCompare, clearCompare, addToCompare, saveCurrentComparison } = useCollegeContext();

  const [colleges, setColleges] = useState<CollegeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchCompareData() {
      if (compareIds.length === 0) {
        setColleges([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/compare?ids=${compareIds.join(',')}`);
        const data = await res.json();
        if (data.success) {
          setColleges(data.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchCompareData();
  }, [compareIds]);

  const availableColleges = COLLEGES_DATA.filter(
    (c) =>
      !compareIds.includes(c.id) &&
      (c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.shortName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-gradient-to-b from-indigo-950/60 to-slate-950 border-b border-slate-800/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-2">
              <GitCompare className="w-4 h-4" />
              <span>Side-by-Side Comparison Matrix</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">Compare Colleges</h1>
            <p className="text-slate-400 text-sm mt-1">
              Analyze fees, ROI, NIRF ranks, placements, and ratings across up to 3 colleges.
            </p>
          </div>

          {compareIds.length > 0 && (
            <div className="flex items-center space-x-2 self-start sm:self-auto">
              <button
                onClick={() => {
                  const setName = prompt('Enter a name for this comparison set:', 'Target Engineering IITs');
                  if (setName) saveCurrentComparison(setName);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-2 shadow-md shadow-indigo-600/20"
              >
                <Bookmark className="w-4 h-4" />
                <span>Save Comparison Set</span>
              </button>

              <button
                onClick={clearCompare}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 hover:text-pink-400 hover:border-pink-500/30 flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-8">
        {compareIds.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 rounded-3xl border border-slate-800 max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto">
              <GitCompare className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">No Colleges Selected for Comparison</h2>
              <p className="text-slate-400 text-sm">
                Add 2 or 3 colleges to compare tuition fees, average placements, NIRF ranks, and student ratings side by side.
              </p>
            </div>

            <button
              onClick={() => setSearchModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 inline-flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add College to Compare</span>
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Top College Selectors Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-center space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Comparison Trays</span>
                <p className="text-sm font-semibold text-white">Comparing {colleges.length} / 3 Colleges</p>
                {colleges.length < 3 && (
                  <button
                    onClick={() => setSearchModalOpen(true)}
                    className="mt-2 py-2 px-3 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Another College</span>
                  </button>
                )}
              </div>

              {colleges.map((c) => (
                <div key={c.id} className="relative p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center text-center space-y-3">
                  <button
                    onClick={() => removeFromCompare(c.id)}
                    className="absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <img src={c.logo} alt={c.shortName} className="w-14 h-14 rounded-xl object-cover border border-slate-700 mt-2" />
                  <div>
                    <h3 className="font-bold text-white text-sm line-clamp-1">{c.shortName}</h3>
                    <p className="text-[11px] text-slate-400">{c.location}</p>
                  </div>
                  <Link
                    href={`/colleges/${c.slug}`}
                    className="text-[11px] font-semibold text-indigo-400 hover:underline"
                  >
                    View Detail Page →
                  </Link>
                </div>
              ))}
            </div>

            {/* Comparison Matrix Table */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="p-4 w-1/4">Metric</th>
                    {colleges.map((c) => (
                      <th key={c.id} className="p-4 font-bold text-white">{c.shortName}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-sm text-slate-300">
                  {/* NIRF Rank */}
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-4 font-semibold text-slate-400 flex items-center space-x-2">
                      <Award className="w-4 h-4 text-indigo-400" />
                      <span>NIRF Rank 2024</span>
                    </td>
                    {colleges.map((c) => (
                      <td key={c.id} className="p-4 font-extrabold text-white">
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          #{c.nirfRank}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Avg Placement Package */}
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-4 font-semibold text-slate-400 flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span>Average Placement CTC</span>
                    </td>
                    {colleges.map((c) => (
                      <td key={c.id} className="p-4 font-extrabold text-emerald-400 text-base">
                        ₹{c.avgPackage} LPA
                      </td>
                    ))}
                  </tr>

                  {/* Highest Package */}
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-4 font-semibold text-slate-400 flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                      <span>Highest Package</span>
                    </td>
                    {colleges.map((c) => (
                      <td key={c.id} className="p-4 font-bold text-purple-400">
                        ₹{c.highestPackage} LPA
                      </td>
                    ))}
                  </tr>

                  {/* Campus Location */}
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-4 font-semibold text-slate-400 flex items-center space-x-2">
                      <Building className="w-4 h-4 text-indigo-400" />
                      <span>Campus Location</span>
                    </td>
                    {colleges.map((c) => (
                      <td key={c.id} className="p-4 font-medium text-slate-200">
                        {c.location}, {c.state}
                      </td>
                    ))}
                  </tr>

                  {/* Total Tuition Fees */}
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-4 font-semibold text-slate-400 flex items-center space-x-2">
                      <IndianRupee className="w-4 h-4 text-amber-400" />
                      <span>Total Tuition Fees</span>
                    </td>
                    {colleges.map((c) => (
                      <td key={c.id} className="p-4 font-semibold text-slate-200">
                        ₹{(c.tuitionFeesMin / 100000).toFixed(1)} Lakhs
                      </td>
                    ))}
                  </tr>

                  {/* Institute Type */}
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-4 font-semibold text-slate-400">Establishment / Type</td>
                    {colleges.map((c) => (
                      <td key={c.id} className="p-4">
                        <span className="text-xs font-medium text-slate-300">{c.type} ({c.establishmentYear})</span>
                      </td>
                    ))}
                  </tr>

                  {/* NAAC Accreditation */}
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-4 font-semibold text-slate-400">NAAC Accreditation</td>
                    {colleges.map((c) => (
                      <td key={c.id} className="p-4">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                          Grade {c.naacGrade}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Rating & Reviews */}
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-4 font-semibold text-slate-400">Student Rating</td>
                    {colleges.map((c) => (
                      <td key={c.id} className="p-4">
                        <div className="flex items-center space-x-1 text-amber-400 font-bold">
                          <Star className="w-4 h-4 fill-amber-400" />
                          <span>{c.rating} / 5.0</span>
                          <span className="text-xs text-slate-500 font-normal">({c.totalReviews})</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Top Recruiters */}
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-4 font-semibold text-slate-400">Key Hiring Recruiters</td>
                    {colleges.map((c) => (
                      <td key={c.id} className="p-4 text-xs text-slate-300">
                        {c.placementStats[0]?.topRecruiters.slice(0, 4).join(', ') || 'N/A'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Add College Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Select College to Compare</h3>
              <button onClick={() => setSearchModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by college name or city..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />

            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {availableColleges.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    addToCompare(c.id);
                    setSearchModalOpen(false);
                  }}
                  className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 cursor-pointer flex items-center justify-between transition"
                >
                  <div className="flex items-center space-x-3">
                    <img src={c.logo} alt={c.shortName} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{c.shortName}</h4>
                      <p className="text-xs text-slate-400">{c.location}</p>
                    </div>
                  </div>
                  <span className="text-xs text-indigo-400 font-semibold">+ Add</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
