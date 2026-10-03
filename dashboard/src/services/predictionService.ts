import { apiClient } from './api';
import { PredictionResult } from '@/types';
import { USE_MOCK_DATA } from '@/utils/constants';
import { mockPredictions, mockHistory } from '@/utils/mockData';

export interface PredictionInput {
  soilPh: number;
  soilMoisture: number;
  temperature: number;
  humidity: number;
  rainfall: number;
  farmId?: string;
}

export const predictionService = {
  async predict(input: PredictionInput): Promise<PredictionResult> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 1500));
      return {
        ...mockPredictions,
        id: `pred-${Date.now()}`,
        timestamp: new Date().toISOString(),
        inputConditions: {
          soilPh: input.soilPh,
          soilMoisture: input.soilMoisture,
          temperature: input.temperature,
          humidity: input.humidity,
          rainfall: input.rainfall,
        },
      };
    }
    const { data } = await apiClient.post<PredictionResult>('/predict', input);
    return data;
  },

  async getHistory(): Promise<PredictionResult[]> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 400));
      return mockHistory;
    }
    const { data } = await apiClient.get<PredictionResult[]>('/predictions');
    return data;
  },

  async getById(id: string): Promise<PredictionResult> {
    const { data } = await apiClient.get<PredictionResult>(`/predictions/${id}`);
    return data;
  },
};