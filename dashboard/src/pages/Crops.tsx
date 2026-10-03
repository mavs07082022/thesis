import { Droplets, Thermometer, FlaskConical, CloudRain } from 'lucide-react';
import Card from '@/components/common/Card';
import { TARGET_CROPS } from '@/utils/constants';

export default function Crops() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Target Crops</h1>
        <p className="text-sm text-slate-500 mt-1">
          The six crops evaluated by the AI model based on environmental conditions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {TARGET_CROPS.map((crop) => (
          <Card key={crop.id} hover className="animate-fade-in">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-earth-50 flex items-center justify-center text-2xl">
                {crop.icon}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-slate-800">{crop.name}</h3>
                <p className="text-xs text-slate-500 italic">{crop.scientificName}</p>
                <span className="badge bg-slate-100 text-slate-700 border border-slate-200 mt-1.5">
                  {crop.category}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">{crop.description}</p>

            <div className="space-y-2 pt-3 border-t border-slate-100">
              <p className="text-[10px] uppercase tracking-wide font-semibold text-slate-500">
                Ideal Conditions
              </p>
              <div className="grid grid-cols-2 gap-2">
                <ConditionItem
                  icon={FlaskConical}
                  label="Soil pH"
                  value={`${crop.idealConditions.soilPh[0]}–${crop.idealConditions.soilPh[1]}`}
                />
                <ConditionItem
                  icon={Droplets}
                  label="Moisture"
                  value={`${crop.idealConditions.soilMoisture[0]}–${crop.idealConditions.soilMoisture[1]}%`}
                />
                <ConditionItem
                  icon={Thermometer}
                  label="Temp"
                  value={`${crop.idealConditions.temperature[0]}–${crop.idealConditions.temperature[1]}°C`}
                />
                <ConditionItem
                  icon={CloudRain}
                  label="Rainfall"
                  value={`${crop.idealConditions.rainfall[0]}–${crop.idealConditions.rainfall[1]}mm`}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ConditionItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon className="w-3 h-3 text-slate-400 flex-shrink-0" />
      <div className="min-w-0">
        <p className="text-[9px] text-slate-500 uppercase tracking-wide">{label}</p>
        <p className="text-[11px] font-semibold text-slate-700 truncate">{value}</p>
      </div>
    </div>
  );
}
