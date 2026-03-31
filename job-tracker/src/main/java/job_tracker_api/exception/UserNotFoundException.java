package job_tracker_api.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("User not found with id: " + id);
    }
    public UserNotFoundException(String identifier) {
        super("User not found: " + identifier);
    }
}
