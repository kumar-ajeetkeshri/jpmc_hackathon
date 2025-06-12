package com.jpmc.riskasset.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .servers(List.of(new Server().url("http://localhost:12001/api")))
                .info(new Info()
                        .title("Risk Asset Management System API")
                        .description("REST API for managing risk assets and assessments in JPMC")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("JPMC Risk Management Team")
                                .email("risk-management@jpmc.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")));
    }
}