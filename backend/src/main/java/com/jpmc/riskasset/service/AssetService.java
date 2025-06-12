package com.jpmc.riskasset.service;

import com.jpmc.riskasset.model.Asset;
import com.jpmc.riskasset.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AssetService {
    
    private final AssetRepository assetRepository;
    
    public List<Asset> getAllAssets() {
        log.debug("Fetching all assets");
        return assetRepository.findAll();
    }
    
    public Optional<Asset> getAssetById(Long id) {
        log.debug("Fetching asset with id: {}", id);
        return assetRepository.findById(id);
    }
    
    public Asset createAsset(Asset asset) {
        log.debug("Creating new asset: {}", asset.getName());
        return assetRepository.save(asset);
    }
    
    public Asset updateAsset(Long id, Asset assetDetails) {
        log.debug("Updating asset with id: {}", id);
        return assetRepository.findById(id)
                .map(asset -> {
                    asset.setName(assetDetails.getName());
                    asset.setDescription(assetDetails.getDescription());
                    asset.setType(assetDetails.getType());
                    asset.setCategory(assetDetails.getCategory());
                    asset.setBusinessUnit(assetDetails.getBusinessUnit());
                    asset.setOwnerName(assetDetails.getOwnerName());
                    asset.setOwnerEmail(assetDetails.getOwnerEmail());
                    asset.setAssetValue(assetDetails.getAssetValue());
                    asset.setCriticalityLevel(assetDetails.getCriticalityLevel());
                    return assetRepository.save(asset);
                })
                .orElseThrow(() -> new RuntimeException("Asset not found with id: " + id));
    }
    
    public void deleteAsset(Long id) {
        log.debug("Deleting asset with id: {}", id);
        assetRepository.deleteById(id);
    }
    
    public List<Asset> getAssetsByType(Asset.AssetType type) {
        log.debug("Fetching assets by type: {}", type);
        return assetRepository.findByType(type);
    }
    
    public List<Asset> getAssetsByCategory(Asset.AssetCategory category) {
        log.debug("Fetching assets by category: {}", category);
        return assetRepository.findByCategory(category);
    }
    
    public List<Asset> getAssetsByCriticalityLevel(Asset.CriticalityLevel criticalityLevel) {
        log.debug("Fetching assets by criticality level: {}", criticalityLevel);
        return assetRepository.findByCriticalityLevel(criticalityLevel);
    }
    
    public List<Asset> getAssetsByBusinessUnit(String businessUnit) {
        log.debug("Fetching assets by business unit: {}", businessUnit);
        return assetRepository.findByBusinessUnit(businessUnit);
    }
    
    public List<Asset> searchAssetsByName(String name) {
        log.debug("Searching assets by name: {}", name);
        return assetRepository.findByNameContaining(name);
    }
    
    public List<Asset> getAssetsByValueRange(Double minValue, Double maxValue) {
        log.debug("Fetching assets by value range: {} - {}", minValue, maxValue);
        return assetRepository.findByAssetValueBetween(minValue, maxValue);
    }
    
    public Long getAssetCountByType(Asset.AssetType type) {
        return assetRepository.countByType(type);
    }
    
    public Long getAssetCountByCriticalityLevel(Asset.CriticalityLevel level) {
        return assetRepository.countByCriticalityLevel(level);
    }
}