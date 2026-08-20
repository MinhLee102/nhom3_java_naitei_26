package vn.naitei.nhom3.expensemanagement.service;

import vn.naitei.nhom3.expensemanagement.dto.auth.AuthResponse;
import vn.naitei.nhom3.expensemanagement.dto.auth.LoginRequest;
import vn.naitei.nhom3.expensemanagement.dto.auth.RegisterRequest;
import vn.naitei.nhom3.expensemanagement.security.UserPrincipal;

public interface AuthService {

    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    void logout(UserPrincipal principal);
}
