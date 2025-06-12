package com.jpmc.riskasset.controller;

import com.jpmc.riskasset.model.RiskAssessment;
import com.jpmc.riskasset.service.RiskAssessmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/risk-assessments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "Risk Assessment Management", description = "APIs for managing risk assessments")
public class RiskAssessmentController {
    
    private final RiskAssessmentService riskAssessmentService;
    
    @GetMapping
    @Operation(summary = "Get all risk assessments", description = "Retrieve a list of all risk assessments")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved risk assessments")
    public ResponseEntity<List<RiskAssessment>> getAllRiskAssessments() {
        List<RiskAssessment> assessments = riskAssessmentService.getAllRiskAssessments();
        return ResponseEntity.ok(assessments);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get risk assessment by ID", description = "Retrieve a specific risk assessment by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Risk assessment found"),
        @ApiResponse(responseCode = "404", description = "Risk assessment not found")
    })
    public ResponseEntity<RiskAssessment> getRiskAssessmentById(
            @Parameter(description = "Risk assessment ID") @PathVariable Long id) {
        Optional<RiskAssessment> assessment = riskAssessmentService.getRiskAssessmentById(id);
        return assessment.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    @Operation(summary = "Create new risk assessment", description = "Create a new risk assessment")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Risk assessment created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    public ResponseEntity<RiskAssessment> createRiskAssessment(@Valid @RequestBody RiskAssessment riskAssessment) {
        RiskAssessment createdAssessment = riskAssessmentService.createRiskAssessment(riskAssessment);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAssessment);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update risk assessment", description = "Update an existing risk assessment")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Risk assessment updated successfully"),
        @ApiResponse(responseCode = "404", description = "Risk assessment not found"),
        @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    public ResponseEntity<RiskAssessment> updateRiskAssessment(
            @Parameter(description = "Risk assessment ID") @PathVariable Long id,
            @Valid @RequestBody RiskAssessment assessmentDetails) {
        try {
            RiskAssessment updatedAssessment = riskAssessmentService.updateRiskAssessment(id, assessmentDetails);
            return ResponseEntity.ok(updatedAssessment);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete risk assessment", description = "Delete a risk assessment")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Risk assessment deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Risk assessment not found")
    })
    public ResponseEntity<Void> deleteRiskAssessment(
            @Parameter(description = "Risk assessment ID") @PathVariable Long id) {
        riskAssessmentService.deleteRiskAssessment(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/asset/{assetId}")
    @Operation(summary = "Get risk assessments by asset", description = "Retrieve risk assessments for a specific asset")
    public ResponseEntity<List<RiskAssessment>> getRiskAssessmentsByAssetId(
            @Parameter(description = "Asset ID") @PathVariable Long assetId) {
        List<RiskAssessment> assessments = riskAssessmentService.getRiskAssessmentsByAssetId(assetId);
        return ResponseEntity.ok(assessments);
    }
    
    @GetMapping("/type/{type}")
    @Operation(summary = "Get risk assessments by type", description = "Retrieve risk assessments filtered by risk type")
    public ResponseEntity<List<RiskAssessment>> getRiskAssessmentsByType(
            @Parameter(description = "Risk type") @PathVariable RiskAssessment.RiskType type) {
        List<RiskAssessment> assessments = riskAssessmentService.getRiskAssessmentsByType(type);
        return ResponseEntity.ok(assessments);
    }
    
    @GetMapping("/level/{level}")
    @Operation(summary = "Get risk assessments by level", description = "Retrieve risk assessments filtered by risk level")
    public ResponseEntity<List<RiskAssessment>> getRiskAssessmentsByLevel(
            @Parameter(description = "Risk level") @PathVariable RiskAssessment.RiskLevel level) {
        List<RiskAssessment> assessments = riskAssessmentService.getRiskAssessmentsByLevel(level);
        return ResponseEntity.ok(assessments);
    }
    
    @GetMapping("/status/{status}")
    @Operation(summary = "Get risk assessments by status", description = "Retrieve risk assessments filtered by status")
    public ResponseEntity<List<RiskAssessment>> getRiskAssessmentsByStatus(
            @Parameter(description = "Assessment status") @PathVariable RiskAssessment.AssessmentStatus status) {
        List<RiskAssessment> assessments = riskAssessmentService.getRiskAssessmentsByStatus(status);
        return ResponseEntity.ok(assessments);
    }
    
    @GetMapping("/score-range")
    @Operation(summary = "Get risk assessments by score range", description = "Retrieve risk assessments within a specified score range")
    public ResponseEntity<List<RiskAssessment>> getRiskAssessmentsByScoreRange(
            @Parameter(description = "Minimum score") @RequestParam Double minScore,
            @Parameter(description = "Maximum score") @RequestParam Double maxScore) {
        List<RiskAssessment> assessments = riskAssessmentService.getRiskAssessmentsByScoreRange(minScore, maxScore);
        return ResponseEntity.ok(assessments);
    }
    
    @GetMapping("/due-for-review")
    @Operation(summary = "Get assessments due for review", description = "Retrieve risk assessments that are due for review")
    public ResponseEntity<List<RiskAssessment>> getAssessmentsDueForReview() {
        List<RiskAssessment> assessments = riskAssessmentService.getAssessmentsDueForReview();
        return ResponseEntity.ok(assessments);
    }
    
    @GetMapping("/business-unit/{businessUnit}")
    @Operation(summary = "Get risk assessments by business unit", description = "Retrieve risk assessments filtered by business unit")
    public ResponseEntity<List<RiskAssessment>> getRiskAssessmentsByBusinessUnit(
            @Parameter(description = "Business unit name") @PathVariable String businessUnit) {
        List<RiskAssessment> assessments = riskAssessmentService.getRiskAssessmentsByBusinessUnit(businessUnit);
        return ResponseEntity.ok(assessments);
    }
}