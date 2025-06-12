-- Sample Assets
INSERT INTO assets (name, description, type, category, business_unit, owner_name, owner_email, asset_value, criticality_level, created_date, last_updated) VALUES
('Core Banking System', 'Primary banking application handling customer transactions', 'SOFTWARE_APPLICATION', 'CRITICAL', 'Retail Banking', 'John Smith', 'john.smith@jpmc.com', 50000000.0, 'CRITICAL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Customer Database', 'Main customer information database', 'DATABASE', 'CRITICAL', 'Data Management', 'Sarah Johnson', 'sarah.johnson@jpmc.com', 25000000.0, 'CRITICAL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Trading Platform', 'Electronic trading system for securities', 'SOFTWARE_APPLICATION', 'HIGH', 'Investment Banking', 'Mike Chen', 'mike.chen@jpmc.com', 30000000.0, 'HIGH', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Network Infrastructure', 'Core network equipment and infrastructure', 'NETWORK_EQUIPMENT', 'HIGH', 'IT Operations', 'Lisa Brown', 'lisa.brown@jpmc.com', 15000000.0, 'HIGH', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Risk Management System', 'System for monitoring and managing risks', 'SOFTWARE_APPLICATION', 'HIGH', 'Risk Management', 'David Wilson', 'david.wilson@jpmc.com', 20000000.0, 'HIGH', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ATM Network', 'Automated teller machine network', 'PHYSICAL_ASSET', 'MEDIUM', 'Retail Banking', 'Emma Davis', 'emma.davis@jpmc.com', 10000000.0, 'MEDIUM', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Mobile Banking App', 'Customer mobile banking application', 'SOFTWARE_APPLICATION', 'MEDIUM', 'Digital Banking', 'Alex Rodriguez', 'alex.rodriguez@jpmc.com', 8000000.0, 'MEDIUM', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Backup Systems', 'Disaster recovery and backup infrastructure', 'IT_INFRASTRUCTURE', 'MEDIUM', 'IT Operations', 'Jennifer Lee', 'jennifer.lee@jpmc.com', 12000000.0, 'MEDIUM', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Sample Risk Assessments
INSERT INTO risk_assessments (asset_id, risk_type, risk_level, probability, impact, description, mitigation_strategy, assessment_date, assessor_name, next_review_date, status) VALUES
(1, 'CYBERSECURITY', 'HIGH', 7, 9, 'Potential cyber attacks on core banking system', 'Implement advanced threat detection and regular security audits', CURRENT_TIMESTAMP, 'Security Team', DATEADD('MONTH', 3, CURRENT_TIMESTAMP), 'ACTIVE'),
(1, 'OPERATIONAL', 'MEDIUM', 5, 8, 'System downtime during peak hours', 'Implement redundancy and load balancing', CURRENT_TIMESTAMP, 'Operations Team', DATEADD('MONTH', 6, CURRENT_TIMESTAMP), 'ACTIVE'),
(2, 'COMPLIANCE', 'HIGH', 6, 9, 'Data privacy regulation compliance risk', 'Regular compliance audits and data encryption', CURRENT_TIMESTAMP, 'Compliance Team', DATEADD('MONTH', 3, CURRENT_TIMESTAMP), 'ACTIVE'),
(2, 'CYBERSECURITY', 'CRITICAL', 8, 10, 'Data breach risk for customer information', 'Multi-layer security controls and access monitoring', CURRENT_TIMESTAMP, 'Security Team', DATEADD('MONTH', 1, CURRENT_TIMESTAMP), 'ACTIVE'),
(3, 'MARKET', 'HIGH', 7, 8, 'Market volatility affecting trading operations', 'Implement circuit breakers and risk limits', CURRENT_TIMESTAMP, 'Risk Team', DATEADD('MONTH', 3, CURRENT_TIMESTAMP), 'ACTIVE'),
(3, 'TECHNOLOGY', 'MEDIUM', 5, 7, 'System latency during high volume trading', 'Upgrade hardware and optimize algorithms', CURRENT_TIMESTAMP, 'Technology Team', DATEADD('MONTH', 6, CURRENT_TIMESTAMP), 'UNDER_REVIEW'),
(4, 'OPERATIONAL', 'MEDIUM', 6, 7, 'Network infrastructure failure', 'Redundant network paths and monitoring', CURRENT_TIMESTAMP, 'Network Team', DATEADD('MONTH', 6, CURRENT_TIMESTAMP), 'ACTIVE'),
(5, 'STRATEGIC', 'HIGH', 6, 8, 'Inadequate risk monitoring capabilities', 'Enhance risk analytics and reporting', CURRENT_TIMESTAMP, 'Risk Team', DATEADD('MONTH', 3, CURRENT_TIMESTAMP), 'ACTIVE');