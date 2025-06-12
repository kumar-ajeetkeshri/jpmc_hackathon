#!/bin/bash

echo "🚀 Starting JPMC Risk Asset Management Grafana Dashboard..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if the API is accessible
echo "🔍 Checking API connectivity..."
if curl -s https://work-2-ipizlxbbppnfocgs.prod-runtime.all-hands.dev/api/dashboard/stats > /dev/null; then
    echo "✅ API is accessible"
else
    echo "❌ API is not accessible. Please ensure the backend is running."
    exit 1
fi

# Start Grafana and Prometheus
echo "🐳 Starting Docker containers..."
docker-compose up -d

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 30

# Check if Grafana is running
if curl -s http://localhost:3000/api/health > /dev/null; then
    echo "✅ Grafana is running"
else
    echo "❌ Grafana failed to start"
    exit 1
fi

echo ""
echo "🎉 JPMC Risk Asset Management Dashboard is ready!"
echo ""
echo "📊 Access URLs:"
echo "   • Grafana Dashboard: http://localhost:3000"
echo "   • Prometheus: http://localhost:9090"
echo ""
echo "🔐 Login Credentials:"
echo "   • Username: admin"
echo "   • Password: admin123"
echo ""
echo "📈 Dashboard Features:"
echo "   ✅ Real-time asset inventory metrics"
echo "   ✅ Risk assessment performance indicators"
echo "   ✅ Asset criticality distribution"
echo "   ✅ Risk level and type analysis"
echo "   ✅ Business unit performance tracking"
echo "   ✅ Detailed asset and risk tables"
echo ""
echo "🔄 Auto-refresh: Dashboard updates every 30 seconds"
echo ""