package com.jpmc.riskasset.controller;

import com.jpmc.riskasset.model.Asset;
import com.jpmc.riskasset.service.AssetService;
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
@RequestMapping("/assets")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "Asset Management", description = "APIs for managing risk assets")
public class AssetController {
    
    private final AssetService assetService;
    
    @GetMapping
    @Operation(summary = "Get all assets", description = "Retrieve a list of all assets in the inventory")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved assets")
    public ResponseEntity<List<Asset>> getAllAssets() {
        List<Asset> assets = assetService.getAllAssets();
        return ResponseEntity.ok(assets);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get asset by ID", description = "Retrieve a specific asset by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Asset found"),
        @ApiResponse(responseCode = "404", description = "Asset not found")
    })
    public ResponseEntity<Asset> getAssetById(
            @Parameter(description = "Asset ID") @PathVariable Long id) {
        Optional<Asset> asset = assetService.getAssetById(id);
        return asset.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    @Operation(summary = "Create new asset", description = "Create a new asset in the inventory")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Asset created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    public ResponseEntity<Asset> createAsset(@Valid @RequestBody Asset asset) {
        Asset createdAsset = assetService.createAsset(asset);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAsset);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update asset", description = "Update an existing asset")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Asset updated successfully"),
        @ApiResponse(responseCode = "404", description = "Asset not found"),
        @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    public ResponseEntity<Asset> updateAsset(
            @Parameter(description = "Asset ID") @PathVariable Long id,
            @Valid @RequestBody Asset assetDetails) {
        try {
            Asset updatedAsset = assetService.updateAsset(id, assetDetails);
            return ResponseEntity.ok(updatedAsset);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete asset", description = "Delete an asset from the inventory")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Asset deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Asset not found")
    })
    public ResponseEntity<Void> deleteAsset(
            @Parameter(description = "Asset ID") @PathVariable Long id) {
        assetService.deleteAsset(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/type/{type}")
    @Operation(summary = "Get assets by type", description = "Retrieve assets filtered by type")
    public ResponseEntity<List<Asset>> getAssetsByType(
            @Parameter(description = "Asset type") @PathVariable Asset.AssetType type) {
        List<Asset> assets = assetService.getAssetsByType(type);
        return ResponseEntity.ok(assets);
    }
    
    @GetMapping("/category/{category}")
    @Operation(summary = "Get assets by category", description = "Retrieve assets filtered by category")
    public ResponseEntity<List<Asset>> getAssetsByCategory(
            @Parameter(description = "Asset category") @PathVariable Asset.AssetCategory category) {
        List<Asset> assets = assetService.getAssetsByCategory(category);
        return ResponseEntity.ok(assets);
    }
    
    @GetMapping("/criticality/{level}")
    @Operation(summary = "Get assets by criticality level", description = "Retrieve assets filtered by criticality level")
    public ResponseEntity<List<Asset>> getAssetsByCriticalityLevel(
            @Parameter(description = "Criticality level") @PathVariable Asset.CriticalityLevel level) {
        List<Asset> assets = assetService.getAssetsByCriticalityLevel(level);
        return ResponseEntity.ok(assets);
    }
    
    @GetMapping("/business-unit/{businessUnit}")
    @Operation(summary = "Get assets by business unit", description = "Retrieve assets filtered by business unit")
    public ResponseEntity<List<Asset>> getAssetsByBusinessUnit(
            @Parameter(description = "Business unit name") @PathVariable String businessUnit) {
        List<Asset> assets = assetService.getAssetsByBusinessUnit(businessUnit);
        return ResponseEntity.ok(assets);
    }
    
    @GetMapping("/search")
    @Operation(summary = "Search assets by name", description = "Search assets by name containing the specified text")
    public ResponseEntity<List<Asset>> searchAssetsByName(
            @Parameter(description = "Search term") @RequestParam String name) {
        List<Asset> assets = assetService.searchAssetsByName(name);
        return ResponseEntity.ok(assets);
    }
    
    @GetMapping("/value-range")
    @Operation(summary = "Get assets by value range", description = "Retrieve assets within a specified value range")
    public ResponseEntity<List<Asset>> getAssetsByValueRange(
            @Parameter(description = "Minimum value") @RequestParam Double minValue,
            @Parameter(description = "Maximum value") @RequestParam Double maxValue) {
        List<Asset> assets = assetService.getAssetsByValueRange(minValue, maxValue);
        return ResponseEntity.ok(assets);
    }
}