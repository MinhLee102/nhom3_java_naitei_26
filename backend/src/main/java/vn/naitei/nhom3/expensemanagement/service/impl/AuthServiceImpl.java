package vn.naitei.nhom3.expensemanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vn.naitei.nhom3.expensemanagement.dto.auth.AuthResponse;
import vn.naitei.nhom3.expensemanagement.dto.auth.LoginRequest;
import vn.naitei.nhom3.expensemanagement.dto.auth.RegisterRequest;
import vn.naitei.nhom3.expensemanagement.entity.User;
import vn.naitei.nhom3.expensemanagement.entity.enums.Role;
import vn.naitei.nhom3.expensemanagement.entity.enums.UserStatus;
import vn.naitei.nhom3.expensemanagement.exception.BadRequestException;
import vn.naitei.nhom3.expensemanagement.security.JwtTokenProvider;
import vn.naitei.nhom3.expensemanagement.security.UserPrincipal;
import vn.naitei.nhom3.expensemanagement.service.AuthService;
import vn.naitei.nhom3.expensemanagement.service.UserService;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse register(RegisterRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        user.setStatus(UserStatus.ACTIVE);

        User saved = userService.create(user);
        return buildAuthResponse(saved);
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (org.springframework.security.core.AuthenticationException ex) {
            throw new BadCredentialsException("Email hoặc mật khẩu không đúng");
        }

        User user = userService.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Email hoặc mật khẩu không đúng"));
        return buildAuthResponse(user);
    }

    private AuthResponse buildAuthResponse(User user) {
        UserPrincipal principal = new UserPrincipal(user);
        String token = jwtTokenProvider.generateToken(principal);
        String role = principal.getAuthorities().iterator().next().getAuthority();
        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail(), role);
    }
}
