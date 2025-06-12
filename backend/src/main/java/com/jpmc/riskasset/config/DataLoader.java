package com.jpmc.riskasset.config;

import com.jpmc.riskasset.model.Asset;
import com.jpmc.riskasset.model.RiskAssessment;
import com.jpmc.riskasset.repository.AssetRepository;
import com.jpmc.riskasset.repository.RiskAssessmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements CommandLineRunner {

    private final AssetRepository assetRepository;
    private final RiskAssessmentRepository riskAssessmentRepository;

    @Override
    public void run(String... args) throws Exception {
        if (assetRepository.count() == 0) {
            loadSampleData();
        }
    }

    private void loadSampleData() {
        log.info("Loading sample data...");

        // Create sample assets
        Asset asset1 = createAsset("Core Banking System", "Primary banking application handling customer transactions",
                Asset.AssetType.SOFTWARE_APPLICATION, Asset.AssetCategory.CRITICAL, "Retail Banking",
                "John Smith", "john.smith@jpmc.com", 50000000.0, Asset.CriticalityLevel.CRITICAL);

        Asset asset2 = createAsset("Customer Database", "Main customer information database",
                Asset.AssetType.DATABASE, Asset.AssetCategory.CRITICAL, "Data Management",
                "Sarah Johnson", "sarah.johnson@jpmc.com", 25000000.0, Asset.CriticalityLevel.CRITICAL);

        Asset asset3 = createAsset("Trading Platform", "Electronic trading system for securities",
                Asset.AssetType.SOFTWARE_APPLICATION, Asset.AssetCategory.HIGH, "Investment Banking",
                "Mike Chen", "mike.chen@jpmc.com", 30000000.0, Asset.CriticalityLevel.HIGH);

        Asset asset4 = createAsset("Network Infrastructure", "Core network equipment and infrastructure",
                Asset.AssetType.NETWORK_EQUIPMENT, Asset.AssetCategory.HIGH, "IT Operations",
                "Lisa Brown", "lisa.brown@jpmc.com", 15000000.0, Asset.CriticalityLevel.HIGH);

        Asset asset5 = createAsset("Risk Management System", "System for monitoring and managing risks",
                Asset.AssetType.SOFTWARE_APPLICATION, Asset.AssetCategory.HIGH, "Risk Management",
                "David Wilson", "david.wilson@jpmc.com", 20000000.0, Asset.CriticalityLevel.HIGH);

        Asset asset6 = createAsset("ATM Network", "Automated teller machine network",
                Asset.AssetType.PHYSICAL_ASSET, Asset.AssetCategory.MEDIUM, "Retail Banking",
                "Emma Davis", "emma.davis@jpmc.com", 10000000.0, Asset.CriticalityLevel.MEDIUM);

        Asset asset7 = createAsset("Mobile Banking App", "Customer mobile banking application",
                Asset.AssetType.SOFTWARE_APPLICATION, Asset.AssetCategory.MEDIUM, "Digital Banking",
                "Alex Rodriguez", "alex.rodriguez@jpmc.com", 8000000.0, Asset.CriticalityLevel.MEDIUM);

        Asset asset8 = createAsset("Backup Systems", "Disaster recovery and backup infrastructure",
                Asset.AssetType.IT_INFRASTRUCTURE, Asset.AssetCategory.MEDIUM, "IT Operations",
                "Jennifer Lee", "jennifer.lee@jpmc.com", 12000000.0, Asset.CriticalityLevel.MEDIUM);

        // Save assets
        asset1 = assetRepository.save(asset1);
        asset2 = assetRepository.save(asset2);
        asset3 = assetRepository.save(asset3);
        asset4 = assetRepository.save(asset4);
        asset5 = assetRepository.save(asset5);
        asset6 = assetRepository.save(asset6);
        asset7 = assetRepository.save(asset7);
        asset8 = assetRepository.save(asset8);

        // Create sample risk assessments
        createRiskAssessment(asset1, RiskAssessment.RiskType.CYBERSECURITY, RiskAssessment.RiskLevel.HIGH,
                7, 9, "Potential cyber attacks on core banking system",
                "Implement advanced threat detection and regular security audits", "Security Team");

        createRiskAssessment(asset1, RiskAssessment.RiskType.OPERATIONAL, RiskAssessment.RiskLevel.MEDIUM,
                5, 8, "System downtime during peak hours",
                "Implement redundancy and load balancing", "Operations Team");

        createRiskAssessment(asset2, RiskAssessment.RiskType.COMPLIANCE, RiskAssessment.RiskLevel.HIGH,
                6, 9, "Data privacy regulation compliance risk",
                "Regular compliance audits and data encryption", "Compliance Team");

        createRiskAssessment(asset2, RiskAssessment.RiskType.CYBERSECURITY, RiskAssessment.RiskLevel.CRITICAL,
                8, 10, "Data breach risk for customer information",
                "Multi-layer security controls and access monitoring", "Security Team");

        createRiskAssessment(asset3, RiskAssessment.RiskType.MARKET, RiskAssessment.RiskLevel.HIGH,
                7, 8, "Market volatility affecting trading operations",
                "Implement circuit breakers and risk limits", "Risk Team");

        createRiskAssessment(asset3, RiskAssessment.RiskType.TECHNOLOGY, RiskAssessment.RiskLevel.MEDIUM,
                5, 7, "System latency during high volume trading",
                "Upgrade hardware and optimize algorithms", "Technology Team");

        createRiskAssessment(asset4, RiskAssessment.RiskType.OPERATIONAL, RiskAssessment.RiskLevel.MEDIUM,
                6, 7, "Network infrastructure failure",
                "Redundant network paths and monitoring", "Network Team");

        createRiskAssessment(asset5, RiskAssessment.RiskType.STRATEGIC, RiskAssessment.RiskLevel.HIGH,
                6, 8, "Inadequate risk monitoring capabilities",
                "Enhance risk analytics and reporting", "Risk Team");

        log.info("Sample data loaded successfully!");
    }

    private Asset createAsset(String name, String description, Asset.AssetType type, Asset.AssetCategory category,
                             String businessUnit, String ownerName, String ownerEmail, Double assetValue,
                             Asset.CriticalityLevel criticalityLevel) {
        Asset asset = new Asset();
        asset.setName(name);
        asset.setDescription(description);
        asset.setType(type);
        asset.setCategory(category);
        asset.setBusinessUnit(businessUnit);
        asset.setOwnerName(ownerName);
        asset.setOwnerEmail(ownerEmail);
        asset.setAssetValue(assetValue);
        asset.setCriticalityLevel(criticalityLevel);
        return asset;
    }

    private void createRiskAssessment(Asset asset, RiskAssessment.RiskType riskType, RiskAssessment.RiskLevel riskLevel,
                                     Integer probability, Integer impact, String description, String mitigationStrategy,
                                     String assessorName) {
        RiskAssessment assessment = new RiskAssessment();
        assessment.setAsset(asset);
        assessment.setRiskType(riskType);
        assessment.setRiskLevel(riskLevel);
        assessment.setProbability(probability);
        assessment.setImpact(impact);
        assessment.setDescription(description);
        assessment.setMitigationStrategy(mitigationStrategy);
        assessment.setAssessorName(assessorName);
        assessment.setNextReviewDate(LocalDateTime.now().plusMonths(3));
        assessment.setStatus(RiskAssessment.AssessmentStatus.ACTIVE);
        
        riskAssessmentRepository.save(assessment);
    }
}