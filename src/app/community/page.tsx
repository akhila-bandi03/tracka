'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { INITIAL_QUESTIONS } from '@/lib/mock-data';
import {
  MessageSquare,
  ThumbsUp,
  Plus,
  X,
  UserCheck,
  Sparkles,
  Send,
  HelpCircle,
} from 'lucide-react';

export default function CommunityPage() {
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [askModalOpen, setAskModalOpen] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('Admissions');
  const [authorName, setAuthorName] = useState('');

  const [activeAnswerBox, setActiveAnswerBox] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState('');

  const categories = ['All', 'Admissions', 'Cutoffs', 'Placement', 'Campus Life'];

  const filteredQuestions = questions.filter(
    (q) => activeCategory === 'All' || q.category.toLowerCase() === activeCategory.toLowerCase()
  );

  const handleUpvoteQuestion = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q))
    );
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || !authorName.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    const created = {
      id: `q-${Date.now()}`,
      collegeId: 'iit-bombay',
      authorName,
      title: newTitle,
      content: newContent,
      category: newCategory,
      upvotes: 1,
      answers: [],
      createdAt: 'Just now',
    };

    setQuestions([created, ...questions]);
    setNewTitle('');
    setNewContent('');
    setAuthorName('');
    setAskModalOpen(false);
  };

  const handleAddAnswer = (questionId: string) => {
    if (!answerText.trim()) return;

    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: [
              ...q.answers,
              {
                id: `a-${Date.now()}`,
                authorName: 'Verified Student',
                authorRole: 'Community Member',
                content: answerText,
                upvotes: 0,
                createdAt: 'Just now',
              },
            ],
          };
        }
        return q;
      })
    );

    setAnswerText('');
    setActiveAnswerBox(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-gradient-to-b from-indigo-950/60 to-slate-950 border-b border-slate-800/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-2">
              <MessageSquare className="w-4 h-4" />
              <span>Student & Alumni Community</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">Q&A Discussion Forum</h1>
            <p className="text-slate-400 text-sm mt-1">
              Ask doubts about cutoffs, campus life, hostels, and real placement realities.
            </p>
          </div>

          <button
            onClick={() => setAskModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center space-x-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Ask a Question</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-8">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Questions Feed */}
        <div className="space-y-6 max-w-4xl">
          {filteredQuestions.map((q) => (
            <div
              key={q.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded bg-indigo-500/20 text-indigo-300">
                      {q.category}
                    </span>
                    <span className="text-xs text-slate-400">Asked by {q.authorName}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{q.title}</h3>
                </div>

                <button
                  onClick={() => handleUpvoteQuestion(q.id)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-indigo-400 hover:border-indigo-500/40 flex items-center space-x-1.5 text-xs font-bold shrink-0 transition"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{q.upvotes}</span>
                </button>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">{q.content}</p>

              {/* Answers List */}
              {q.answers.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Answers ({q.answers.length})
                  </h4>
                  {q.answers.map((a) => (
                    <div key={a.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2">
                          <UserCheck className="w-4 h-4 text-emerald-400" />
                          <span className="font-bold text-white">{a.authorName}</span>
                          <span className="text-slate-500">• {a.authorRole}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{a.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Answer Trigger */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setActiveAnswerBox(activeAnswerBox === q.id ? null : q.id)}
                  className="text-xs text-indigo-400 font-semibold hover:underline flex items-center space-x-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{activeAnswerBox === q.id ? 'Cancel Answer' : 'Post an Answer'}</span>
                </button>
              </div>

              {/* Answer Input Box */}
              {activeAnswerBox === q.id && (
                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="text"
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="Write a helpful answer..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={() => handleAddAnswer(q.id)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs flex items-center space-x-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Ask Question Modal */}
      {askModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Ask Community a Question</h3>
              <button onClick={() => setAskModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400">Your Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Arjun Sharma"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 mt-1"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 mt-1"
                >
                  {['Admissions', 'Cutoffs', 'Placement', 'Campus Life'].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400">Question Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="What is your main question?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 mt-1"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400">Details</label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Provide background context (exam rank, course preferences)..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 mt-1 h-24"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm"
              >
                Post Question
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
