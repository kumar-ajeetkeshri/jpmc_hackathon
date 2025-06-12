import axios from 'axios';

const API_BASE_URL = 'http://localhost:12001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Asset API calls
export const assetAPI = {
  getAll: () => api.get('/assets'),
  getById: (id) => api.get(`/assets/${id}`),
  create: (asset) => api.post('/assets', asset),
  update: (id, asset) => api.put(`/assets/${id}`, asset),
  delete: (id) => api.delete(`/assets/${id}`),
  getByType: (type) => api.get(`/assets/type/${type}`),
  getByCategory: (category) => api.get(`/assets/category/${category}`),
  getByCriticalityLevel: (level) => api.get(`/assets/criticality/${level}`),
  getByBusinessUnit: (unit) => api.get(`/assets/business-unit/${unit}`),
  searchByName: (name) => api.get(`/assets/search?name=${name}`),
  getByValueRange: (minValue, maxValue) => api.get(`/assets/value-range?minValue=${minValue}&maxValue=${maxValue}`),
};

// Risk Assessment API calls
export const riskAssessmentAPI = {
  getAll: () => api.get('/risk-assessments'),
  getById: (id) => api.get(`/risk-assessments/${id}`),
  create: (assessment) => api.post('/risk-assessments', assessment),
  update: (id, assessment) => api.put(`/risk-assessments/${id}`, assessment),
  delete: (id) => api.delete(`/risk-assessments/${id}`),
  getByAssetId: (assetId) => api.get(`/risk-assessments/asset/${assetId}`),
  getByType: (type) => api.get(`/risk-assessments/type/${type}`),
  getByLevel: (level) => api.get(`/risk-assessments/level/${level}`),
  getByStatus: (status) => api.get(`/risk-assessments/status/${status}`),
  getByScoreRange: (minScore, maxScore) => api.get(`/risk-assessments/score-range?minScore=${minScore}&maxScore=${maxScore}`),
  getDueForReview: () => api.get('/risk-assessments/due-for-review'),
  getByBusinessUnit: (unit) => api.get(`/risk-assessments/business-unit/${unit}`),
};

// Dashboard API calls
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getRiskDistribution: () => api.get('/dashboard/risk-distribution'),
  getAssetDistribution: () => api.get('/dashboard/asset-distribution'),
};

export default api;