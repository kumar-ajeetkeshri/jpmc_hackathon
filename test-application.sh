#!/bin/bash

echo "=== JPMC Risk Asset Management System ==="
echo ""
echo "🚀 Application Status:"
echo ""

# Check backend
echo "📊 Backend API (Spring Boot):"
if curl -s http://localhost:12001/api/assets > /dev/null; then
    echo "   ✅ Backend is running on http://localhost:12001"
    echo "   📈 Sample API call - Asset count: $(curl -s http://localhost:12001/api/assets | jq length)"
else
    echo "   ❌ Backend is not responding"
fi

echo ""

# Check frontend
echo "🎨 Frontend UI (React):"
if curl -s http://localhost:12000 > /dev/null; then
    echo "   ✅ Frontend is running on http://localhost:12000"
else
    echo "   ❌ Frontend is not responding"
fi

echo ""

# Check Swagger
echo "📚 API Documentation (Swagger):"
if curl -s http://localhost:12001/api/api-docs > /dev/null; then
    echo "   ✅ Swagger docs available at http://localhost:12001/api/swagger-ui.html"
else
    echo "   ❌ Swagger documentation is not available"
fi

echo ""
echo "🔗 Access URLs:"
echo "   • Frontend Dashboard: https://work-1-ipizlxbbppnfocgs.prod-runtime.all-hands.dev"
echo "   • Backend API: https://work-2-ipizlxbbppnfocgs.prod-runtime.all-hands.dev"
echo "   • Swagger UI: https://work-2-ipizlxbbppnfocgs.prod-runtime.all-hands.dev/swagger-ui.html"
echo ""

echo "📊 Sample Data Summary:"
echo "   • Assets: $(curl -s http://localhost:12001/api/dashboard/stats | jq '.assets.total')"
echo "   • Risk Assessments: $(curl -s http://localhost:12001/api/dashboard/stats | jq '.risks.total')"
echo "   • Critical Risks: $(curl -s http://localhost:12001/api/dashboard/stats | jq '.risks.critical')"
echo ""

echo "🎯 Key Features:"
echo "   ✅ Asset Inventory Management"
echo "   ✅ Risk Assessment Creation & Tracking"
echo "   ✅ Interactive Dashboard with Charts"
echo "   ✅ Advanced Filtering & Search"
echo "   ✅ REST API with Swagger Documentation"
echo "   ✅ Responsive Material-UI Design"
echo ""

echo "🛠️ Technology Stack:"
echo "   • Backend: Java 17 + Spring Boot 3.2.0"
echo "   • Frontend: React 18 + Material-UI"
echo "   • Database: H2 (in-memory)"
echo "   • API Docs: OpenAPI 3 / Swagger"
echo "   • Charts: Recharts"
echo ""