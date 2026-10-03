import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { SensorReading } from '@/types';

interface Props {
  readings: SensorReading[];
}

export default function SensorHistoryChart({ readings }: Props) {
  const data = [...readings].reverse().map((r) => ({
    time: new Date(r.timestamp).toLocaleTimeString('en-PH', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    Moisture: r.soilMoisture,
    Temperature: r.airTemperature,
    Humidity: r.humidity,
  }));

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line type="monotone" dataKey="Moisture" stroke="#0ea5e9" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Temperature" stroke="#f97316" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Humidity" stroke="#8b5cf6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}