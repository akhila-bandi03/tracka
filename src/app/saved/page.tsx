'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CollegeCard } from '@/components/CollegeCard';
import { CollegeData } from '@/lib/mock-data';
import { useCollegeContext } from '@/context/CollegeContext';
import { Bookmark, Building, GitCompare, ArrowRight, Trash2, Play } from 'lucide-react';

export default function SavedPage() {
  const router = useRouter();
  const { savedIds, savedComparisons, removeSavedComparison, loadSavedComparison } = useCollegeContext();
  const [savedColleges, setSavedColleges] = useState<CollegeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSaved() {
      if (savedIds.length === 0) {
        setSavedColleges([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`/api/compare?ids=${savedIds.join(',')}`);
        const data = await res.json();
        if (data.success) {
          setSavedColleges(data.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchSaved();
  }, [savedIds]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-gradient-to-b from-indigo-950/60 to-slate-950 border-b border-slate-800/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-semibold mb-2">
              <Bookmark className="w-4 h-4" />
              <span>Saved Items Profile</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">Bookmarked Colleges & Saved Comparisons</h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage your target college shortlist and custom comparison sets.
            </p>
          </div>

          {savedColleges.length > 0 && (
            <Link
              href="/compare"
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center space-x-2 self-start sm:self-auto"
            >
              <GitCompare className="w-4 h-4" />
              <span>Compare Shortlisted ({savedColleges.length})</span>
            </Link>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-12">
        {/* Saved Comparison Sets */}
        {savedComparisons.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <GitCompare className="w-5 h-5 text-indigo-400" />
              <span>Saved Comparison Sets ({savedComparisons.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedComparisons.map((set) => (
                <div key={set.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-white text-base">{set.name}</h3>
                    <p className="text-xs text-slate-400">
                      Contains {set.collegeIds.length} Colleges • Saved on {set.createdAt}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        loadSavedComparison(set.collegeIds);
                        router.push('/compare');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Launch</span>
                    </button>
                    <button
                      onClick={() => removeSavedComparison(set.id)}
                      className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-pink-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Saved Colleges */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-pink-400" />
            <span>Saved Colleges ({savedColleges.length})</span>
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-80 bg-slate-900 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : savedColleges.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/40 rounded-3xl border border-slate-800 max-w-xl mx-auto space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-pink-500/10 text-pink-400 flex items-center justify-center mx-auto">
                <Bookmark className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">No Bookmarked Colleges Yet</h3>
                <p className="text-slate-400 text-sm">
                  Browse our directory of top Indian colleges and click the bookmark icon to save them to your shortlist.
                </p>
              </div>

              <Link
                href="/colleges"
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg inline-flex items-center space-x-2"
              >
                <span>Explore Colleges</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedColleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
