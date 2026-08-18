package vn.naitei.nhom3.expensemanagement.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponse {

    private final String token;
    private final Long userId;
    private final String name;
    private final String email;
    private final String role;
}
