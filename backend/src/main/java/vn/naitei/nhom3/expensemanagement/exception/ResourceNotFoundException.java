package vn.naitei.nhom3.expensemanagement.exception;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public static ResourceNotFoundException of(String resourceName, Object identifier) {
        return new ResourceNotFoundException(
                "%s không tồn tại với id: %s".formatted(resourceName, identifier));
    }
}
