package job_tracker_api.service;

import job_tracker_api.dto.AnalyticsDto;
import job_tracker_api.model.JobStatus;
import job_tracker_api.repository.InterviewRepository;
import job_tracker_api.repository.JobApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final JobApplicationRepository jobApplicationRepository;
    private final InterviewRepository interviewRepository;

    public AnalyticsDto getStats() {
        long total = jobApplicationRepository.count();
        long totalInterviews = interviewRepository.count();
        long offers = jobApplicationRepository.countByStatus(JobStatus.OFFER);
        long rejections = jobApplicationRepository.countByStatus(JobStatus.REJECTED);
        long applied = jobApplicationRepository.countByStatus(JobStatus.APPLIED);
        long interviews = jobApplicationRepository.countByStatus(JobStatus.INTERVIEW);

        return AnalyticsDto.builder()
                .totalApplications(total)
                .totalInterviews(totalInterviews)
                .offers(offers)
                .rejections(rejections)
                .applied(applied)
                .interviews(interviews)
                .build();
    }
}
