import { useState } from 'react';
import { Search, Brain, Pill, Dna } from 'lucide-react';
import { searchDisorders } from '../data/disorders';
import { DisorderCard } from '../components/DisorderCard';

export function HomePage() {
  const [query, setQuery] = useState('');
  const filtered = searchDisorders(query);

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neuro-900/20 via-slate-900 to-slate-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neuro-500 to-pharma-500 flex items-center justify-center shadow-lg shadow-neuro-500/25">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
              Explore Mental Health
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neuro-400 to-pharma-400">
                at Three Connected Levels
              </span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Trace the path from brain regions to the drugs that modulate them to the genes that shape them.
              An educational tool built on open research, with every claim cited.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                <Brain className="w-5 h-5 text-neuro-400 shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Brain Maps</p>
                  <p className="text-xs text-slate-500">3D activation patterns</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                <Pill className="w-5 h-5 text-pharma-400 shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Pharmacology</p>
                  <p className="text-xs text-slate-500">Drugs & molecular targets</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                <Dna className="w-5 h-5 text-gene-400 shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Molecular Basis</p>
                  <p className="text-xs text-slate-500">Genes & risk architecture</p>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search disorders..."
                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-neuro-500 focus:border-transparent"
                aria-label="Search disorders"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Disorder grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {query ? `Results for "${query}"` : 'Select a Disorder'}
          </h2>
          <span className="text-sm text-slate-500">{filtered.length} available</span>
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p>No disorders found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(d => (
              <DisorderCard key={d.id} disorder={d} />
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12 p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
          <p className="text-xs text-slate-500 text-center">
            <strong className="text-slate-400">Disclaimer:</strong> This tool is for educational purposes only.
            It presents associations reported in published research, not diagnoses or causes.
            Brain patterns, drug mechanisms, and genetic associations describe population-level findings, not individual predictions.
            This is not medical advice.
          </p>
        </div>
      </section>
    </div>
  );
}
