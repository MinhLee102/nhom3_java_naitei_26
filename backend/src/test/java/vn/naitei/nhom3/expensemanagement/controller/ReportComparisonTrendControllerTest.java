package vn.naitei.nhom3.expensemanagement.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.core.MethodParameter;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import vn.naitei.nhom3.expensemanagement.dto.report.ReportComparisonResponse;
import vn.naitei.nhom3.expensemanagement.dto.report.ReportTrendPoint;
import vn.naitei.nhom3.expensemanagement.entity.User;
import vn.naitei.nhom3.expensemanagement.entity.enums.Role;
import vn.naitei.nhom3.expensemanagement.entity.enums.UserStatus;
import vn.naitei.nhom3.expensemanagement.exception.GlobalExceptionHandler;
import vn.naitei.nhom3.expensemanagement.security.UserPrincipal;
import vn.naitei.nhom3.expensemanagement.service.ReportService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class ReportComparisonTrendControllerTest {

    private static final Long AUTHENTICATED_USER_ID = 42L;

    @Mock
    private ReportService reportService;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        User user = new User();
        user.setId(AUTHENTICATED_USER_ID);
        user.setName("Report user");
        user.setEmail("report-user@example.com");
        user.setPassword("password");
        user.setRole(Role.USER);
        user.setStatus(UserStatus.ACTIVE);

        mockMvc = MockMvcBuilders.standaloneSetup(new ReportController(reportService))
                .setCustomArgumentResolvers(new AuthenticatedPrincipalResolver(new UserPrincipal(user)))
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    void comparisonUsesAuthenticatedUserAndPeriodRange() throws Exception {
        when(reportService.getComparison(
                AUTHENTICATED_USER_ID,
                LocalDate.of(2026, 1, 1),
                LocalDate.of(2026, 3, 31)))
                .thenReturn(new ReportComparisonResponse(
                        new BigDecimal("12000000"),
                        new BigDecimal("4500000"),
                        new BigDecimal("7500000")));

        perform("/api/reports/comparison?period=quarter&value=2026-Q1")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is(200)))
                .andExpect(jsonPath("$.data.totalIncome", is(12000000)))
                .andExpect(jsonPath("$.data.totalExpense", is(4500000)))
                .andExpect(jsonPath("$.data.balance", is(7500000)));

        verify(reportService).getComparison(
                AUTHENTICATED_USER_ID,
                LocalDate.of(2026, 1, 1),
                LocalDate.of(2026, 3, 31));
    }

    @Test
    void trendUsesAuthenticatedUserAndCustomDateRange() throws Exception {
        when(reportService.getTrend(
                AUTHENTICATED_USER_ID,
                LocalDate.of(2026, 1, 15),
                LocalDate.of(2026, 3, 2)))
                .thenReturn(List.of(
                        new ReportTrendPoint("2026-01", new BigDecimal("100"), BigDecimal.ZERO),
                        new ReportTrendPoint("2026-02", BigDecimal.ZERO, BigDecimal.ZERO),
                        new ReportTrendPoint("2026-03", BigDecimal.ZERO, new BigDecimal("25"))));

        perform("/api/reports/trend?from=2026-01-15&to=2026-03-02")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is(200)))
                .andExpect(jsonPath("$.data[0].period", is("2026-01")))
                .andExpect(jsonPath("$.data[1].income", is(0)))
                .andExpect(jsonPath("$.data[2].expense", is(25)));

        verify(reportService).getTrend(
                AUTHENTICATED_USER_ID,
                LocalDate.of(2026, 1, 15),
                LocalDate.of(2026, 3, 2));
    }

    @Test
    void comparisonRejectsMissingDateParameters() throws Exception {
        assertBadRequest("/api/reports/comparison?period=month");
        assertBadRequest("/api/reports/comparison?from=2026-01-01");
    }

    @Test
    void trendRejectsMissingInvalidAndReversedDateRange() throws Exception {
        assertBadRequest("/api/reports/trend?from=2026-01-01");
        assertBadRequest("/api/reports/trend?from=2026-02-30&to=2026-03-01");
        assertBadRequest("/api/reports/trend?from=2026-03-01&to=2026-01-01");
    }

    private ResultActions perform(String uri) throws Exception {
        return mockMvc.perform(get(uri));
    }

    private void assertBadRequest(String uri) throws Exception {
        perform(uri).andExpect(status().isBadRequest());
    }

    private static final class AuthenticatedPrincipalResolver implements HandlerMethodArgumentResolver {

        private final UserPrincipal principal;

        private AuthenticatedPrincipalResolver(UserPrincipal principal) {
            this.principal = principal;
        }

        @Override
        public boolean supportsParameter(MethodParameter parameter) {
            return parameter.hasParameterAnnotation(AuthenticationPrincipal.class);
        }

        @Override
        public Object resolveArgument(
                MethodParameter parameter,
                ModelAndViewContainer mavContainer,
                NativeWebRequest webRequest,
                WebDataBinderFactory binderFactory) {
            return principal;
        }
    }
}