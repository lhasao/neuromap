import { Link } from 'react-router-dom';
import { Brain, Pill, Dna } from 'lucide-react';
import type { Disorder } from '../data/types';

const disorderIcons: Record<string, string> = {
  depression: 'from-blue-500 to-indigo-600',
  anxiety: 'from-amber-500 to-orange-600',
  schizophrenia: 'from-purple-500 to-pink-600',
};

export function DisorderCard({ disorder }: { disorder: Disorder }) {
  const gradient = disorderIcons[disorder.id] || 'from-neuro-500 to-pharma-500';

  return (
    <Link
      to={`/disorder/${disorder.id}`}
      className="group block bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-200 hover:shadow-lg hover:shadow-slate-900/50"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Brain className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{disorder.name}</h3>
      <p className="text-sm text-slate-400 mb-4 line-clamp-2">{disorder.shortDescription}</p>
      <div className="flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <Brain className="w-3.5 h-3.5" />
          {disorder.brainRegions.length} regions
        </span>
        <span className="flex items-center gap-1">
          <Pill className="w-3.5 h-3.5" />
          {disorder.drugs.length} drug classes
        </span>
        <span className="flex items-center gap-1">
          <Dna className="w-3.5 h-3.5" />
          {disorder.geneAssociations.length} genes
        </span>
      </div>
    </Link>
  );
}
