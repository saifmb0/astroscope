/**
 * NASA Lessons and Risk Categories
 */

export const TRENDING_QUERIES = [
  {
    id: 'apollo',
    title: 'Apollo Missions',
    query: 'Apollo',
    icon: '🚀',
    gradient: ['#FF6B6B', '#C44569'],
  },
  {
    id: 'mars',
    title: 'Mars Lander',
    query: 'Mars Lander',
    icon: '🔴',
    gradient: ['#FF9F43', '#EE5A24'],
  },
  {
    id: 'thermal',
    title: 'Thermal Systems',
    query: 'Thermal',
    icon: '🌡️',
    gradient: ['#00D9FF', '#0097B2'],
  },
  {
    id: 'comms',
    title: 'Comms Failures',
    query: 'Communications Failure',
    icon: '📡',
    gradient: ['#9D4EDD', '#7209B7'],
  },
  {
    id: 'propulsion',
    title: 'Propulsion',
    query: 'Propulsion',
    icon: '⚡',
    gradient: ['#06FFA5', '#059669'],
  },
  {
    id: 'cryogenic',
    title: 'Cryogenic Valves',
    query: 'Cryogenic Valve Failures',
    icon: '❄️',
    gradient: ['#48CAE4', '#0077B6'],
  },
];

export const DEMO_QUERIES = [
  'What are the risks for an asteroid lander?',
  'Tell me about Apollo mission failures',
  'What went wrong with Mars missions?',
  'Common thermal system issues in space',
  'How to prevent communications failures?',
  'Lessons from rocket propulsion failures',
];

export const NASA_API_CONFIG = {
  baseUrl: 'https://llis.nasa.gov/llis/lesson/_search',
  timeout: 5000,
  maxRetries: 2,
};
