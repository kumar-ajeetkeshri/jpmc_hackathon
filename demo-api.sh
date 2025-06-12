#!/bin/bash

echo "=== JPMC Risk Asset Management API Demo ==="
echo ""

echo "1. 📊 Dashboard Statistics:"
curl -s http://localhost:12001/api/dashboard/stats | jq '.'
echo ""

echo "2. 🏢 All Assets (first 2):"
curl -s http://localhost:12001/api/assets | jq '.[0:2] | .[] | {id, name, type, criticalityLevel, businessUnit}'
echo ""

echo "3. ⚠️ Critical Risk Assessments:"
curl -s http://localhost:12001/api/risk-assessments/level/CRITICAL | jq '.[] | {id, riskType, riskLevel, riskScore, description}'
echo ""

echo "4. 🔍 Software Application Assets:"
curl -s http://localhost:12001/api/assets/type/SOFTWARE_APPLICATION | jq '.[] | {id, name, assetValue, ownerName}'
echo ""

echo "5. 📈 Risk Distribution:"
curl -s http://localhost:12001/api/dashboard/risk-distribution | jq '.'
echo ""

echo "=== API Demo Complete ==="