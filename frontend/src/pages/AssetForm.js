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
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { assetAPI } from '../services/api';

const AssetForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    category: '',
    businessUnit: '',
    ownerName: '',
    ownerEmail: '',
    assetValue: '',
    criticalityLevel: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchAsset();
    }
  }, [id, isEdit]);

  const fetchAsset = async () => {
    try {
      setLoading(true);
      const response = await assetAPI.getById(id);
      setFormData(response.data);
    } catch (err) {
      setError('Failed to fetch asset details');
      console.error('Fetch asset error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const submitData = {
        ...formData,
        assetValue: formData.assetValue ? parseFloat(formData.assetValue) : null,
      };

      if (isEdit) {
        await assetAPI.update(id, submitData);
      } else {
        await assetAPI.create(submitData);
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/assets');
      }, 1500);
    } catch (err) {
      setError(isEdit ? 'Failed to update asset' : 'Failed to create asset');
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  const assetTypes = [
    { value: 'IT_INFRASTRUCTURE', label: 'IT Infrastructure' },
    { value: 'SOFTWARE_APPLICATION', label: 'Software Application' },
    { value: 'DATABASE', label: 'Database' },
    { value: 'NETWORK_EQUIPMENT', label: 'Network Equipment' },
    { value: 'FINANCIAL_INSTRUMENT', label: 'Financial Instrument' },
    { value: 'PHYSICAL_ASSET', label: 'Physical Asset' },
    { value: 'INTELLECTUAL_PROPERTY', label: 'Intellectual Property' },
    { value: 'HUMAN_RESOURCE', label: 'Human Resource' },
  ];

  const assetCategories = [
    { value: 'CRITICAL', label: 'Critical' },
    { value: 'HIGH', label: 'High' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'LOW', label: 'Low' },
  ];

  const criticalityLevels = [
    { value: 'CRITICAL', label: 'Critical' },
    { value: 'HIGH', label: 'High' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'LOW', label: 'Low' },
  ];

  if (success) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Alert severity="success">
          Asset {isEdit ? 'updated' : 'created'} successfully! Redirecting...
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {isEdit ? 'Edit Asset' : 'Create New Asset'}
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
              <TextField
                fullWidth
                label="Asset Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
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

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Asset Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                disabled={loading}
              >
                {assetTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Asset Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={loading}
              >
                {assetCategories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Business Unit"
                name="businessUnit"
                value={formData.businessUnit}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Criticality Level"
                name="criticalityLevel"
                value={formData.criticalityLevel}
                onChange={handleChange}
                disabled={loading}
              >
                {criticalityLevels.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Owner Name"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Owner Email"
                name="ownerEmail"
                type="email"
                value={formData.ownerEmail}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Asset Value ($)"
                name="assetValue"
                type="number"
                value={formData.assetValue}
                onChange={handleChange}
                disabled={loading}
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={() => navigate('/assets')}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : (isEdit ? 'Update Asset' : 'Create Asset')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AssetForm;