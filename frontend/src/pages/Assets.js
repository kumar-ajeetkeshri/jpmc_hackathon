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
import SearchIcon from '@mui/icons-material/Search';
import { assetAPI } from '../services/api';

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterCriticality, setFilterCriticality] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const response = await assetAPI.getAll();
      setAssets(response.data);
    } catch (err) {
      setError('Failed to fetch assets');
      console.error('Assets fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await assetAPI.delete(assetToDelete.id);
      setAssets(assets.filter(asset => asset.id !== assetToDelete.id));
      setDeleteDialogOpen(false);
      setAssetToDelete(null);
    } catch (err) {
      setError('Failed to delete asset');
      console.error('Delete error:', err);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchAssets();
      return;
    }
    
    try {
      setLoading(true);
      const response = await assetAPI.searchByName(searchTerm);
      setAssets(response.data);
    } catch (err) {
      setError('Failed to search assets');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    try {
      setLoading(true);
      let response;
      
      if (filterType && filterCriticality) {
        // If both filters are applied, we need to fetch all and filter client-side
        response = await assetAPI.getAll();
        const filtered = response.data.filter(asset => 
          asset.type === filterType && asset.criticalityLevel === filterCriticality
        );
        setAssets(filtered);
      } else if (filterType) {
        response = await assetAPI.getByType(filterType);
        setAssets(response.data);
      } else if (filterCriticality) {
        response = await assetAPI.getByCriticalityLevel(filterCriticality);
        setAssets(response.data);
      } else {
        fetchAssets();
        return;
      }
    } catch (err) {
      setError('Failed to filter assets');
      console.error('Filter error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filterType, filterCriticality]);

  const getCriticalityColor = (level) => {
    switch (level) {
      case 'CRITICAL': return 'error';
      case 'HIGH': return 'warning';
      case 'MEDIUM': return 'info';
      case 'LOW': return 'success';
      default: return 'default';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'SOFTWARE_APPLICATION': return 'primary';
      case 'DATABASE': return 'secondary';
      case 'NETWORK_EQUIPMENT': return 'info';
      case 'IT_INFRASTRUCTURE': return 'warning';
      default: return 'default';
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Asset Name', width: 200, flex: 1 },
    {
      field: 'type',
      headerName: 'Type',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value?.replace(/_/g, ' ')}
          color={getTypeColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: 'criticalityLevel',
      headerName: 'Criticality',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getCriticalityColor(params.value)}
          size="small"
        />
      ),
    },
    { field: 'businessUnit', headerName: 'Business Unit', width: 150 },
    { field: 'ownerName', headerName: 'Owner', width: 150 },
    {
      field: 'assetValue',
      headerName: 'Value ($)',
      width: 120,
      renderCell: (params) => (
        params.value ? `$${params.value.toLocaleString()}` : 'N/A'
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            onClick={() => navigate(`/assets/edit/${params.row.id}`)}
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              setAssetToDelete(params.row);
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

  const assetTypes = [
    'IT_INFRASTRUCTURE',
    'SOFTWARE_APPLICATION',
    'DATABASE',
    'NETWORK_EQUIPMENT',
    'FINANCIAL_INSTRUMENT',
    'PHYSICAL_ASSET',
    'INTELLECTUAL_PROPERTY',
    'HUMAN_RESOURCE'
  ];

  const criticalityLevels = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Asset Inventory
        </Typography>
        <Button
          component={Link}
          to="/assets/new"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add New Asset
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Search and Filter Controls */}
      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <TextField
          label="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          size="small"
          sx={{ minWidth: 200 }}
        />
        <Button
          variant="outlined"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
        >
          Search
        </Button>
        <TextField
          select
          label="Filter by Type"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          size="small"
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Types</MenuItem>
          {assetTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type.replace(/_/g, ' ')}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Filter by Criticality"
          value={filterCriticality}
          onChange={(e) => setFilterCriticality(e.target.value)}
          size="small"
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Levels</MenuItem>
          {criticalityLevels.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="outlined"
          onClick={() => {
            setSearchTerm('');
            setFilterType('');
            setFilterCriticality('');
            fetchAssets();
          }}
        >
          Clear Filters
        </Button>
      </Box>

      {/* Data Grid */}
      <div className="data-grid-container">
        <DataGrid
          rows={assets}
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
          Are you sure you want to delete the asset "{assetToDelete?.name}"?
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

export default Assets;