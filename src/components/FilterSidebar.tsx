'use client';

import React from 'react';
import { SlidersHorizontal, RotateCcw, Search, Sparkles } from 'lucide-react';

interface FilterSidebarProps {
  stream: string;
  setStream: (val: string) => void;
  state: string;
  setState: (val: string) => void;
  type: string;
  setType: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  resetFilters: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  stream,
  setStream,
  state,
  setState,
  type,
  setType,
  sortBy,
  setSortBy,
  resetFilters,
}) => {
  const streams = ['All', 'Engineering', 'Management', 'Medical'];
  const states = ['All', 'Maharashtra', 'Delhi', 'Tamil Nadu', 'Gujarat', 'Rajasthan'];
  const types = ['All', 'Public', 'Private'];

  const sortOptions = [
    { label: 'NIRF Rank (Low to High)', value: 'nirf' },
    { label: 'Highest Rating', value: 'rating' },
    { label: 'Avg Placement Package', value: 'avgPackage' },
    { label: 'Highest Placement Package', value: 'highestPackage' },
    { label: 'Tuition Fees (Low to High)', value: 'feesLowToHigh' },
  ];

  return (
    <aside className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-5 space-y-6">
      {/* Title Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-5 h-5 text-indigo-400" />
          <h2 className="text-base font-bold text-white">Filters & Sorting</h2>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-slate-400 hover:text-indigo-400 flex items-center space-x-1 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Academic Stream */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Academic Stream
        </label>
        <div className="flex flex-wrap gap-2">
          {streams.map((s) => (
            <button
              key={s}
              onClick={() => setStream(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                stream === s
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* State / Region */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          State / Location
        </label>
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
        >
          {states.map((st) => (
            <option key={st} value={st}>
              {st === 'All' ? 'All States in India' : st}
            </option>
          ))}
        </select>
      </div>

      {/* Institute Type */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Institute Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`py-1.5 text-center rounded-xl text-xs font-medium transition ${
                type === t
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/40'
                  : 'bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Helper Banner */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/20 text-xs text-slate-300 space-y-1">
        <div className="flex items-center space-x-1.5 text-indigo-400 font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>Cutoff Predictor</span>
        </div>
        <p className="text-[11px] text-slate-400">
          Unsure where your JEE / CAT rank fits? Use our interactive Predictor Tool.
        </p>
      </div>
    </aside>
  );
};
