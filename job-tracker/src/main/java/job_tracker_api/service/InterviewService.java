package job_tracker_api.service;

import job_tracker_api.dto.InterviewDto;
import job_tracker_api.exception.InterviewNotFoundException;
import job_tracker_api.exception.JobNotFoundException;
import job_tracker_api.model.Interview;
import job_tracker_api.model.JobApplication;
import job_tracker_api.repository.InterviewRepository;
import job_tracker_api.repository.JobApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final JobApplicationRepository jobApplicationRepository;

    public InterviewDto createInterview(InterviewDto dto) {
        if (dto.getJobApplicationId() == null) {
            throw new RuntimeException("JobApplication ID is required");
        }
        JobApplication jobApp = jobApplicationRepository.findById(dto.getJobApplicationId())
                .orElseThrow(() -> new JobNotFoundException(dto.getJobApplicationId()));

        Interview interview = Interview.builder()
                .round(dto.getRound())
                .interviewDate(dto.getInterviewDate())
                .notes(dto.getNotes())
                .jobApplication(jobApp)
                .build();

        return toDto(interviewRepository.save(interview));
    }

    public List<InterviewDto> getInterviewsForJobApplication(Long jobApplicationId) {
        if (!jobApplicationRepository.existsById(jobApplicationId)) {
            throw new JobNotFoundException(jobApplicationId);
        }
        return interviewRepository.findByJobApplicationId(jobApplicationId)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    public InterviewDto getInterviewById(Long id) {
        return toDto(interviewRepository.findById(id)
                .orElseThrow(() -> new InterviewNotFoundException(id)));
    }

    public InterviewDto updateInterview(Long id, InterviewDto dto) {
        Interview existing = interviewRepository.findById(id)
                .orElseThrow(() -> new InterviewNotFoundException(id));

        if (dto.getRound() != null && !dto.getRound().trim().isEmpty()) {
            existing.setRound(dto.getRound());
        }
        if (dto.getInterviewDate() != null) {
            existing.setInterviewDate(dto.getInterviewDate());
        }
        if (dto.getNotes() != null) {
            existing.setNotes(dto.getNotes());
        }

        return toDto(interviewRepository.save(existing));
    }

    public void deleteInterview(Long id) {
        if (!interviewRepository.existsById(id)) {
            throw new InterviewNotFoundException(id);
        }
        interviewRepository.deleteById(id);
    }

    private InterviewDto toDto(Interview entity) {
        if (entity == null) return null;
        return InterviewDto.builder()
                .id(entity.getId())
                .jobApplicationId(entity.getJobApplication() != null ? entity.getJobApplication().getId() : null)
                .round(entity.getRound())
                .interviewDate(entity.getInterviewDate())
                .notes(entity.getNotes())
                .build();
    }
}
