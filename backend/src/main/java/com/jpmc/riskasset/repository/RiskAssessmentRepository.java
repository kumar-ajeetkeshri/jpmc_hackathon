package com.jpmc.riskasset.repository;

import com.jpmc.riskasset.model.RiskAssessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RiskAssessmentRepository extends JpaRepository<RiskAssessment, Long> {
    
    List<RiskAssessment> findByAssetId(Long assetId);
    
    List<RiskAssessment> findByRiskType(RiskAssessment.RiskType riskType);
    
    List<RiskAssessment> findByRiskLevel(RiskAssessment.RiskLevel riskLevel);
    
    List<RiskAssessment> findByStatus(RiskAssessment.AssessmentStatus status);
    
    @Query("SELECT r FROM RiskAssessment r WHERE r.riskScore >= :minScore AND r.riskScore <= :maxScore")
    List<RiskAssessment> findByRiskScoreBetween(@Param("minScore") Double minScore, @Param("maxScore") Double maxScore);
    
    @Query("SELECT r FROM RiskAssessment r WHERE r.nextReviewDate <= :date")
    List<RiskAssessment> findAssessmentsDueForReview(@Param("date") LocalDateTime date);
    
    @Query("SELECT COUNT(r) FROM RiskAssessment r WHERE r.riskLevel = :level")
    Long countByRiskLevel(@Param("level") RiskAssessment.RiskLevel level);
    
    @Query("SELECT AVG(r.riskScore) FROM RiskAssessment r WHERE r.asset.id = :assetId")
    Double getAverageRiskScoreByAsset(@Param("assetId") Long assetId);
    
    @Query("SELECT r FROM RiskAssessment r WHERE r.asset.businessUnit = :businessUnit")
    List<RiskAssessment> findByBusinessUnit(@Param("businessUnit") String businessUnit);
}