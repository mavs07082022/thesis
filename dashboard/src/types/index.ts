export type SuitabilityLevel = 'Suitable' | 'Moderately Suitable' | 'Not Suitable';

export interface SensorReading {
  id: string;
  timestamp: string;
  soilMoisture: number;
  soilTemperature: number;
  soilPh: number;
  electricalConductivity: number;
  airTemperature: number;
  humidity: number;
  rainfall?: number;
  location: string;
}

export interface Crop {
  id: string;
  name: string;
  scientificName: string;
  category: 'Cereal' | 'Vegetable' | 'Root Crop' | 'Legume';
  icon: string;
  idealConditions: {
    soilPh: [number, number];
    soilMoisture: [number, number];
    temperature: [number, number];
    rainfall: [number, number];
  };
  description: string;
}

export interface FactorScore {
  value: number;
  ideal: number;
  score: number;
  status: 'optimal' | 'acceptable' | 'poor';
}

export interface CropPrediction {
  cropId: string;
  cropName: string;
  suitability: SuitabilityLevel;
  score: number;
  factors: {
    soilPh: FactorScore;
    soilMoisture: FactorScore;
    temperature: FactorScore;
    humidity: FactorScore;
  };
  rank: number;
}

export interface PredictionResult {
  id: string;
  timestamp: string;
  farmId: string;
  farmName: string;
  inputConditions: {
    soilPh: number;
    soilMoisture: number;
    temperature: number;
    humidity: number;
    rainfall: number;
  };
  predictions: CropPrediction[];
  modelVersion: string;
  processingTimeMs: number;
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  area: number;
  crops: string[];
  owner: string;
}

export interface DashboardStats {
  totalPredictions: number;
  activeSensors: number;
  suitableCrops: number;
  avgResponseTime: number;
  systemUptime: number;
  lastUpdate: string;
}