import { Droplets, Thermometer, Wind, FlaskConical, Zap, MapPin } from 'lucide-react';
import { SensorReading } from '@/types';
import { formatNumber, formatTimeAgo } from '@/utils/formatters';

interface Props {
  readings: SensorReading[];
}

const metrics = [
  { key: 'soilMoisture', label: 'Soil Moisture', unit: '%', icon: Droplets, color: 'text-blue-600 bg-blue-50' },
  { key: 'soilTemperature', label: 'Soil Temp', unit: '°C', icon: Thermometer, color: 'text-orange-600 bg-orange-50' },
  { key: 'soilPh', label: 'Soil pH', unit: '', icon: FlaskConical, color: 'text-purple-600 bg-purple-50' },
  { key: 'electricalConductivity', label: 'EC', unit: 'dS/m', icon: Zap, color: 'text-yellow-600 bg-yellow-50' },
  { key: 'airTemperature', label: 'Air Temp', unit: '°C', icon: Thermometer, color: 'text-red-600 bg-red-50' },
  { key: 'humidity', label: 'Humidity', unit: '%', icon: Wind, color: 'text-cyan-600 bg-cyan-50' },
] as const;

export default function SensorReadings({ readings }: Props) {
  if (!readings.length) {
    return (
      <div className="text-center py-8 text-sm text-slate-500">No sensor data available</div>
    );
  }

  const latest = readings[0];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <MapPin className="w-3.5 h-3.5" />
          <span>{latest.location}</span>
          <span className="text-slate-300">•</span>
          <span>{formatTimeAgo(latest.timestamp)}</span>
        </div>
        <span className="badge bg-green-100 text-green-700 border border-green-200">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          Live
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {metrics.map((m) => {
          const Icon = m.icon;
          const value = latest[m.key as keyof SensorReading] as number;
          return (
            <div
              key={m.key}
              className="rounded-lg border border-slate-200 p-3 hover:border-primary-300 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${m.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-medium text-slate-600">{m.label}</span>
              </div>
              <p className="text-lg font-bold text-slate-800">
                {formatNumber(value)}
                {m.unit && (
                  <span className="text-xs font-normal text-slate-500 ml-0.5">{m.unit}</span>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}