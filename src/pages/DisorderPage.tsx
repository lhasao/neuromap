import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Pill, Dna, Info } from 'lucide-react';
import { getDisorderById } from '../data/disorders';
import { BrainPanel } from '../components/panels/BrainPanel';
import { PharmacologyPanel } from '../components/panels/PharmacologyPanel';
import { MolecularBasisPanel } from '../components/panels/MolecularBasisPanel';

type TabId = 'brain' | 'pharmacology' | 'molecular';

const tabs: { id: TabId; label: string; icon: typeof Brain; color: string }[] = [
  { id: 'brain', label: 'Brain Map', icon: Brain, color: 'neuro' },
  { id: 'pharmacology', label: 'Pharmacology', icon: Pill, color: 'pharma' },
  { id: 'molecular', label: 'Molecular Basis', icon: Dna, color: 'gene' },
];

export function DisorderPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const disorder = getDisorderById(id || '');
  const [activeTab, setActiveTab] = useState<TabId>('brain');
  const [highlightedRegion, setHighlightedRegion] = useState<string | null>(null);
  const [highlightedDrug, setHighlightedDrug] = useState<string | null>(null);
  const [highlightedGene, setHighlightedGene] = useState<string | null>(null);

  if (!disorder) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Disorder not found</h2>
        <Link to="/" className="text-neuro-400 hover:text-neuro-300">
          Return to home
        </Link>
      </div>
    );
  }

  const handleCrossLink = (type: 'brain' | 'drug' | 'gene', targetId: string) => {
    if (type === 'brain') {
      setActiveTab('brain');
      setHighlightedRegion(targetId);
    } else if (type === 'drug') {
      setActiveTab('pharmacology');
      setHighlightedDrug(targetId);
    } else {
      setActiveTab('molecular');
      setHighlightedGene(targetId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Back + title */}
      <div className="flex items-start gap-4 mb-6">
        <button
          onClick={() => navigate('/')}
          className="mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{disorder.name}</h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">{disorder.shortDescription}</p>
        </div>
      </div>

      {/* Overview */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 sm:p-5 mb-6">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-neuro-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-slate-300 leading-relaxed">{disorder.overview}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {disorder.neurotransmitterSystems.map(nt => (
                <span
                  key={nt}
                  className="text-xs px-2.5 py-1 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600/50"
                >
                  {nt}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-800/50 p-1 rounded-xl border border-slate-700/50 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const colorMap = {
            neuro: isActive ? 'bg-neuro-600 text-white shadow-lg shadow-neuro-900/50' : 'text-slate-400 hover:text-neuro-300 hover:bg-slate-700/50',
            pharma: isActive ? 'bg-pharma-600 text-white shadow-lg shadow-pharma-900/50' : 'text-slate-400 hover:text-pharma-300 hover:bg-slate-700/50',
            gene: isActive ? 'bg-gene-600 text-white shadow-lg shadow-gene-900/50' : 'text-slate-400 hover:text-gene-300 hover:bg-slate-700/50',
          };
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${colorMap[tab.color as keyof typeof colorMap]}`}
              aria-selected={isActive}
              role="tab"
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Panel content */}
      <div role="tabpanel">
        {activeTab === 'brain' && (
          <BrainPanel
            disorder={disorder}
            highlightedRegion={highlightedRegion}
            onHighlightRegion={setHighlightedRegion}
            onCrossLink={handleCrossLink}
          />
        )}
        {activeTab === 'pharmacology' && (
          <PharmacologyPanel
            disorder={disorder}
            highlightedDrug={highlightedDrug}
            onHighlightDrug={setHighlightedDrug}
            onCrossLink={handleCrossLink}
          />
        )}
        {activeTab === 'molecular' && (
          <MolecularBasisPanel
            disorder={disorder}
            highlightedGene={highlightedGene}
            onHighlightGene={setHighlightedGene}
            onCrossLink={handleCrossLink}
          />
        )}
      </div>
    </div>
  );
}
