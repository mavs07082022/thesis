import { useState, useEffect } from 'react';
import { Sparkles, Radio, Sprout, Clock, Activity } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import SensorReadings from '@/components/dashboard/SensorReadings';
import CropSuitabilityTable from '@/components/dashboard/CropSuitabilityTable';
import SuitabilityChart from '@/components/dashboard/SuitabilityChart';
import SensorHistoryChart from '@/components/dashboard/SensorHistoryChart';
import FarmInfoPanel from '@/components/dashboard/FarmInfoPanel';
import Card from '@/components/common/Card';
import Loader from '@/components/common/Loader';
import Button from '@/components/common/Button';
import { useSensors } from '@/hooks/useSensors';
import { sensorService } from '@/services/sensorService';
import { mockPredictions } from '@/utils/mockData';
import { SensorReading } from '@/types';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { readings, loading: sensorsLoading } = useSensors();
  const [history, setHistory] = useState<SensorReading[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    sensorService
      .getHistory({ from: '', to: '' })
      .then(setHistory)
      .finally(() => setHistoryLoading(false));
  }, []);

  const suitableCount = mockPredictions.predictions.filter(
    (p) => p.suitability === 'Suitable'
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time environmental monitoring and AI-driven crop suitability predictions
          </p>
        </div>
        <Link to="/predictions">
          <Button icon={<Sparkles className="w-4 h-4" />}>New Prediction</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Predictions"
          value={47}
          icon={<Sparkles className="w-5 h-5" />}
          trend="+12% this week"
          trendUp
          color="green"
        />
        <StatCard
          title="Active Sensors"
          value={5}
          icon={<Radio className="w-5 h-5" />}
          trend="All online"
          trendUp
          color="blue"
        />
        <StatCard
          title="Suitable Crops"
          value={suitableCount}
          icon={<Sprout className="w-5 h-5" />}
          trend="Based on latest data"
          trendUp
          color="amber"
        />
        <StatCard
          title="Avg. Response"
          value="1.8s"
          icon={<Clock className="w-5 h-5" />}
          trend="Within target"
          trendUp
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <Card>
            <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary-600" />
              Latest Sensor Readings
            </h3>
            {sensorsLoading ? <Loader /> : <SensorReadings readings={readings} />}
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-slate-800 mb-4">
              Sensor History (Last 24 Hours)
            </h3>
            {historyLoading ? <Loader /> : <SensorHistoryChart readings={history} />}
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Farm Information</h3>
            <FarmInfoPanel />
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-slate-800 mb-4">
              Latest Crop Predictions
            </h3>
            <CropSuitabilityTable predictions={mockPredictions.predictions.slice(0, 4)} />
          </Card>
        </div>
      </div>

      <Card>
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Crop Suitability Overview</h3>
        <SuitabilityChart predictions={mockPredictions.predictions} />
      </Card>
    </div>
  );
}