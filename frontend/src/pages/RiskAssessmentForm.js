import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  MenuItem,
  Grid,
  Paper,
  Slider,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { riskAssessmentAPI, assetAPI } from '../services/api';

const RiskAssessmentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    asset: { id: '' },
    riskType: '',
    riskLevel: '',
    probability: 5,
    impact: 5,
    description: '',
    mitigationStrategy: '',
    assessorName: '',
    nextReviewDate: '',
    status: 'ACTIVE',
  });

  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchAssets();
    if (isEdit) {
      fetchRiskAssessment();
    }
  }, [id, isEdit]);

  const fetchAssets = async () => {
    try {
      const response = await assetAPI.getAll();
      setAssets(response.data);
    } catch (err) {
      setError('Failed to fetch assets');
      console.error('Fetch assets error:', err);
    }
  };

  const fetchRiskAssessment = async () => {
    try {
      setLoading(true);
      const response = await riskAssessmentAPI.getById(id);
      const data = response.data;
      setFormData({
        ...data,
        nextReviewDate: data.nextReviewDate ? data.nextReviewDate.split('T')[0] : '',
      });
    } catch (err) {
      setError('Failed to fetch risk assessment details');
      console.error('Fetch assessment error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'assetId') {
      setFormData(prev => ({
        ...prev,
        asset: { id: value },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSliderChange = (name) => (event, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateRiskLevel = (probability, impact) => {
    const score = (probability * impact) / 10;
    if (score >= 8) return 'CRITICAL';
    if (score >= 6) return 'HIGH';
    if (score >= 4) return 'MEDIUM';
    return 'LOW';
  };

  useEffect(() => {
    const newRiskLevel = calculateRiskLevel(formData.probability, formData.impact);
    if (newRiskLevel !== formData.riskLevel) {
      setFormData(prev => ({
        ...prev,
        riskLevel: newRiskLevel,
      }));
    }
  }, [formData.probability, formData.impact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const submitData = {
        ...formData,
        nextReviewDate: formData.nextReviewDate ? `${formData.nextReviewDate}T00:00:00` : null,
      };

      if (isEdit) {
        await riskAssessmentAPI.update(id, submitData);
      } else {
        await riskAssessmentAPI.create(submitData);
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/risk-assessments');
      }, 1500);
    } catch (err) {
      setError(isEdit ? 'Failed to update risk assessment' : 'Failed to create risk assessment');
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  const riskTypes = [
    { value: 'OPERATIONAL', label: 'Operational' },
    { value: 'FINANCIAL', label: 'Financial' },
    { value: 'COMPLIANCE', label: 'Compliance' },
    { value: 'STRATEGIC', label: 'Strategic' },
    { value: 'REPUTATIONAL', label: 'Reputational' },
    { value: 'TECHNOLOGY', label: 'Technology' },
    { value: 'MARKET', label: 'Market' },
    { value: 'CREDIT', label: 'Credit' },
    { value: 'LIQUIDITY', label: 'Liquidity' },
    { value: 'CYBERSECURITY', label: 'Cybersecurity' },
  ];

  const statuses = [
    { value: 'ACTIVE', label: 'Active' },
    { value: 'UNDER_REVIEW', label: 'Under Review' },
    { value: 'MITIGATED', label: 'Mitigated' },
    { value: 'ACCEPTED', label: 'Accepted' },
    { value: 'TRANSFERRED', label: 'Transferred' },
  ];

  const getRiskScoreColor = (score) => {
    if (score >= 8) return '#d32f2f';
    if (score >= 6) return '#f57c00';
    if (score >= 4) return '#fbc02d';
    return '#388e3c';
  };

  const riskScore = (formData.probability * formData.impact) / 10;

  if (success) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Alert severity="success">
          Risk assessment {isEdit ? 'updated' : 'created'} successfully! Redirecting...
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {isEdit ? 'Edit Risk Assessment' : 'Create New Risk Assessment'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Asset</InputLabel>
                <Select
                  name="assetId"
                  value={formData.asset?.id || ''}
                  onChange={handleChange}
                  disabled={loading}
                  label="Asset"
                >
                  {assets.map((asset) => (
                    <MenuItem key={asset.id} value={asset.id}>
                      {asset.name} ({asset.type?.replace(/_/g, ' ')})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Risk Type"
                name="riskType"
                value={formData.riskType}
                onChange={handleChange}
                required
                disabled={loading}
              >
                {riskTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Risk Level"
                name="riskLevel"
                value={formData.riskLevel}
                disabled
                helperText="Automatically calculated based on probability and impact"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography gutterBottom>
                Probability: {formData.probability}
              </Typography>
              <Slider
                value={formData.probability}
                onChange={handleSliderChange('probability')}
                min={1}
                max={10}
                step={1}
                marks
                valueLabelDisplay="auto"
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography gutterBottom>
                Impact: {formData.impact}
              </Typography>
              <Slider
                value={formData.impact}
                onChange={handleSliderChange('impact')}
                min={1}
                max={10}
                step={1}
                marks
                valueLabelDisplay="auto"
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12}>
              <Box 
                p={2} 
                border={1} 
                borderColor="grey.300" 
                borderRadius={1}
                bgcolor="grey.50"
              >
                <Typography variant="h6" gutterBottom>
                  Risk Score: 
                  <span style={{ color: getRiskScoreColor(riskScore), fontWeight: 'bold' }}>
                    {' '}{riskScore.toFixed(1)}
                  </span>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Calculated as: (Probability × Impact) ÷ 10
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mitigation Strategy"
                name="mitigationStrategy"
                value={formData.mitigationStrategy}
                onChange={handleChange}
                multiline
                rows={3}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Assessor Name"
                name="assessorName"
                value={formData.assessorName}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={loading}
              >
                {statuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Next Review Date"
                name="nextReviewDate"
                type="date"
                value={formData.nextReviewDate}
                onChange={handleChange}
                disabled={loading}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={() => navigate('/risk-assessments')}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : (isEdit ? 'Update Assessment' : 'Create Assessment')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default RiskAssessmentForm;