package com.jpmc.riskasset.controller;

import com.jpmc.riskasset.model.Asset;
import com.jpmc.riskasset.model.RiskAssessment;
import com.jpmc.riskasset.service.AssetService;
import com.jpmc.riskasset.service.RiskAssessmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "Dashboard Analytics", description = "APIs for dashboard analytics and statistics")
public class DashboardController {
    
    private final AssetService assetService;
    private final RiskAssessmentService riskAssessmentService;
    
    @GetMapping("/stats")
    @Operation(summary = "Get dashboard statistics", description = "Retrieve overall statistics for the dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        // Asset statistics
        Map<String, Object> assetStats = new HashMap<>();
        assetStats.put("total", assetService.getAllAssets().size());
        assetStats.put("critical", assetService.getAssetCountByCriticalityLevel(Asset.CriticalityLevel.CRITICAL));
        assetStats.put("high", assetService.getAssetCountByCriticalityLevel(Asset.CriticalityLevel.HIGH));
        assetStats.put("medium", assetService.getAssetCountByCriticalityLevel(Asset.CriticalityLevel.MEDIUM));
        assetStats.put("low", assetService.getAssetCountByCriticalityLevel(Asset.CriticalityLevel.LOW));
        
        // Asset type distribution
        Map<String, Long> assetTypeDistribution = new HashMap<>();
        for (Asset.AssetType type : Asset.AssetType.values()) {
            assetTypeDistribution.put(type.name(), assetService.getAssetCountByType(type));
        }
        assetStats.put("typeDistribution", assetTypeDistribution);
        
        // Risk assessment statistics
        Map<String, Object> riskStats = new HashMap<>();
        riskStats.put("total", riskAssessmentService.getAllRiskAssessments().size());
        riskStats.put("critical", riskAssessmentService.getRiskAssessmentCountByLevel(RiskAssessment.RiskLevel.CRITICAL));
        riskStats.put("high", riskAssessmentService.getRiskAssessmentCountByLevel(RiskAssessment.RiskLevel.HIGH));
        riskStats.put("medium", riskAssessmentService.getRiskAssessmentCountByLevel(RiskAssessment.RiskLevel.MEDIUM));
        riskStats.put("low", riskAssessmentService.getRiskAssessmentCountByLevel(RiskAssessment.RiskLevel.LOW));
        riskStats.put("dueForReview", riskAssessmentService.getAssessmentsDueForReview().size());
        
        stats.put("assets", assetStats);
        stats.put("risks", riskStats);
        
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/risk-distribution")
    @Operation(summary = "Get risk distribution", description = "Retrieve risk distribution across different categories")
    public ResponseEntity<Map<String, Object>> getRiskDistribution() {
        Map<String, Object> distribution = new HashMap<>();
        
        // Risk type distribution
        Map<String, Integer> riskTypeDistribution = new HashMap<>();
        for (RiskAssessment.RiskType type : RiskAssessment.RiskType.values()) {
            riskTypeDistribution.put(type.name(), riskAssessmentService.getRiskAssessmentsByType(type).size());
        }
        
        // Risk level distribution
        Map<String, Long> riskLevelDistribution = new HashMap<>();
        for (RiskAssessment.RiskLevel level : RiskAssessment.RiskLevel.values()) {
            riskLevelDistribution.put(level.name(), riskAssessmentService.getRiskAssessmentCountByLevel(level));
        }
        
        distribution.put("byType", riskTypeDistribution);
        distribution.put("byLevel", riskLevelDistribution);
        
        return ResponseEntity.ok(distribution);
    }
    
    @GetMapping("/asset-distribution")
    @Operation(summary = "Get asset distribution", description = "Retrieve asset distribution across different categories")
    public ResponseEntity<Map<String, Object>> getAssetDistribution() {
        Map<String, Object> distribution = new HashMap<>();
        
        // Asset type distribution
        Map<String, Long> assetTypeDistribution = new HashMap<>();
        for (Asset.AssetType type : Asset.AssetType.values()) {
            assetTypeDistribution.put(type.name(), assetService.getAssetCountByType(type));
        }
        
        // Asset criticality distribution
        Map<String, Long> criticalityDistribution = new HashMap<>();
        for (Asset.CriticalityLevel level : Asset.CriticalityLevel.values()) {
            criticalityDistribution.put(level.name(), assetService.getAssetCountByCriticalityLevel(level));
        }
        
        distribution.put("byType", assetTypeDistribution);
        distribution.put("byCriticality", criticalityDistribution);
        
        return ResponseEntity.ok(distribution);
    }
}