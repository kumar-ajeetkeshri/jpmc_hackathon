package com.jpmc.riskasset.repository;

import com.jpmc.riskasset.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
    
    List<Asset> findByType(Asset.AssetType type);
    
    List<Asset> findByCategory(Asset.AssetCategory category);
    
    List<Asset> findByCriticalityLevel(Asset.CriticalityLevel criticalityLevel);
    
    List<Asset> findByBusinessUnit(String businessUnit);
    
    List<Asset> findByOwnerEmail(String ownerEmail);
    
    @Query("SELECT a FROM Asset a WHERE a.name LIKE %:name%")
    List<Asset> findByNameContaining(@Param("name") String name);
    
    @Query("SELECT a FROM Asset a WHERE a.assetValue >= :minValue AND a.assetValue <= :maxValue")
    List<Asset> findByAssetValueBetween(@Param("minValue") Double minValue, @Param("maxValue") Double maxValue);
    
    @Query("SELECT COUNT(a) FROM Asset a WHERE a.type = :type")
    Long countByType(@Param("type") Asset.AssetType type);
    
    @Query("SELECT COUNT(a) FROM Asset a WHERE a.criticalityLevel = :level")
    Long countByCriticalityLevel(@Param("level") Asset.CriticalityLevel level);
}