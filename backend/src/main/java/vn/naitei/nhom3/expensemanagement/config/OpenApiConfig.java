package vn.naitei.nhom3.expensemanagement.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI expenseManagementOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("Expense Management System API")
                        .description("API quản lý chi tiêu - NAITEI 26 Nhóm 3")
                        .version("v0.0.1"));
    }
}
