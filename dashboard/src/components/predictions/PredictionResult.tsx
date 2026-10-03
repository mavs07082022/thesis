import { PredictionResult as PredictionResultType } from '@/types';
import { formatDateTime } from '@/utils/formatters';
import Card from '../common/Card';
import CropSuitabilityTable from '../dashboard/CropSuitabilityTable';
import SuitabilityChart from '../dashboard/SuitabilityChart';
import { Clock, Cpu } from 'lucide-react';

interface Props {
  result: PredictionResultType;
}

export default function PredictionResult({ result }: Props) {
  return (
    <div className="space-y-5 animate-slide-up">
      <Card>
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Prediction Results</h3>
            <p className="text-xs text-slate-500 mt-1">
              Based on current environmental conditions
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {formatDateTime(result.timestamp)}
            </span>
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              {result.modelVersion} · {result.processingTimeMs}ms
            </span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Suitability Ranking</h3>
            <CropSuitabilityTable predictions={result.predictions} />
          </Card>
        </div>
        <div>
          <Card>
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Score Comparison</h3>
            <SuitabilityChart predictions={result.predictions} />
          </Card>
        </div>
      </div>
    </div>
  );
}