import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Predictions from './pages/Predictions';
import Sensors from './pages/Sensors';
import Crops from './pages/Crops';
import History from './pages/History';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="predictions" element={<Predictions />} />
        <Route path="sensors" element={<Sensors />} />
        <Route path="crops" element={<Crops />} />
        <Route path="history" element={<History />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}