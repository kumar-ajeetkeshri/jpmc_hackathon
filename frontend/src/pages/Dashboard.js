import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { dashboardAPI } from '../services/api';
import BusinessIcon from '@mui/icons-material/Business';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WarningIcon from '@mui/icons-material/Warning';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const COLORS = {
  CRITICAL: '#d32f2f',
  HIGH: '#f57c00',
  MEDIUM: '#fbc02d',
  LOW: '#388e3c',
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [riskDistribution, setRiskDistribution] = useState(null);
  const [assetDistribution, setAssetDistribution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, riskResponse, assetResponse] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getRiskDistribution(),
        dashboardAPI.getAssetDistribution(),
      ]);

      setStats(statsResponse.data);
      setRiskDistribution(riskResponse.data);
      setAssetDistribution(assetResponse.data);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color = 'primary' }) => (
    <Card elevation={3}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4" component="div" color={color}>
              {value}
            </Typography>
          </Box>
          <Box color={`${color}.main`}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const prepareRiskLevelData = (data) => {
    if (!data) return [];
    return [
      { name: 'Critical', value: data.critical || 0, color: COLORS.CRITICAL },
      { name: 'High', value: data.high || 0, color: COLORS.HIGH },
      { name: 'Medium', value: data.medium || 0, color: COLORS.MEDIUM },
      { name: 'Low', value: data.low || 0, color: COLORS.LOW },
    ];
  };

  const prepareAssetTypeData = (typeDistribution) => {
    if (!typeDistribution) return [];
    return Object.entries(typeDistribution).map(([key, value]) => ({
      name: key.replace(/_/g, ' '),
      value: value,
    }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom className="page-header">
        Risk Asset Management Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} className="stats-grid">
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Assets"
            value={stats?.assets?.total || 0}
            icon={<BusinessIcon fontSize="large" />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Risk Assessments"
            value={stats?.risks?.total || 0}
            icon={<AssessmentIcon fontSize="large" />}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Critical Risks"
            value={stats?.risks?.critical || 0}
            icon={<WarningIcon fontSize="large" />}
            color="error"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Due for Review"
            value={stats?.risks?.dueForReview || 0}
            icon={<TrendingUpIcon fontSize="large" />}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Asset Risk Level Distribution */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} className="chart-container">
            <Typography variant="h6" gutterBottom>
              Asset Risk Level Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={prepareRiskLevelData(stats?.risks)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {prepareRiskLevelData(stats?.risks).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Asset Type Distribution */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} className="chart-container">
            <Typography variant="h6" gutterBottom>
              Asset Type Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={prepareAssetTypeData(stats?.assets?.typeDistribution)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Risk Type Distribution */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} className="chart-container">
            <Typography variant="h6" gutterBottom>
              Risk Type Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={Object.entries(riskDistribution?.byType || {}).map(([key, value]) => ({
                name: key.replace(/_/g, ' '),
                value: value,
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#dc004e" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Asset Criticality Distribution */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} className="chart-container">
            <Typography variant="h6" gutterBottom>
              Asset Criticality Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={Object.entries(assetDistribution?.byCriticality || {}).map(([key, value]) => ({
                    name: key,
                    value: value,
                    color: COLORS[key] || '#8884d8',
                  }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {Object.entries(assetDistribution?.byCriticality || {}).map(([key], index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[key] || '#8884d8'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;