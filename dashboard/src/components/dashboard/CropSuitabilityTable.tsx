import { CropPrediction } from '@/types';
import { SUITABILITY_COLORS } from '@/utils/constants';
import clsx from 'clsx';
import { CheckCircle2, AlertTriangle, XCircle, TrendingUp } from 'lucide-react';

interface Props {
  predictions: CropPrediction[];
}

const statusIcon = {
  Suitable: CheckCircle2,
  'Moderately Suitable': AlertTriangle,
  'Not Suitable': XCircle,
};

export default function CropSuitabilityTable({ predictions }: Props) {
  return (
    <div className="overflow-x-auto -mx-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left">
            <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wide text-slate-500">
              Rank
            </th>
            <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wide text-slate-500">
              Crop
            </th>
            <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wide text-slate-500">
              Suitability
            </th>
            <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wide text-slate-500">
              Confidence
            </th>
            <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wide text-slate-500 hidden md:table-cell">
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((p) => {
            const Icon = statusIcon[p.suitability];
            return (
              <tr
                key={p.cropId}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                    {p.rank}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-800">{p.cropName}</p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={clsx('badge', SUITABILITY_COLORS[p.suitability], 'gap-1.5')}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {p.suitability}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-[120px]">
                      <div
                        className={clsx(
                          'h-full rounded-full transition-all',
                          p.score >= 75
                            ? 'bg-green-500'
                            : p.score >= 50
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        )}
                        style={{ width: `${p.score}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 min-w-[36px]">
                      {p.score.toFixed(0)}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {p.score.toFixed(0)}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}