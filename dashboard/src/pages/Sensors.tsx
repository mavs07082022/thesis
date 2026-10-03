import { Radio, Activity, Wifi, Database } from 'lucide-react';
import { useEffect, useState } from 'react';
import Card from '@/components/common/Card';
import Loader from '@/components/common/Loader';
import SensorReadings from '@/components/dashboard/SensorReadings';
import SensorHistoryChart from '@/components/dashboard/SensorHistoryChart';
import { useSensors } from '@/hooks/useSensors';
import { SENSOR_LOCATIONS } from '@/utils/constants';
import { sensorService } from '@/services/sensorService';
import { SensorReading } from '@/types';

export default function Sensors() {
  const { readings, loading } = useSensors();
  const [history, setHistory] = useState<SensorReading[]>([]);

  useEffect(() => {
    sensorService.getHistory({ from: '', to: '' }).then(setHistory);
  }, []);

  const sensorNodes = [
    { name: 'YAGO 8-in-1 Soil Sensor', type: 'Soil', status: 'online', icon: Database },
    { name: 'SHT35 Air Sensor', type: 'Air', status: 'online', icon: Activity },
    { name: 'XIAO ESP32-C6', type: 'Microcontroller', status: 'online', icon: Wifi },
    { name: 'Raspberry Pi 3 Gateway', type: 'Gateway', status: 'online', icon: Radio },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sensor Monitoring</h1>
        <p className="text-sm text-slate-500 mt-1">
          Environmental data collection from YAGO 8-in-1 soil sensor and SHT35 air sensor.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sensorNodes.map((node) => {
          const Icon = node.icon;
          return (
            <Card key={node.name} hover>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wide font-semibold text-slate-500">
                    {node.type}
                  </p>
                  <p className="text-sm font-semibold text-slate-800 leading-tight mt-0.5">
                    {node.name}
                  </p>
                  <span className="badge bg-green-100 text-green-700 border border-green-200 mt-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    {node.status}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card>
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Sensor Locations</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {SENSOR_LOCATIONS.map((loc) => (
            <div
              key={loc}
              className="rounded-lg border border-slate-200 p-3 hover:border-primary-300 transition-all"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-slate-700">{loc}</span>
              </div>
              <p className="text-[10px] text-slate-500">Active · Reporting</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Current Readings</h3>
        {loading ? <Loader /> : <SensorReadings readings={readings} />}
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Historical Trend</h3>
        <SensorHistoryChart readings={history} />
      </Card>
    </div>
  );
}