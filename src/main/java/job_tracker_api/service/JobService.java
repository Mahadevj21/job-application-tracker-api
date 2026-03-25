package job_tracker_api.service;

import job_tracker_api.exception.JobNotFoundException;
import job_tracker_api.model.JobApplication;
import job_tracker_api.repository.JobApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobApplicationRepository jobApplicationRepository;

    // ── Create ────────────────────────────────────────────────────────────────

    public JobApplication createJob(JobApplication jobApplication) {
        return jobApplicationRepository.save(jobApplication);
    }

    // ── Read ──────────────────────────────────────────────────────────────────

    public List<JobApplication> getAllJobs() {
        return jobApplicationRepository.findAll();
    }

    public JobApplication getJobById(Long id) {
        return jobApplicationRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException(id));
    }

}
