import { Crop } from '@/types';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const FARM_INFO = {
  id: 'farm-macabud-001',
  name: 'Macabud Multi-Crop Farm',
  location: 'Barangay Macabud, Rodriguez (Montalban), Rizal',
  area: 300,
  owner: 'Farm Owner',
};

export const TARGET_CROPS: Crop[] = [
  {
    id: 'rice',
    name: 'Rice',
    scientificName: 'Oryza sativa',
    category: 'Cereal',
    icon: '🌾',
    description: 'Staple cereal crop requiring consistent moisture and warm temperatures.',
    idealConditions: {
      soilPh: [5.5, 7.0],
      soilMoisture: [70, 90],
      temperature: [22, 32],
      rainfall: [150, 300],
    },
  },
  {
    id: 'corn',
    name: 'Corn',
    scientificName: 'Zea mays',
    category: 'Cereal',
    icon: '🌽',
    description: 'Versatile cereal crop well-suited to warm climates with moderate rainfall.',
    idealConditions: {
      soilPh: [5.8, 7.0],
      soilMoisture: [50, 70],
      temperature: [21, 30],
      rainfall: [50, 200],
    },
  },
  {
    id: 'cassava',
    name: 'Cassava',
    scientificName: 'Manihot esculenta',
    category: 'Root Crop',
    icon: '🥔',
    description: 'Drought-tolerant root crop thriving in poor soils and warm climates.',
    idealConditions: {
      soilPh: [4.5, 6.5],
      soilMoisture: [40, 60],
      temperature: [25, 35],
      rainfall: [50, 150],
    },
  },
  {
    id: 'eggplant',
    name: 'Eggplant',
    scientificName: 'Solanum melongena',
    category: 'Vegetable',
    icon: '🍆',
    description: 'Warm-season vegetable requiring well-drained soil and steady moisture.',
    idealConditions: {
      soilPh: [5.8, 6.8],
      soilMoisture: [60, 80],
      temperature: [22, 30],
      rainfall: [60, 120],
    },
  },
  {
    id: 'tomatoes',
    name: 'Tomatoes',
    scientificName: 'Solanum lycopersicum',
    category: 'Vegetable',
    icon: '🍅',
    description: 'Sun-loving vegetable requiring moderate humidity and consistent watering.',
    idealConditions: {
      soilPh: [6.0, 6.8],
      soilMoisture: [60, 80],
      temperature: [20, 27],
      rainfall: [40, 100],
    },
  },
  {
    id: 'string-beans',
    name: 'String Beans',
    scientificName: 'Vigna unguiculata',
    category: 'Legume',
    icon: '🫛',
    description: 'Nitrogen-fixing legume adaptable to warm climates with moderate moisture.',
    idealConditions: {
      soilPh: [6.0, 7.5],
      soilMoisture: [50, 70],
      temperature: [20, 30],
      rainfall: [50, 150],
    },
  },
];

export const SENSOR_LOCATIONS = [
  'North Plot',
  'South Plot',
  'East Plot',
  'West Plot',
  'Center Plot',
];

export const SUITABILITY_COLORS: Record<string, string> = {
  Suitable: 'text-green-700 bg-green-100 border-green-200',
  'Moderately Suitable': 'text-amber-700 bg-amber-100 border-amber-200',
  'Not Suitable': 'text-red-700 bg-red-100 border-red-200',
};

export const CHART_COLORS = ['#16a34a', '#22c55e', '#4ade80', '#86efac', '#bbf7d0', '#dcfce7'];