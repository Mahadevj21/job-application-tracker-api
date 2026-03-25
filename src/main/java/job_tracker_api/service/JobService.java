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

}
