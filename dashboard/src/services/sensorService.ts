import { apiClient } from './api';
import { SensorReading } from '@/types';
import { USE_MOCK_DATA } from '@/utils/constants';
import { mockSensorReadings } from '@/utils/mockData';

export const sensorService = {
  async getLatestReadings(): Promise<SensorReading[]> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 400));
      return mockSensorReadings;
    }
    const { data } = await apiClient.get<SensorReading[]>('/sensors/latest');
    return data;
  },

  async getHistory(params: {
    from: string;
    to: string;
    location?: string;
  }): Promise<SensorReading[]> {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 500));
      return Array.from({ length: 24 }, (_, i) => ({
        ...mockSensorReadings[0],
        id: `hist-${i}`,
        timestamp: new Date(Date.now() - i * 3600000).toISOString(),
        soilMoisture: 55 + Math.random() * 20,
        airTemperature: 26 + Math.random() * 6,
        humidity: 70 + Math.random() * 20,
      }));
    }
    const { data } = await apiClient.get<SensorReading[]>('/sensors/history', { params });
    return data;
  },
};