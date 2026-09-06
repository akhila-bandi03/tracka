'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CollegeCard } from '@/components/CollegeCard';
import { CollegeData } from '@/lib/mock-data';
import {
  Search,
  Sparkles,
  Award,
  GitCompare,
  TrendingUp,
  GraduationCap,
  Building2,
  Stethoscope,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredColleges, setFeaturedColleges] = useState<CollegeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch('/api/colleges?sortBy=nirf');
        const data = await res.json();
        if (data.success) {
          setFeaturedColleges(data.data.slice(0, 6));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/colleges?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/colleges');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950">
        {/* Background Decorative Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-300">
              India's Premier College Intelligence & Discovery Engine
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Find Your Dream College with{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Precision & Confidence
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
            Compare NIRF rankings, verified student reviews, exact course fees, cutoff ranks, and 100% authenticated average placement CTC packages.
          </p>

          {/* Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-3xl mx-auto flex items-center bg-slate-900/90 border border-slate-700/80 rounded-2xl p-2 shadow-2xl shadow-indigo-500/10 focus-within:border-indigo-500 transition-all duration-300"
          >
            <div className="pl-4 pr-2 text-slate-400">
              <Search className="w-6 h-6 text-indigo-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by College Name, City (e.g. Powai), Course, or Exam (JEE, CAT)..."
              className="w-full bg-transparent px-2 py-3 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all transform active:scale-95 shrink-0"
            >
              Search Colleges
            </button>
          </form>

          {/* Quick Exam Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Popular Searches:</span>
            {['IIT Bombay', 'IIT Delhi', 'IIM Ahmedabad', 'AIIMS Delhi', 'BITS Pilani', 'VIT Vellore'].map((term) => (
              <button
                key={term}
                onClick={() => router.push(`/colleges?search=${encodeURIComponent(term)}`)}
                className="px-3 py-1 rounded-lg bg-slate-900/80 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-slate-800 hover:border-indigo-500/30 transition"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-slate-800 bg-slate-900/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-indigo-400">500+</p>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Top Indian Institutes</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-emerald-400">100%</p>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Verified Placement Data</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-purple-400">₹3.67 Cr</p>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Highest Domestic Package</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-pink-400">50,000+</p>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Predictor Queries Run</p>
          </div>
        </div>
      </section>

      {/* Top Academic Streams */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Explore by Stream</h2>
            <p className="text-slate-400 text-sm mt-1">Discover top accredited colleges tailored to your career ambitions.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            href="/colleges?stream=Engineering"
            className="group relative p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition">Engineering & Tech</h3>
              <p className="text-xs text-slate-400 mt-1">IITs, NITs, BITS & IIITs for B.Tech, M.Tech, and dual degrees.</p>
            </div>
            <div className="flex items-center text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition">
              <span>Browse 250+ Engineering Colleges</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          <Link
            href="/colleges?stream=Management"
            className="group relative p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition">Management (MBA)</h3>
              <p className="text-xs text-slate-400 mt-1">IIM Ahmedabad, Bangalore, Calcutta, XLRI, and top B-Schools.</p>
            </div>
            <div className="flex items-center text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition">
              <span>Browse 150+ Management Colleges</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          <Link
            href="/colleges?stream=Medical"
            className="group relative p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-pink-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10 space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-110 transition">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-pink-300 transition">Medical & Healthcare</h3>
              <p className="text-xs text-slate-400 mt-1">AIIMS, JIPMER, KGMU, and premier medical colleges for MBBS & MD.</p>
            </div>
            <div className="flex items-center text-xs font-semibold text-pink-400 group-hover:translate-x-1 transition">
              <span>Browse Medical Colleges</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Colleges Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>NIRF Ranked 2024</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Top Premier Institutes</h2>
          </div>
          <Link
            href="/colleges"
            className="inline-flex items-center text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition"
          >
            <span>View All Colleges</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-slate-900 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        )}
      </section>

      {/* College Predictor Hero Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 p-8 sm:p-12 border border-indigo-500/30 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Smart Cutoff Predictor Engine</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Know Your Admission Chances Before Counseling Begins
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Input your entrance exam (JEE Main, JEE Advanced, CAT, NEET) and rank. Our predictive engine maps historical cutoffs to estimate your exact admission probability.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/predictor"
                className="px-6 py-3.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-sm shadow-xl transition transform active:scale-95 flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Try College Predictor Now</span>
              </Link>
              <Link
                href="/compare"
                className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 font-semibold text-sm transition flex items-center space-x-2"
              >
                <GitCompare className="w-4 h-4 text-indigo-400" />
                <span>Compare Colleges</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
