package com.jpmc.riskasset.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "assets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Asset {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Asset name is required")
    @Column(nullable = false)
    private String name;
    
    @Column(length = 1000)
    private String description;
    
    @NotNull(message = "Asset type is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssetType type;
    
    @NotNull(message = "Asset category is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssetCategory category;
    
    @Column(name = "business_unit")
    private String businessUnit;
    
    @Column(name = "owner_name")
    private String ownerName;
    
    @Column(name = "owner_email")
    private String ownerEmail;
    
    @Column(name = "asset_value")
    private Double assetValue;
    
    @Column(name = "criticality_level")
    @Enumerated(EnumType.STRING)
    private CriticalityLevel criticalityLevel;
    
    @Column(name = "created_date")
    private LocalDateTime createdDate;
    
    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;
    
    @OneToMany(mappedBy = "asset", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<RiskAssessment> riskAssessments;
    
    @PrePersist
    protected void onCreate() {
        createdDate = LocalDateTime.now();
        lastUpdated = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        lastUpdated = LocalDateTime.now();
    }
    
    public enum AssetType {
        IT_INFRASTRUCTURE,
        SOFTWARE_APPLICATION,
        DATABASE,
        NETWORK_EQUIPMENT,
        FINANCIAL_INSTRUMENT,
        PHYSICAL_ASSET,
        INTELLECTUAL_PROPERTY,
        HUMAN_RESOURCE
    }
    
    public enum AssetCategory {
        CRITICAL,
        HIGH,
        MEDIUM,
        LOW
    }
    
    public enum CriticalityLevel {
        CRITICAL,
        HIGH,
        MEDIUM,
        LOW
    }
}