package job_tracker_api.service;

import job_tracker_api.dto.JobApplicationDto;
import job_tracker_api.exception.JobNotFoundException;
import job_tracker_api.model.JobApplication;
import job_tracker_api.model.User;
import job_tracker_api.repository.JobApplicationRepository;
import job_tracker_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;

    public JobApplicationDto createJob(JobApplicationDto dto) {
        if (dto.getJobTitle() == null || dto.getJobTitle().trim().isEmpty()) {
            throw new RuntimeException("Job title cannot be empty");
        }
        if (dto.getUserId() == null) {
            throw new RuntimeException("User ID must be provided");
        }
        
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("Invalid user id: " + dto.getUserId()));

        JobApplication job = toEntity(dto);
        job.setUser(user);

        JobApplication saved = jobApplicationRepository.save(job);
        return toDto(saved);
    }

    public Page<JobApplicationDto> getAllJobs(Pageable pageable) {
        return jobApplicationRepository.findAll(pageable).map(this::toDto);
    }

    public JobApplicationDto getJobById(Long id) {
        return jobApplicationRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new JobNotFoundException(id));
    }

    public JobApplicationDto updateJob(Long id, JobApplicationDto dto) {
        if (dto.getJobTitle() == null || dto.getJobTitle().trim().isEmpty()) {
            throw new RuntimeException("Job title cannot be empty");
        }
        if (dto.getUserId() == null) {
            throw new RuntimeException("User ID must be provided");
        }

        JobApplication existing = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException(id));

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("Invalid user id: " + dto.getUserId()));

        existing.setCompanyName(dto.getCompanyName());
        existing.setJobTitle(dto.getJobTitle());
        existing.setStatus(dto.getStatus());
        existing.setAppliedDate(dto.getAppliedDate());
        existing.setNotes(dto.getNotes());
        existing.setUser(user);

        JobApplication updated = jobApplicationRepository.save(existing);
        return toDto(updated);
    }

    public void deleteJob(Long id) {
        if (!jobApplicationRepository.existsById(id)) {
            throw new JobNotFoundException(id);
        }
        jobApplicationRepository.deleteById(id);
    }

    private JobApplicationDto toDto(JobApplication entity) {
        if (entity == null) return null;
        return JobApplicationDto.builder()
                .id(entity.getId())
                .userId(entity.getUser() != null ? entity.getUser().getId() : null)
                .companyName(entity.getCompanyName())
                .jobTitle(entity.getJobTitle())
                .status(entity.getStatus())
                .appliedDate(entity.getAppliedDate())
                .notes(entity.getNotes())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    private JobApplication toEntity(JobApplicationDto dto) {
        if (dto == null) return null;
        return JobApplication.builder()
                .companyName(dto.getCompanyName())
                .jobTitle(dto.getJobTitle())
                .status(dto.getStatus())
                .appliedDate(dto.getAppliedDate())
                .notes(dto.getNotes())
                .build();
    }
}
