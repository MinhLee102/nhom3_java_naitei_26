# Expense Management System - Backend

## Tech stack

- Java 21
- Spring Boot 4.0.7 (Maven)
- Spring Web MVC, Spring Data JPA, Spring Validation
- MySQL Driver
- Lombok
- Springdoc OpenAPI (Swagger UI)

## Yêu cầu môi trường

- JDK 21+ (project build bằng JDK 21, đã test với JDK 23)
- MySQL đang chạy (local hoặc Docker)
- Nếu máy có nhiều JDK, kiểm tra `JAVA_HOME` đang trỏ đúng JDK 21+ trước khi chạy `mvnw`, ví dụ máy Windows có sẵn JDK 8 làm mặc định thì cần set lại biến môi trường này.

## Cấu hình database

Ứng dụng đọc cấu hình qua biến môi trường (xem `src/main/resources/application.properties`):

| Biến | Mặc định | Ý nghĩa |
| --- | --- | --- |
| `DB_HOST` | localhost | Host MySQL |
| `DB_PORT` | 3306 | Port MySQL |
| `DB_NAME` | expense_management | Tên database |
| `DB_USERNAME` | root | User |
| `DB_PASSWORD` | root | Password |
| `SERVER_PORT` | 8080 | Port ứng dụng |

## Chạy project

```bash
./mvnw spring-boot:run
```

Sau khi chạy, Swagger UI tại: `http://localhost:8080/swagger-ui.html`

## Cấu trúc package

```
vn.naitei.nhom3.expensemanagement
├── common.response   # ApiResponse<T> - format JSON response chuẩn
├── config            # OpenApiConfig, các bean cấu hình khác
├── exception          # Custom exceptions + GlobalExceptionHandler
├── entity             # (sẽ thêm sau khi có ERD)
└── repository         # (sẽ thêm sau khi có ERD)
```

## Response format chuẩn

```json
{
  "status": 200,
  "message": "Thành công",
  "data": { }
}
```

## Việc còn lại (chờ ERD từ người làm DB)

- Tạo `@Entity` classes tương ứng ERD, khai báo quan hệ JPA (`@OneToMany`, `@ManyToOne`, `@JoinColumn`...)
- Tạo các Repository interface kế thừa `JpaRepository` (UserRepository, ExpenseRepository, IncomeRepository...)
