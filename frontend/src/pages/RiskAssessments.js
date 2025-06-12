import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Box,
  Alert,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { riskAssessmentAPI, assetAPI } from '../services/api';

const RiskAssessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [assessmentToDelete, setAssessmentToDelete] = useState(null);
  const [filterLevel, setFilterLevel] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [assessmentsResponse, assetsResponse] = await Promise.all([
        riskAssessmentAPI.getAll(),
        assetAPI.getAll(),
      ]);
      setAssessments(assessmentsResponse.data);
      setAssets(assetsResponse.data);
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await riskAssessmentAPI.delete(assessmentToDelete.id);
      setAssessments(assessments.filter(assessment => assessment.id !== assessmentToDelete.id));
      setDeleteDialogOpen(false);
      setAssessmentToDelete(null);
    } catch (err) {
      setError('Failed to delete risk assessment');
      console.error('Delete error:', err);
    }
  };

  const applyFilters = async () => {
    try {
      setLoading(true);
      let response;
      
      if (filterLevel && filterType && filterStatus) {
        // Multiple filters - fetch all and filter client-side
        response = await riskAssessmentAPI.getAll();
        const filtered = response.data.filter(assessment => 
          assessment.riskLevel === filterLevel && 
          assessment.riskType === filterType &&
          assessment.status === filterStatus
        );
        setAssessments(filtered);
      } else if (filterLevel) {
        response = await riskAssessmentAPI.getByLevel(filterLevel);
        setAssessments(response.data);
      } else if (filterType) {
        response = await riskAssessmentAPI.getByType(filterType);
        setAssessments(response.data);
      } else if (filterStatus) {
        response = await riskAssessmentAPI.getByStatus(filterStatus);
        setAssessments(response.data);
      } else {
        fetchData();
        return;
      }
    } catch (err) {
      setError('Failed to filter assessments');
      console.error('Filter error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filterLevel, filterType, filterStatus]);

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'CRITICAL': return 'error';
      case 'HIGH': return 'warning';
      case 'MEDIUM': return 'info';
      case 'LOW': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'primary';
      case 'UNDER_REVIEW': return 'warning';
      case 'MITIGATED': return 'success';
      case 'ACCEPTED': return 'info';
      case 'TRANSFERRED': return 'secondary';
      default: return 'default';
    }
  };

  const getAssetName = (assetId) => {
    const asset = assets.find(a => a.id === assetId);
    return asset ? asset.name : 'Unknown Asset';
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'asset',
      headerName: 'Asset',
      width: 200,
      renderCell: (params) => getAssetName(params.row.asset?.id),
    },
    {
      field: 'riskType',
      headerName: 'Risk Type',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value?.replace(/_/g, ' ')}
          color="primary"
          size="small"
        />
      ),
    },
    {
      field: 'riskLevel',
      headerName: 'Risk Level',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getRiskLevelColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: 'riskScore',
      headerName: 'Risk Score',
      width: 100,
      renderCell: (params) => (
        <Box fontWeight="bold" color={getRiskLevelColor(params.row.riskLevel)}>
          {params.value?.toFixed(1) || 'N/A'}
        </Box>
      ),
    },
    { field: 'probability', headerName: 'Probability', width: 100 },
    { field: 'impact', headerName: 'Impact', width: 100 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value?.replace(/_/g, ' ')}
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },
    { field: 'assessorName', headerName: 'Assessor', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            onClick={() => navigate(`/risk-assessments/edit/${params.row.id}`)}
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              setAssessmentToDelete(params.row);
              setDeleteDialogOpen(true);
            }}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const riskTypes = [
    'OPERATIONAL',
    'FINANCIAL',
    'COMPLIANCE',
    'STRATEGIC',
    'REPUTATIONAL',
    'TECHNOLOGY',
    'MARKET',
    'CREDIT',
    'LIQUIDITY',
    'CYBERSECURITY'
  ];

  const riskLevels = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
  
  const statuses = ['ACTIVE', 'UNDER_REVIEW', 'MITIGATED', 'ACCEPTED', 'TRANSFERRED'];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Risk Assessments
        </Typography>
        <Button
          component={Link}
          to="/risk-assessments/new"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add New Assessment
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Filter Controls */}
      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <TextField
          select
          label="Filter by Risk Level"
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          size="small"
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Levels</MenuItem>
          {riskLevels.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Filter by Risk Type"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          size="small"
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Types</MenuItem>
          {riskTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type.replace(/_/g, ' ')}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Filter by Status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          size="small"
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Statuses</MenuItem>
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status.replace(/_/g, ' ')}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="outlined"
          onClick={() => {
            setFilterLevel('');
            setFilterType('');
            setFilterStatus('');
            fetchData();
          }}
        >
          Clear Filters
        </Button>
      </Box>

      {/* Data Grid */}
      <div className="data-grid-container">
        <DataGrid
          rows={assessments}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          loading={loading}
          disableSelectionOnClick
          autoHeight
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this risk assessment?
          This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RiskAssessments;