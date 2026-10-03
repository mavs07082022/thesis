import { useState, useCallback } from 'react';
import { PredictionResult } from '@/types';
import { predictionService, PredictionInput } from '@/services/predictionService';

export function usePredictions() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predict = useCallback(async (input: PredictionInput) => {
    setLoading(true);
    setError(null);
    try {
      const data = await predictionService.predict(input);
      setResult(data);
      return data;
    } catch (e: any) {
      setError(e.message || 'Prediction failed');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { result, loading, error, predict };
}