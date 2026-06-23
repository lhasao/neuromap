import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neuro-500 to-pharma-500 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white leading-tight">NeuroMap</h1>
              <p className="text-xs text-slate-400 leading-tight">Brain, Drug & Gene Visualizer</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-xs text-slate-500 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              Educational Use Only
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
