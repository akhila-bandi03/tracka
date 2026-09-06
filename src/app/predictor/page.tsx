'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CollegeData } from '@/lib/mock-data';
import {
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Filter,
  GraduationCap,
} from 'lucide-react';

interface PredictionResult {
  college: CollegeData;
  matchedCourse: string;
  closingRank: number;
  matchProbability: 'High' | 'Moderate' | 'Low';
  recommendationScore: number;
}

export default function PredictorPage() {
  const [exam, setExam] = useState('JEE Advanced');
  const [rank, setRank] = useState<number | ''>(120);
  const [category, setCategory] = useState('General');
  const [stream, setStream] = useState('Engineering');

  const [results, setResults] = useState<PredictionResult[] | null>(null);
  const [loading, setLoading] = useState(false);

  const exams = ['JEE Advanced', 'JEE Main', 'CAT', 'NEET UG', 'BITSAT', 'GATE'];
  const categories = ['General', 'OBC-NCL', 'SC', 'ST', 'EWS'];
  const streams = ['Engineering', 'Management', 'Medical'];

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rank || Number(rank) <= 0) {
      alert('Please enter a valid positive rank/score.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/predictor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam,
          rank: Number(rank),
          category,
          stream,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setResults(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-gradient-to-b from-indigo-950/60 to-slate-950 border-b border-slate-800/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Cutoff & Rank Predictor Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Find Colleges You Can Get Into
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Input your entrance rank or percentile to predict your admission probabilities across top Indian universities.
          </p>
        </div>
      </div>

      {/* Main Predictor Form & Results */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-10">
        {/* Form Card */}
        <div className="max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <form onSubmit={handlePredict} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Select Exam */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Entrance Exam
                </label>
                <select
                  value={exam}
                  onChange={(e) => setExam(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  {exams.map((ex) => (
                    <option key={ex} value={ex}>
                      {ex}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rank / Percentile Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Your Overall Rank / Percentile
                </label>
                <input
                  type="number"
                  value={rank}
                  onChange={(e) => setRank(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="e.g. 150 (Rank) or 99.5 (%)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Reservation Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stream */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Preferred Stream
                </label>
                <select
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  {streams.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-base shadow-xl shadow-indigo-600/30 transition transform active:scale-98 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-5 h-5 text-indigo-300" />
              <span>{loading ? 'Predicting Matched Colleges...' : 'Predict Recommended Colleges'}</span>
            </button>
          </form>
        </div>

        {/* Results Section */}
        {results && (
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-white">
                Predicted Matches for <span className="text-indigo-400">{exam}</span> (Rank #{rank})
              </h2>
              <span className="text-xs text-slate-400 font-semibold">
                Found {results.length} Recommended Colleges
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {results.map((res) => {
                const isHigh = res.matchProbability === 'High';
                const isModerate = res.matchProbability === 'Moderate';

                return (
                  <div
                    key={res.college.id}
                    className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 transition flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={res.college.logo}
                        alt={res.college.shortName}
                        className="w-14 h-14 rounded-xl object-cover border border-slate-700 shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-500/20 text-indigo-300">
                            NIRF #{res.college.nirfRank}
                          </span>
                          <span className="text-xs text-slate-400">{res.college.location}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white">{res.college.name}</h3>
                        <p className="text-xs text-slate-300">
                          Matched Branch: <strong className="text-indigo-300">{res.matchedCourse}</strong> (Closing Cutoff Rank: #{res.closingRank})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-slate-800">
                      <div className="space-y-1 text-left md:text-right">
                        <span className="text-[11px] text-slate-400 block">Avg Package</span>
                        <p className="text-base font-extrabold text-emerald-400">₹{res.college.avgPackage} LPA</p>
                      </div>

                      {/* Probability Badge */}
                      <div
                        className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center space-x-1.5 ${
                          isHigh
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : isModerate
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-pink-500/20 text-pink-300 border-pink-500/40'
                        }`}
                      >
                        {isHigh ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4" />
                        )}
                        <span>{res.matchProbability} Chance</span>
                      </div>

                      <Link
                        href={`/colleges/${res.college.slug}`}
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
