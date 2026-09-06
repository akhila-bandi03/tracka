import React from 'react';
import Link from 'next/link';
import { GraduationCap, Heart, ShieldCheck, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white">Mabadi</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            India's most trusted college decision platform. Real placement data, cutoff predictor, and verified student reviews.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Features</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/colleges" className="hover:text-indigo-400 transition">College Search & Filter</Link></li>
            <li><Link href="/compare" className="hover:text-indigo-400 transition">Side-by-Side Comparison</Link></li>
            <li><Link href="/predictor" className="hover:text-indigo-400 transition">Rank & Cutoff Predictor</Link></li>
            <li><Link href="/community" className="hover:text-indigo-400 transition">Q&A Student Forum</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Streams</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/colleges?stream=Engineering" className="hover:text-indigo-400 transition">Engineering Colleges (IITs, NITs, BITS)</Link></li>
            <li><Link href="/colleges?stream=Management" className="hover:text-indigo-400 transition">Management Institutes (IIMs, XLRI)</Link></li>
            <li><Link href="/colleges?stream=Medical" className="hover:text-indigo-400 transition">Medical Colleges (AIIMS, JIPMER)</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Trust & Security</h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center space-x-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>NIRF & NAAC Verified Data</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Real-Time Placement Insights</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs">
        <p>© {new Date().getFullYear()} Mabadi Inc. All rights reserved.</p>
        <p className="flex items-center space-x-1 mt-2 sm:mt-0">
          <span>Built with</span>
          <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
          <span>for Aspiring Students</span>
        </p>
      </div>
    </footer>
  );
};
