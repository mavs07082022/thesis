import { SensorReading, PredictionResult, DashboardStats } from '@/types';
import { TARGET_CROPS } from './constants';

export const mockSensorReadings: SensorReading[] = [
  {
    id: 's1',
    timestamp: new Date().toISOString(),
    soilMoisture: 65.2,
    soilTemperature: 27.8,
    soilPh: 6.4,
    electricalConductivity: 1.2,
    airTemperature: 29.5,
    humidity: 78,
    rainfall: 12.5,
    location: 'Center Plot',
  },
  {
    id: 's2',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    soilMoisture: 62.1,
    soilTemperature: 27.2,
    soilPh: 6.3,
    electricalConductivity: 1.1,
    airTemperature: 29.1,
    humidity: 80,
    rainfall: 10.0,
    location: 'North Plot',
  },
  {
    id: 's3',
    timestamp: new Date(Date.now() - 600000).toISOString(),
    soilMoisture: 68.5,
    soilTemperature: 28.1,
    soilPh: 6.5,
    electricalConductivity: 1.3,
    airTemperature: 30.2,
    humidity: 75,
    rainfall: 14.2,
    location: 'South Plot',
  },
];

const generateFactorScore = (value: number, ideal: [number, number]) => {
  const [min, max] = ideal;
  const mid = (min + max) / 2;
  const range = max - min;
  const distance = Math.abs(value - mid);
  const score = Math.max(0, 100 - (distance / (range / 2)) * 100);
  const status: 'optimal' | 'acceptable' | 'poor' =
    score >= 75 ? 'optimal' : score >= 50 ? 'acceptable' : 'poor';
  return { value, ideal: mid, score, status };
};

export const mockPredictions: PredictionResult = {
  id: 'pred-001',
  timestamp: new Date().toISOString(),
  farmId: 'farm-macabud-001',
  farmName: 'Macabud Multi-Crop Farm',
  inputConditions: {
    soilPh: 6.4,
    soilMoisture: 65.2,
    temperature: 29.5,
    humidity: 78,
    rainfall: 12.5,
  },
  predictions: TARGET_CROPS.map((crop, idx) => {
    const score = [92, 85, 78, 68, 55, 42][idx] || 50;
    const suitability =
      score >= 75 ? 'Suitable' : score >= 50 ? 'Moderately Suitable' : 'Not Suitable';
    return {
      cropId: crop.id,
      cropName: crop.name,
      suitability: suitability as any,
      score,
      rank: idx + 1,
      factors: {
        soilPh: generateFactorScore(6.4, crop.idealConditions.soilPh),
        soilMoisture: generateFactorScore(65.2, crop.idealConditions.soilMoisture),
        temperature: generateFactorScore(29.5, crop.idealConditions.temperature),
        humidity: generateFactorScore(78, [60, 90]),
      },
    };
  }).sort((a, b) => b.score - a.score),
  modelVersion: 'v1.0.0',
  processingTimeMs: 1240,
};

export const mockStats: DashboardStats = {
  totalPredictions: 47,
  activeSensors: 5,
  suitableCrops: 4,
  avgResponseTime: 1.8,
  systemUptime: 98.5,
  lastUpdate: new Date().toISOString(),
};

export const mockHistory: PredictionResult[] = Array.from({ length: 10 }, (_, i) => ({
  ...mockPredictions,
  id: `pred-${String(i + 1).padStart(3, '0')}`,
  timestamp: new Date(Date.now() - i * 86400000).toISOString(),
}));