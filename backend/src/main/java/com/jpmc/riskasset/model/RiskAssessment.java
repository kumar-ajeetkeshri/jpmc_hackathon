package com.jpmc.riskasset.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.time.LocalDateTime;

@Entity
@Table(name = "risk_assessments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RiskAssessment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id", nullable = false)
    @JsonBackReference
    private Asset asset;
    
    @NotNull(message = "Risk type is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RiskType riskType;
    
    @NotNull(message = "Risk level is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RiskLevel riskLevel;
    
    @Min(value = 1, message = "Probability must be between 1 and 10")
    @Max(value = 10, message = "Probability must be between 1 and 10")
    @Column(nullable = false)
    private Integer probability;
    
    @Min(value = 1, message = "Impact must be between 1 and 10")
    @Max(value = 10, message = "Impact must be between 1 and 10")
    @Column(nullable = false)
    private Integer impact;
    
    @Column(name = "risk_score")
    private Double riskScore;
    
    @Column(length = 1000)
    private String description;
    
    @Column(name = "mitigation_strategy", length = 1000)
    private String mitigationStrategy;
    
    @Column(name = "assessment_date")
    private LocalDateTime assessmentDate;
    
    @Column(name = "assessor_name")
    private String assessorName;
    
    @Column(name = "next_review_date")
    private LocalDateTime nextReviewDate;
    
    @Enumerated(EnumType.STRING)
    private AssessmentStatus status;
    
    @PrePersist
    protected void onCreate() {
        assessmentDate = LocalDateTime.now();
        calculateRiskScore();
        if (status == null) {
            status = AssessmentStatus.ACTIVE;
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        calculateRiskScore();
    }
    
    private void calculateRiskScore() {
        if (probability != null && impact != null) {
            this.riskScore = (probability * impact) / 10.0;
        }
    }
    
    public enum RiskType {
        OPERATIONAL,
        FINANCIAL,
        COMPLIANCE,
        STRATEGIC,
        REPUTATIONAL,
        TECHNOLOGY,
        MARKET,
        CREDIT,
        LIQUIDITY,
        CYBERSECURITY
    }
    
    public enum RiskLevel {
        CRITICAL,
        HIGH,
        MEDIUM,
        LOW
    }
    
    public enum AssessmentStatus {
        ACTIVE,
        UNDER_REVIEW,
        MITIGATED,
        ACCEPTED,
        TRANSFERRED
    }
}