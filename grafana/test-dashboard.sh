#!/bin/bash

echo "🧪 Testing JPMC Risk Asset Management Grafana Dashboard Setup"
echo ""

# Test API connectivity
echo "1. 🔍 Testing API Connectivity..."
API_BASE="https://work-2-ipizlxbbppnfocgs.prod-runtime.all-hands.dev/api"

endpoints=(
    "/dashboard/stats"
    "/dashboard/risk-distribution"
    "/dashboard/asset-distribution"
    "/assets"
    "/risk-assessments"
)

for endpoint in "${endpoints[@]}"; do
    echo -n "   Testing ${endpoint}... "
    if curl -s "${API_BASE}${endpoint}" > /dev/null; then
        echo "✅ OK"
    else
        echo "❌ FAILED"
    fi
done

echo ""

# Test Docker availability
echo "2. 🐳 Testing Docker..."
if command -v docker &> /dev/null; then
    echo "   ✅ Docker is installed"
    if docker info > /dev/null 2>&1; then
        echo "   ✅ Docker daemon is running"
    else
        echo "   ❌ Docker daemon is not running"
    fi
else
    echo "   ❌ Docker is not installed"
fi

echo ""

# Test Docker Compose availability
echo "3. 📦 Testing Docker Compose..."
if command -v docker-compose &> /dev/null; then
    echo "   ✅ Docker Compose is installed"
else
    echo "   ❌ Docker Compose is not installed"
fi

echo ""

# Test configuration files
echo "4. 📄 Testing Configuration Files..."
files=(
    "docker-compose.yml"
    "provisioning/datasources/datasources.yml"
    "provisioning/dashboards/dashboards.yml"
    "dashboards/jpmc-risk-performance.json"
    "dashboards/jpmc-risk-advanced.json"
)

for file in "${files[@]}"; do
    echo -n "   Checking ${file}... "
    if [ -f "$file" ]; then
        echo "✅ EXISTS"
    else
        echo "❌ MISSING"
    fi
done

echo ""

# Test sample API data
echo "5. 📊 Testing Sample API Data..."
echo "   Dashboard Stats:"
curl -s "${API_BASE}/dashboard/stats" | jq '.' 2>/dev/null || echo "   ❌ Failed to parse JSON"

echo ""
echo "   Risk Distribution:"
curl -s "${API_BASE}/dashboard/risk-distribution" | jq '.byLevel' 2>/dev/null || echo "   ❌ Failed to parse JSON"

echo ""

# Test JSON validity
echo "6. ✅ Testing Dashboard JSON Validity..."
for dashboard in dashboards/*.json; do
    echo -n "   Validating $(basename "$dashboard")... "
    if jq empty "$dashboard" 2>/dev/null; then
        echo "✅ VALID"
    else
        echo "❌ INVALID JSON"
    fi
done

echo ""

# Performance recommendations
echo "7. 🚀 Performance Recommendations:"
echo "   • Set refresh interval to 30s or higher for production"
echo "   • Use caching for frequently accessed endpoints"
echo "   • Monitor API response times"
echo "   • Consider using Prometheus for time-series data"

echo ""

# Security recommendations
echo "8. 🔒 Security Recommendations:"
echo "   • Change default Grafana admin password"
echo "   • Enable HTTPS for all connections"
echo "   • Implement API authentication"
echo "   • Use environment variables for sensitive data"

echo ""

echo "🎉 Dashboard setup test completed!"
echo ""
echo "📋 Next Steps:"
echo "   1. Run: ./start-grafana.sh"
echo "   2. Open: http://localhost:3000"
echo "   3. Login: admin / admin123"
echo "   4. Navigate to dashboards"
echo ""