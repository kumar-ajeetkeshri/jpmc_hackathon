package com.jpmc.riskasset.service;

import com.jpmc.riskasset.model.RiskAssessment;
import com.jpmc.riskasset.repository.RiskAssessmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class RiskAssessmentService {
    
    private final RiskAssessmentRepository riskAssessmentRepository;
    
    public List<RiskAssessment> getAllRiskAssessments() {
        log.debug("Fetching all risk assessments");
        return riskAssessmentRepository.findAll();
    }
    
    public Optional<RiskAssessment> getRiskAssessmentById(Long id) {
        log.debug("Fetching risk assessment with id: {}", id);
        return riskAssessmentRepository.findById(id);
    }
    
    public RiskAssessment createRiskAssessment(RiskAssessment riskAssessment) {
        log.debug("Creating new risk assessment for asset: {}", riskAssessment.getAsset().getId());
        return riskAssessmentRepository.save(riskAssessment);
    }
    
    public RiskAssessment updateRiskAssessment(Long id, RiskAssessment assessmentDetails) {
        log.debug("Updating risk assessment with id: {}", id);
        return riskAssessmentRepository.findById(id)
                .map(assessment -> {
                    assessment.setRiskType(assessmentDetails.getRiskType());
                    assessment.setRiskLevel(assessmentDetails.getRiskLevel());
                    assessment.setProbability(assessmentDetails.getProbability());
                    assessment.setImpact(assessmentDetails.getImpact());
                    assessment.setDescription(assessmentDetails.getDescription());
                    assessment.setMitigationStrategy(assessmentDetails.getMitigationStrategy());
                    assessment.setAssessorName(assessmentDetails.getAssessorName());
                    assessment.setNextReviewDate(assessmentDetails.getNextReviewDate());
                    assessment.setStatus(assessmentDetails.getStatus());
                    return riskAssessmentRepository.save(assessment);
                })
                .orElseThrow(() -> new RuntimeException("Risk assessment not found with id: " + id));
    }
    
    public void deleteRiskAssessment(Long id) {
        log.debug("Deleting risk assessment with id: {}", id);
        riskAssessmentRepository.deleteById(id);
    }
    
    public List<RiskAssessment> getRiskAssessmentsByAssetId(Long assetId) {
        log.debug("Fetching risk assessments for asset: {}", assetId);
        return riskAssessmentRepository.findByAssetId(assetId);
    }
    
    public List<RiskAssessment> getRiskAssessmentsByType(RiskAssessment.RiskType riskType) {
        log.debug("Fetching risk assessments by type: {}", riskType);
        return riskAssessmentRepository.findByRiskType(riskType);
    }
    
    public List<RiskAssessment> getRiskAssessmentsByLevel(RiskAssessment.RiskLevel riskLevel) {
        log.debug("Fetching risk assessments by level: {}", riskLevel);
        return riskAssessmentRepository.findByRiskLevel(riskLevel);
    }
    
    public List<RiskAssessment> getRiskAssessmentsByStatus(RiskAssessment.AssessmentStatus status) {
        log.debug("Fetching risk assessments by status: {}", status);
        return riskAssessmentRepository.findByStatus(status);
    }
    
    public List<RiskAssessment> getRiskAssessmentsByScoreRange(Double minScore, Double maxScore) {
        log.debug("Fetching risk assessments by score range: {} - {}", minScore, maxScore);
        return riskAssessmentRepository.findByRiskScoreBetween(minScore, maxScore);
    }
    
    public List<RiskAssessment> getAssessmentsDueForReview() {
        log.debug("Fetching assessments due for review");
        return riskAssessmentRepository.findAssessmentsDueForReview(LocalDateTime.now());
    }
    
    public Long getRiskAssessmentCountByLevel(RiskAssessment.RiskLevel level) {
        return riskAssessmentRepository.countByRiskLevel(level);
    }
    
    public Double getAverageRiskScoreByAsset(Long assetId) {
        return riskAssessmentRepository.getAverageRiskScoreByAsset(assetId);
    }
    
    public List<RiskAssessment> getRiskAssessmentsByBusinessUnit(String businessUnit) {
        log.debug("Fetching risk assessments by business unit: {}", businessUnit);
        return riskAssessmentRepository.findByBusinessUnit(businessUnit);
    }
}