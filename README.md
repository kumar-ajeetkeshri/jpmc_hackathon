# JPMC Risk Asset Management System

A comprehensive Risk Asset Inventory Management System built with React frontend and Java Spring Boot backend, designed for JPMC to manage and assess risks across various asset types.

## 🏗️ Architecture

### Backend (Java Spring Boot)
- **Framework**: Spring Boot 3.2.0 with Java 17
- **Database**: H2 in-memory database (for demo purposes)
- **API Documentation**: Swagger/OpenAPI 3
- **Features**:
  - RESTful APIs for asset and risk assessment management
  - Comprehensive data models for assets and risk assessments
  - Advanced filtering and search capabilities
  - Dashboard analytics and statistics
  - CORS configuration for frontend integration

### Frontend (React)
- **Framework**: React 18 with Material-UI
- **Routing**: React Router DOM
- **Charts**: Recharts for data visualization
- **Data Grid**: MUI X Data Grid for tabular data
- **Features**:
  - Responsive dashboard with analytics
  - Asset inventory management
  - Risk assessment creation and management
  - Interactive charts and visualizations
  - Modern, professional UI design

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- Maven 3.6 or higher

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build and run the Spring Boot application:
```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:12001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will start on `http://localhost:12000`

### Grafana Dashboard Setup

1. Navigate to the grafana directory:
```bash
cd grafana
```

2. Start the Grafana dashboard (requires Docker):
```bash
./start-grafana.sh
```

The Grafana dashboard will be available at `http://localhost:3000` (admin/admin123)

## 📊 Features

### Asset Management
- **Asset Types**: IT Infrastructure, Software Applications, Databases, Network Equipment, Financial Instruments, Physical Assets, Intellectual Property, Human Resources
- **Asset Categories**: Critical, High, Medium, Low
- **Asset Properties**: Name, Description, Business Unit, Owner, Value, Criticality Level
- **Operations**: Create, Read, Update, Delete, Search, Filter

### Risk Assessment
- **Risk Types**: Operational, Financial, Compliance, Strategic, Reputational, Technology, Market, Credit, Liquidity, Cybersecurity
- **Risk Levels**: Critical, High, Medium, Low (auto-calculated)
- **Assessment Properties**: Probability (1-10), Impact (1-10), Risk Score, Mitigation Strategy, Status
- **Statuses**: Active, Under Review, Mitigated, Accepted, Transferred

### Dashboard Analytics
- **Asset Statistics**: Total assets, distribution by type and criticality
- **Risk Statistics**: Total assessments, distribution by level and type
- **Visual Charts**: Pie charts, bar charts for data visualization
- **Key Metrics**: Critical risks, assessments due for review

### Grafana Performance Dashboard
- **Real-time Monitoring**: 30-second auto-refresh with live API integration
- **Performance KPIs**: Asset counts, risk levels, compliance scores
- **Advanced Analytics**: Risk heat maps, trend analysis, business unit performance
- **Executive Views**: High-level summaries and distribution charts
- **Custom Visualizations**: Gauges, time series, tables with color coding

## 🔗 API Endpoints

### Asset Management
- `GET /api/assets` - Get all assets
- `POST /api/assets` - Create new asset
- `GET /api/assets/{id}` - Get asset by ID
- `PUT /api/assets/{id}` - Update asset
- `DELETE /api/assets/{id}` - Delete asset
- `GET /api/assets/type/{type}` - Filter by asset type
- `GET /api/assets/criticality/{level}` - Filter by criticality level
- `GET /api/assets/search?name={name}` - Search by name

### Risk Assessment Management
- `GET /api/risk-assessments` - Get all risk assessments
- `POST /api/risk-assessments` - Create new assessment
- `GET /api/risk-assessments/{id}` - Get assessment by ID
- `PUT /api/risk-assessments/{id}` - Update assessment
- `DELETE /api/risk-assessments/{id}` - Delete assessment
- `GET /api/risk-assessments/asset/{assetId}` - Get assessments for asset
- `GET /api/risk-assessments/level/{level}` - Filter by risk level
- `GET /api/risk-assessments/type/{type}` - Filter by risk type

### Dashboard Analytics
- `GET /api/dashboard/stats` - Get overall statistics
- `GET /api/dashboard/risk-distribution` - Get risk distribution data
- `GET /api/dashboard/asset-distribution` - Get asset distribution data

## 📖 API Documentation

Once the backend is running, access the Swagger UI at:
`http://localhost:12001/api/swagger-ui.html`

## 🗄️ Database

The application uses H2 in-memory database with sample data pre-loaded. Access the H2 console at:
`http://localhost:12001/api/h2-console`

**Connection Details:**
- JDBC URL: `jdbc:h2:mem:riskassetdb`
- Username: `sa`
- Password: `password`

## 🎨 UI Features

### Dashboard
- Overview cards showing key metrics
- Interactive charts for risk and asset distribution
- Real-time statistics and analytics

### Asset Management
- Data grid with sorting, filtering, and pagination
- Search functionality by asset name
- Filter by type, category, and criticality level
- Create/Edit forms with validation
- Delete confirmation dialogs

### Risk Assessment Management
- Comprehensive assessment forms
- Automatic risk score calculation
- Visual risk level indicators
- Mitigation strategy tracking
- Review date management

## 🔧 Configuration

### Backend Configuration
- **Port**: 12001 (configurable in `application.yml`)
- **Database**: H2 in-memory (can be changed to PostgreSQL/MySQL)
- **CORS**: Enabled for all origins (configure in `WebConfig.java`)

### Frontend Configuration
- **Port**: 12000 (configurable in `package.json`)
- **API Base URL**: `http://localhost:12001/api`
- **Proxy**: Configured for backend communication

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
mvn clean package
java -jar target/risk-asset-management-1.0.0.jar
```

### Frontend Deployment
```bash
cd frontend
npm run build
# Serve the build folder with any static file server
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 Sample Data

The application comes with pre-loaded sample data including:
- 8 sample assets across different types and criticality levels
- 8 sample risk assessments with various risk types and levels
- Realistic business scenarios for demonstration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact the JPMC Risk Management Team at risk-management@jpmc.com.

---

**Built with ❤️ for JPMC Hackathon**