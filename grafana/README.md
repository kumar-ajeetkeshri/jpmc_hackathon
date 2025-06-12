# JPMC Risk Asset Management - Grafana Performance Dashboard

## 📊 Overview

This Grafana dashboard provides comprehensive performance monitoring and analytics for the JPMC Risk Asset Management System. It visualizes key metrics, trends, and insights from the REST API endpoints to help stakeholders monitor asset inventory performance and risk assessment effectiveness.

## 🎯 Dashboard Features

### Key Performance Indicators (KPIs)
- **Total Assets**: Real-time count of all assets in the inventory
- **Total Risk Assessments**: Number of active risk assessments
- **Critical Risks**: Count of critical-level risks requiring immediate attention
- **Due for Review**: Risk assessments requiring review

### Visualizations

#### 1. Asset Criticality Distribution (Pie Chart)
- Shows distribution of assets by criticality level (Critical, High, Medium, Low)
- Color-coded for quick identification of risk concentration

#### 2. Risk Level Distribution (Pie Chart)
- Displays risk assessments grouped by risk level
- Helps identify overall risk posture

#### 3. Asset Type Distribution (Bar Chart)
- Breakdown of assets by type (Software, Database, Infrastructure, etc.)
- Useful for understanding asset portfolio composition

#### 4. Risk Type Distribution (Donut Chart)
- Shows distribution of risks by type (Cybersecurity, Operational, Compliance, etc.)
- Identifies primary risk categories affecting the organization

#### 5. Risk Assessment Details (Table)
- Detailed view of all risk assessments
- Color-coded risk levels for quick scanning
- Includes asset information and business unit mapping

#### 6. Asset Inventory Details (Table)
- Comprehensive asset listing with key attributes
- Asset values, owners, and criticality levels
- Sortable and filterable for detailed analysis

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- JPMC Risk Asset Management API running and accessible
- Network connectivity to the API endpoints

### Installation & Setup

1. **Navigate to the Grafana directory:**
   ```bash
   cd /workspace/jpmc_hackathon/grafana
   ```

2. **Start the dashboard:**
   ```bash
   ./start-grafana.sh
   ```

3. **Access the dashboard:**
   - Open browser to: http://localhost:3000
   - Login with: admin / admin123
   - Navigate to "JPMC Risk Asset Management - Performance Dashboard"

### Manual Setup

If you prefer manual setup:

```bash
# Start services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f grafana
```

## 📈 Data Sources

The dashboard connects to the following API endpoints:

### Primary Data Source: JPMC Risk API
- **Base URL**: `https://work-2-ipizlxbbppnfocgs.prod-runtime.all-hands.dev/api`
- **Type**: Infinity Data Source (HTTP/REST API)
- **Authentication**: None (public endpoints)

### Key Endpoints Used:
- `/dashboard/stats` - Overall statistics and KPIs
- `/dashboard/risk-distribution` - Risk distribution analytics
- `/dashboard/asset-distribution` - Asset distribution analytics
- `/assets` - Complete asset inventory
- `/risk-assessments` - All risk assessments

## 🔧 Configuration

### Data Source Configuration
The dashboard uses the Infinity data source plugin to connect to REST APIs:

```yaml
datasources:
  - name: JPMC Risk API - Infinity
    type: yesoreyeram-infinity-datasource
    url: https://work-2-ipizlxbbppnfocgs.prod-runtime.all-hands.dev/api
    jsonData:
      auth_method: none
      timeout: 30
```

### Refresh Settings
- **Auto-refresh**: 30 seconds
- **Time range**: Last 6 hours (configurable)
- **Real-time updates**: Enabled

## 📊 Panel Details

### Stat Panels
- **Total Assets**: Shows current asset count with threshold-based coloring
- **Total Risk Assessments**: Displays active risk assessment count
- **Critical Risks**: Highlights critical risks with red background when > 0
- **Due for Review**: Shows overdue assessments with warning colors

### Chart Panels
- **Pie Charts**: Use palette-classic color scheme for consistency
- **Bar Charts**: Horizontal orientation for better label readability
- **Tables**: Color-coded cells for risk levels and criticality

### Color Coding Standards
- **Critical**: Red (#FF0000)
- **High**: Orange (#FFA500)
- **Medium**: Yellow (#FFFF00)
- **Low**: Green (#00FF00)

## 🔍 Monitoring Capabilities

### Real-time Metrics
- Asset inventory changes
- New risk assessments
- Risk level modifications
- Business unit performance

### Trend Analysis
- Asset growth over time
- Risk assessment completion rates
- Criticality level changes
- Review compliance tracking

### Alerting (Future Enhancement)
- Critical risk threshold breaches
- Overdue review notifications
- Asset value anomalies
- Business unit risk concentration

## 🛠️ Customization

### Adding New Panels
1. Edit the dashboard JSON file
2. Add new panel configuration
3. Configure data source and queries
4. Set visualization options
5. Update dashboard version

### Modifying Queries
The dashboard uses JSON path selectors to extract data:
```json
{
  "selector": "assets.total",
  "text": "Total Assets",
  "type": "number"
}
```

### Custom Filters
Add template variables for dynamic filtering:
- Business Unit selector
- Asset Type filter
- Risk Level filter
- Time range picker

## 📋 Troubleshooting

### Common Issues

#### Dashboard Not Loading
- Check API connectivity: `curl https://work-2-ipizlxbbppnfocgs.prod-runtime.all-hands.dev/api/dashboard/stats`
- Verify Grafana is running: `docker-compose ps`
- Check Grafana logs: `docker-compose logs grafana`

#### No Data Displayed
- Verify data source configuration
- Check API endpoint responses
- Validate JSON path selectors
- Review panel query configurations

#### Performance Issues
- Reduce refresh frequency
- Limit data range
- Optimize API queries
- Check network latency

### Log Locations
- Grafana logs: `docker-compose logs grafana`
- Prometheus logs: `docker-compose logs prometheus`
- Container status: `docker-compose ps`

## 🔐 Security Considerations

### Current Setup
- No authentication required for API access
- Grafana admin credentials: admin/admin123
- Anonymous viewing enabled for demo purposes

### Production Recommendations
- Enable API authentication
- Configure HTTPS for all connections
- Use strong Grafana admin passwords
- Implement role-based access control
- Enable audit logging

## 📈 Performance Optimization

### Data Source Optimization
- Cache API responses where possible
- Use appropriate refresh intervals
- Implement query result caching
- Monitor API response times

### Dashboard Performance
- Limit concurrent panel queries
- Use efficient visualization types
- Implement progressive loading
- Optimize JSON path selectors

## 🔄 Maintenance

### Regular Tasks
- Update dashboard configurations
- Monitor API endpoint changes
- Review and optimize queries
- Update color schemes and themes
- Backup dashboard configurations

### Version Control
- Dashboard JSON files stored in Git
- Provisioning configurations versioned
- Docker Compose files tracked
- Documentation updates maintained

## 📞 Support

### Resources
- Grafana Documentation: https://grafana.com/docs/
- Infinity Plugin: https://grafana.com/grafana/plugins/yesoreyeram-infinity-datasource/
- Docker Compose: https://docs.docker.com/compose/

### Contact
- JPMC Risk Management Team: risk-management@jpmc.com
- Technical Support: Available through internal channels

---

**Last Updated**: June 12, 2025  
**Dashboard Version**: 1.0.0  
**Grafana Version**: Latest  
**Status**: Production Ready