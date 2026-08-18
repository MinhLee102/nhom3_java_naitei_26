package vn.naitei.nhom3.expensemanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.naitei.nhom3.expensemanagement.entity.ActivityLog;
import vn.naitei.nhom3.expensemanagement.entity.User;
import vn.naitei.nhom3.expensemanagement.exception.ResourceNotFoundException;
import vn.naitei.nhom3.expensemanagement.repository.ActivityLogRepository;
import vn.naitei.nhom3.expensemanagement.repository.UserRepository;
import vn.naitei.nhom3.expensemanagement.service.ActivityLogService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityLogServiceImpl implements ActivityLogService {

    private final ActivityLogRepository activityLogRepository;
    private final UserRepository userRepository;

    @Override
    public List<ActivityLog> getByUserId(Long userId) {
        return activityLogRepository.findByUserId(userId);
    }

    @Override
    public ActivityLog log(Long userId, String action, String entityType, Long entityId, String description) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> ResourceNotFoundException.of("User", userId));
        ActivityLog activityLog = new ActivityLog();
        activityLog.setUser(user);
        activityLog.setAction(action);
        activityLog.setEntityType(entityType);
        activityLog.setEntityId(entityId);
        activityLog.setDescription(description);
        return activityLogRepository.save(activityLog);
    }
}
