package job_tracker_api.exception;

public class InterviewNotFoundException extends RuntimeException {
    public InterviewNotFoundException(Long id) {
        super("Interview not found with id: " + id);
    }
}
