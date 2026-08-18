package vn.naitei.nhom3.expensemanagement.service;

import vn.naitei.nhom3.expensemanagement.entity.ActivityLog;

import java.util.List;

public interface ActivityLogService {

    List<ActivityLog> getByUserId(Long userId);

    ActivityLog log(Long userId, String action, String entityType, Long entityId, String description);
}
