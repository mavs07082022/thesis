import { useState, useEffect, useCallback } from 'react';
import { SensorReading } from '@/types';
import { sensorService } from '@/services/sensorService';

export function useSensors(pollIntervalMs = 30000) {
  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReadings = useCallback(async () => {
    try {
      setError(null);
      const data = await sensorService.getLatestReadings();
      setReadings(data);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch sensor data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReadings();
    const id = setInterval(fetchReadings, pollIntervalMs);
    return () => clearInterval(id);
  }, [fetchReadings, pollIntervalMs]);

  return { readings, loading, error, refresh: fetchReadings };
}