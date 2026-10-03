import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { CropPrediction } from '@/types';

interface Props {
  predictions: CropPrediction[];
}

export default function SuitabilityChart({ predictions }: Props) {
  const data = predictions.map((p) => ({
    name: p.cropName,
    score: p.score,
    suitability: p.suitability,
  }));

  const getColor = (score: number) => {
    if (score >= 75) return '#16a34a';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              fontSize: 12,
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            formatter={(value: number) => [`${value.toFixed(1)}%`, 'Score']}
          />
          <Bar dataKey="score" radius={[6, 6, 0, 0]} maxBarSize={60}>
            {data.map((entry, idx) => (
              <Cell key={idx} fill={getColor(entry.score)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}