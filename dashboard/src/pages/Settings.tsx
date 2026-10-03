import { useState } from 'react';
import { Globe, Bell, Server, Save, Check } from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { useApp } from '@/context/AppContext';
import { API_BASE_URL, USE_MOCK_DATA } from '@/utils/constants';

export default function Settings() {
  const { language, setLanguage } = useApp();
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure system preferences and connection settings.
        </p>
      </div>

      <Card>
        <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary-600" />
          Language Preference
        </h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLanguage('en')}
            className={`flex-1 px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
              language === 'en'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('tl')}
            className={`flex-1 px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
              language === 'tl'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            Tagalog
          </button>
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary-600" />
          Notifications
        </h3>
        <label className="flex items-center justify-between cursor-pointer">
          <div>
            <p className="text-sm font-medium text-slate-700">Sensor Alerts</p>
            <p className="text-xs text-slate-500">
              Receive alerts when sensor readings go outside expected ranges.
            </p>
          </div>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="w-10 h-6 rounded-full appearance-none bg-slate-300 checked:bg-primary-600 relative transition-colors cursor-pointer
              before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:w-5 before:h-5 before:bg-white before:rounded-full before:transition-transform
              checked:before:translate-x-4"
          />
        </label>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Server className="w-4 h-4 text-primary-600" />
          System Information
        </h3>
        <div className="space-y-3">
          <InfoRow label="API Endpoint" value={API_BASE_URL} />
          <InfoRow label="Data Mode" value={USE_MOCK_DATA ? 'Mock Data' : 'Live Data'} />
          <InfoRow label="Model Version" value="v1.0.0" />
          <InfoRow label="Sensor Nodes" value="5 active" />
          <InfoRow label="Database" value="PostgreSQL + TimescaleDB" />
        </div>
      </Card>

      <div className="flex items-center gap-3">
        <Button
          onClick={handleSave}
          icon={saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
        >
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-xs font-semibold text-slate-700 font-mono">{value}</span>
    </div>
  );
}