import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import RiskAssessments from './pages/RiskAssessments';
import AssetForm from './pages/AssetForm';
import RiskAssessmentForm from './pages/RiskAssessmentForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/assets" element={<Assets />} />
              <Route path="/assets/new" element={<AssetForm />} />
              <Route path="/assets/edit/:id" element={<AssetForm />} />
              <Route path="/risk-assessments" element={<RiskAssessments />} />
              <Route path="/risk-assessments/new" element={<RiskAssessmentForm />} />
              <Route path="/risk-assessments/edit/:id" element={<RiskAssessmentForm />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;