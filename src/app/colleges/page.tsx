'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CollegeCard } from '@/components/CollegeCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { CollegeData } from '@/lib/mock-data';
import {
  Search,
  SlidersHorizontal,
  Grid,
  List,
  X,
  Sparkles,
  RotateCcw,
  Building,
} from 'lucide-react';

function CollegesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [stream, setStream] = useState(searchParams.get('stream') || 'All');
  const [state, setState] = useState(searchParams.get('state') || 'All');
  const [type, setType] = useState(searchParams.get('type') || 'All');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'nirf');

  const [colleges, setColleges] = useState<CollegeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    async function fetchColleges() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.set('search', search);
        if (stream && stream !== 'All') queryParams.set('stream', stream);
        if (state && state !== 'All') queryParams.set('state', state);
        if (type && type !== 'All') queryParams.set('type', type);
        if (sortBy) queryParams.set('sortBy', sortBy);

        const res = await fetch(`/api/colleges?${queryParams.toString()}`);
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

    fetchColleges();
  }, [search, stream, state, type, sortBy]);

  const resetFilters = () => {
    setSearch('');
    setStream('All');
    setState('All');
    setType('All');
    setSortBy('nirf');
    router.push('/colleges');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-gradient-to-b from-indigo-950/60 to-slate-950 border-b border-slate-800/80 pt-10 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Discover & Explore Top Indian Colleges
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl">
            Filter through premier engineering, management, and medical institutes with verified NIRF rankings, actual tuition fees, and real placement records.
          </p>

          {/* Top Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by college name, city, location, or course..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl pl-12 pr-10 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xl"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              stream={stream}
              setStream={setStream}
              state={state}
              setState={setState}
              type={type}
              setType={setType}
              sortBy={sortBy}
              setSortBy={setSortBy}
              resetFilters={resetFilters}
            />
          </div>

          {/* Main Colleges Column */}
          <div className="lg:col-span-3 space-y-6">
            {/* Action Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-white">
                  Showing <span className="text-indigo-400">{colleges.length}</span> Colleges
                </span>
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-4 py-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 text-xs font-semibold flex items-center space-x-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters & Sort</span>
              </button>
            </div>

            {/* Active Tag Pills */}
            {(stream !== 'All' || state !== 'All' || type !== 'All' || search) && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Active Filters:</span>
                {search && (
                  <span className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center space-x-1">
                    <span>Search: "{search}"</span>
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSearch('')} />
                  </span>
                )}
                {stream !== 'All' && (
                  <span className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center space-x-1">
                    <span>Stream: {stream}</span>
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setStream('All')} />
                  </span>
                )}
                {state !== 'All' && (
                  <span className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center space-x-1">
                    <span>State: {state}</span>
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setState('All')} />
                  </span>
                )}
                {type !== 'All' && (
                  <span className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center space-x-1">
                    <span>Type: {type}</span>
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setType('All')} />
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-xs text-indigo-400 underline hover:text-indigo-300 ml-2"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* College Cards Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 4].map((i) => (
                  <div key={i} className="h-80 bg-slate-900 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : colleges.length === 0 ? (
              <div className="p-12 text-center bg-slate-900/50 rounded-2xl border border-slate-800 space-y-4">
                <Building className="w-12 h-12 text-slate-500 mx-auto" />
                <h3 className="text-lg font-bold text-white">No Colleges Found</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Try adjusting your search criteria or clearing active filters to view more colleges.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold inline-flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Filters</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {colleges.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-sm bg-slate-900 h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Filter & Sort</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <FilterSidebar
              stream={stream}
              setStream={setStream}
              state={state}
              setState={setState}
              type={type}
              setType={setType}
              sortBy={sortBy}
              setSortBy={setSortBy}
              resetFilters={resetFilters}
            />
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function CollegesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <CollegesContent />
    </Suspense>
  );
}
