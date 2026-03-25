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

    // ── Update ────────────────────────────────────────────────────────────────

    public JobApplication updateJob(Long id, JobApplication updatedJob) {
        JobApplication existing = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException(id));

        existing.setCompanyName(updatedJob.getCompanyName());
        existing.setJobTitle(updatedJob.getJobTitle());
        existing.setStatus(updatedJob.getStatus());
        existing.setAppliedDate(updatedJob.getAppliedDate());
        existing.setNotes(updatedJob.getNotes());

        return jobApplicationRepository.save(existing);
    }

    // ── Delete ────────────────────────────────────────────────────────────────

    public void deleteJob(Long id) {
        if (!jobApplicationRepository.existsById(id)) {
            throw new JobNotFoundException(id);
        }
        jobApplicationRepository.deleteById(id);
    }

}
