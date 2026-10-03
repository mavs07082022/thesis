import { useState, FormEvent } from 'react';
import {
  Sparkles,
  RefreshCw,
  Droplets,
  Thermometer,
  Wind,
  FlaskConical,
  CloudRain,
} from 'lucide-react';
import { PredictionInput } from '@/services/predictionService';
import Button from '../common/Button';

interface Props {
  onSubmit: (input: PredictionInput) => void;
  loading: boolean;
  initialValues?: Partial<PredictionInput>;
}

const defaults: PredictionInput = {
  soilPh: 6.4,
  soilMoisture: 65,
  temperature: 29,
  humidity: 78,
  rainfall: 12,
};

export default function PredictionForm({ onSubmit, loading, initialValues }: Props) {
  const [values, setValues] = useState<PredictionInput>({ ...defaults, ...initialValues });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  const update = (key: keyof PredictionInput, value: number) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const fields = [
    { key: 'soilPh' as const, label: 'Soil pH', icon: FlaskConical, min: 0, max: 14, step: 0.1, unit: '' },
    { key: 'soilMoisture' as const, label: 'Soil Moisture', icon: Droplets, min: 0, max: 100, step: 1, unit: '%' },
    { key: 'temperature' as const, label: 'Air Temperature', icon: Thermometer, min: 0, max: 50, step: 0.5, unit: '°C' },
    { key: 'humidity' as const, label: 'Humidity', icon: Wind, min: 0, max: 100, step: 1, unit: '%' },
    { key: 'rainfall' as const, label: 'Rainfall', icon: CloudRain, min: 0, max: 500, step: 1, unit: 'mm' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.key}>
              <label className="label flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5 text-slate-500" />
                {f.label}
                {f.unit && <span className="text-slate-400 text-xs">({f.unit})</span>}
              </label>
              <input
                type="number"
                value={values[f.key]}
                min={f.min}
                max={f.max}
                step={f.step}
                onChange={(e) => update(f.key, parseFloat(e.target.value) || 0)}
                className="input"
                required
              />
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          disabled={loading}
          icon={
            loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )
          }
        >
          {loading ? 'Analyzing...' : 'Predict Crop Suitability'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setValues({ ...defaults })}
          disabled={loading}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}