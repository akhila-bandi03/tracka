'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CollegeData } from '@/lib/mock-data';
import { useCollegeContext } from '@/context/CollegeContext';
import {
  MapPin,
  Star,
  TrendingUp,
  Award,
  Bookmark,
  GitCompare,
  Check,
  Building,
  IndianRupee,
} from 'lucide-react';

interface CollegeCardProps {
  college: CollegeData;
}

export const CollegeCard: React.FC<CollegeCardProps> = ({ college }) => {
  const { isSaved, toggleSave, isInCompare, addToCompare, removeFromCompare } = useCollegeContext();

  const saved = isSaved(college.id);
  const inCompare = isInCompare(college.id);

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} Lakhs`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <div className="group relative bg-slate-900/90 border border-slate-800/90 hover:border-indigo-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col">
      {/* Top Banner & Badges */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-800">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-600/90 backdrop-blur-md text-white border border-indigo-400/30 flex items-center space-x-1 shadow-md">
            <Award className="w-3.5 h-3.5" />
            <span>NIRF #{college.nirfRank}</span>
          </span>
          <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-900/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
            NAAC {college.naacGrade}
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={() => toggleSave(college.id)}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all duration-200 z-10 ${
            saved
              ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/30'
              : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title={saved ? 'Remove Bookmark' : 'Save College'}
        >
          <Bookmark className={`w-4 h-4 ${saved ? 'fill-white' : ''}`} />
        </button>

        {/* College Name Header Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {college.stream}
            </span>
            <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1 mt-1">
              {college.shortName}
            </h3>
          </div>
          <div className="flex items-center space-x-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-lg text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{college.rating}</span>
            <span className="text-[10px] text-amber-400/70 font-normal">({college.totalReviews})</span>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <p className="text-xs text-slate-400 flex items-center space-x-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="truncate">{college.location}</span>
          </p>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
            {college.description}
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <div className="space-y-0.5">
              <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span>Avg Package</span>
              </span>
              <p className="text-sm font-bold text-emerald-400">
                ₹{college.avgPackage} LPA
              </p>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                <IndianRupee className="w-3 h-3 text-indigo-400" />
                <span>Tuition Fees</span>
              </span>
              <p className="text-xs font-semibold text-slate-200 truncate">
                {formatCurrency(college.tuitionFeesMin)}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center space-x-2 border-t border-slate-800/60">
          <Link
            href={`/colleges/${college.slug}`}
            className="flex-1 py-2 px-3 text-center text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/20"
          >
            View Details
          </Link>

          <button
            onClick={() => (inCompare ? removeFromCompare(college.id) : addToCompare(college.id))}
            className={`py-2 px-3 text-xs font-medium rounded-xl border transition-all flex items-center space-x-1 ${
              inCompare
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            {inCompare ? <Check className="w-3.5 h-3.5" /> : <GitCompare className="w-3.5 h-3.5" />}
            <span>{inCompare ? 'Added' : 'Compare'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
