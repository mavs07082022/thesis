import { Sparkles } from 'lucide-react';
import Card from '@/components/common/Card';
import PredictionForm from '@/components/predictions/PredictionForm';
import PredictionResult from '@/components/predictions/PredictionResult';
import { usePredictions } from '@/hooks/usePredictions';
import { useSensors } from '@/hooks/useSensors';
import Loader from '@/components/common/Loader';

export default function Predictions() {
  const { result, loading, error, predict } = usePredictions();
  const { readings } = useSensors();

  const latest = readings[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Crop Suitability Predictions</h1>
        <p className="text-sm text-slate-500 mt-1">
          Enter farm conditions or use the latest sensor readings to predict crop suitability.
        </p>
      </div>

      <Card>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Environmental Inputs</h3>
            <p className="text-xs text-slate-500">
              {latest
                ? `Auto-filled from latest sensor reading (${latest.location})`
                : 'Enter the current conditions of the farm'}
            </p>
          </div>
        </div>

        <PredictionForm
          onSubmit={predict}
          loading={loading}
          initialValues={
            latest
              ? {
                  soilPh: latest.soilPh,
                  soilMoisture: latest.soilMoisture,
                  temperature: latest.airTemperature,
                  humidity: latest.humidity,
                  rainfall: latest.rainfall || 0,
                }
              : undefined
          }
        />

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}
      </Card>

      {loading && (
        <Card>
          <Loader label="Running AI model and analyzing crop suitability..." />
        </Card>
      )}

      {result && !loading && <PredictionResult result={result} />}
    </div>
  );
}