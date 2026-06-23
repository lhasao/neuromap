import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import type { Disorder } from '../../data/types';
import { BrainViewer3D } from '../BrainViewer3D';
import { CitationInline, CitationBlock } from '../CitationList';
import { CrossLinkButton } from '../CrossLinkButton';

interface BrainPanelProps {
  disorder: Disorder;
  highlightedRegion: string | null;
  onHighlightRegion: (id: string | null) => void;
  onCrossLink: (type: 'brain' | 'drug' | 'gene', targetId: string) => void;
}

export function BrainPanel({ disorder, highlightedRegion, onHighlightRegion, onCrossLink }: BrainPanelProps) {
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlightedRegion && detailRef.current) {
      const el = detailRef.current.querySelector(`[data-region="${highlightedRegion}"]`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [highlightedRegion]);

  const relatedDrugs = (neurotransmitters: string[]) =>
    disorder.drugs.filter(d =>
      d.relatedNeurotransmitters.some(nt => neurotransmitters.includes(nt))
    );

  return (
    <div className="space-y-6">
      <BrainViewer3D
        regions={disorder.brainRegions}
        highlightedRegion={highlightedRegion}
        onRegionClick={id => onHighlightRegion(highlightedRegion === id ? null : id)}
      />

      {/* Region details */}
      <div ref={detailRef} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {disorder.brainRegions.map(region => {
          const isActive = highlightedRegion === region.id;
          const drugs = relatedDrugs(region.relatedNeurotransmitters);

          return (
            <div
              key={region.id}
              data-region={region.id}
              onClick={() => onHighlightRegion(isActive ? null : region.id)}
              className={`rounded-xl p-4 sm:p-5 border cursor-pointer transition-all duration-200 ${
                isActive
                  ? 'bg-slate-800 border-neuro-500/50 shadow-lg shadow-neuro-900/20 ring-1 ring-neuro-500/20'
                  : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-600'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-3 h-3 rounded-full mt-1.5 shrink-0 ring-2 ring-offset-2 ring-offset-slate-900"
                  style={{ backgroundColor: region.color, boxShadow: `0 0 0 2px ${region.color}40` }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white">{region.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{region.description}</p>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">{region.findings}</p>
                  <div className="mt-2">
                    <CitationInline citationIds={region.citations} />
                  </div>

                  {/* Neurotransmitter tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {region.relatedNeurotransmitters.map(nt => (
                      <span key={nt} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-400 border border-slate-600/50">
                        {nt}
                      </span>
                    ))}
                  </div>

                  {/* Cross-links to drugs */}
                  {drugs.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-700/30">
                      {drugs.map(drug => (
                        <CrossLinkButton
                          key={drug.id}
                          type="drug"
                          label={drug.drugClass.split('(')[0].trim()}
                          targetId={drug.id}
                          onClick={onCrossLink}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-4">
        <p className="text-xs text-slate-500 flex items-start gap-2">
          <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          Region positions are schematic representations. Activation patterns shown reflect population-level
          associations from neuroimaging meta-analyses, not individual brain scans.
        </p>
      </div>

      <CitationBlock citations={disorder.citations} />
    </div>
  );
}
