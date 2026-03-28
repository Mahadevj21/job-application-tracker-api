package job_tracker_api.service;

import job_tracker_api.model.Interview;
import job_tracker_api.model.JobApplication;
import job_tracker_api.repository.InterviewRepository;
import job_tracker_api.repository.JobApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final JobApplicationRepository jobApplicationRepository;

    public Interview createInterview(Long jobApplicationId, Interview interview) {
        if (jobApplicationId == null) {
            throw new RuntimeException("JobApplication ID is required");
        }
        JobApplication jobApp = jobApplicationRepository.findById(jobApplicationId)
                .orElseThrow(() -> new RuntimeException("JobApplication not found with id: " + jobApplicationId));
                
        interview.setJobApplication(jobApp);
        return interviewRepository.save(interview);
    }

    public List<Interview> getInterviewsForJobApplication(Long jobApplicationId) {
        if (!jobApplicationRepository.existsById(jobApplicationId)) {
            throw new RuntimeException("JobApplication not found with id: " + jobApplicationId);
        }
        return interviewRepository.findByJobApplicationId(jobApplicationId);
    }

    public Interview getInterviewById(Long id) {
        return interviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Interview not found with id: " + id));
    }

    public Interview updateInterview(Long id, Interview updatedData) {
        Interview existing = getInterviewById(id);
        
        if (updatedData.getRound() != null && !updatedData.getRound().trim().isEmpty()) {
            existing.setRound(updatedData.getRound());
        }
        if (updatedData.getInterviewDate() != null) {
            existing.setInterviewDate(updatedData.getInterviewDate());
        }
        if (updatedData.getNotes() != null) {
            existing.setNotes(updatedData.getNotes());
        }
        
        return interviewRepository.save(existing);
    }

    public void deleteInterview(Long id) {
        if (!interviewRepository.existsById(id)) {
            throw new RuntimeException("Interview not found with id: " + id);
        }
        interviewRepository.deleteById(id);
    }
}
