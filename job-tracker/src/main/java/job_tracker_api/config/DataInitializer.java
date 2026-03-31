package job_tracker_api.config;

import job_tracker_api.model.Interview;
import job_tracker_api.model.JobApplication;
import job_tracker_api.model.JobStatus;
import job_tracker_api.model.Role;
import job_tracker_api.model.User;
import job_tracker_api.repository.InterviewRepository;
import job_tracker_api.repository.JobApplicationRepository;
import job_tracker_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final InterviewRepository interviewRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            System.out.println("Initializing sample data for PostgreSQL...");
            
            String adminPassword = BCrypt.hashpw("admin123", BCrypt.gensalt());
            User admin = User.builder()
                    .username("admin")
                    .email("admin@example.com")
                    .password(adminPassword)
                    .role(Role.ADMIN)
                    .build();

            String userPassword = BCrypt.hashpw("user123", BCrypt.gensalt());
            User normalUser = User.builder()
                    .username("john_doe")
                    .email("john@example.com")
                    .password(userPassword)
                    .role(Role.USER)
                    .build();

            admin = userRepository.save(admin);
            normalUser = userRepository.save(normalUser);

            JobApplication app1 = JobApplication.builder()
                    .companyName("Tech Corp")
                    .jobTitle("Backend Engineer")
                    .status(JobStatus.INTERVIEW)
                    .appliedDate(LocalDate.now().minusDays(10))
                    .notes("Good benefits")
                    .user(normalUser)
                    .build();

            JobApplication app2 = JobApplication.builder()
                    .companyName("DataSystems Inc")
                    .jobTitle("Software Developer")
                    .status(JobStatus.REJECTED)
                    .appliedDate(LocalDate.now().minusDays(30))
                    .notes("Needed more experience in Go")
                    .user(normalUser)
                    .build();

            JobApplication app3 = JobApplication.builder()
                    .companyName("StartupX")
                    .jobTitle("Fullstack Engineer")
                    .status(JobStatus.APPLIED)
                    .appliedDate(LocalDate.now().minusDays(2))
                    .notes("Waiting for response")
                    .user(normalUser)
                    .build();

            app1 = jobApplicationRepository.save(app1);
            app2 = jobApplicationRepository.save(app2);
            app3 = jobApplicationRepository.save(app3);

            Interview i1 = Interview.builder()
                    .round("HR Screening")
                    .interviewDate(LocalDateTime.now().minusDays(5))
                    .notes("Went well, typical questions.")
                    .jobApplication(app1)
                    .build();

            Interview i2 = Interview.builder()
                    .round("Technical Round 1")
                    .interviewDate(LocalDateTime.now().minusDays(1))
                    .notes("Algorithm and data structures focus.")
                    .jobApplication(app1)
                    .build();

            Interview i3 = Interview.builder()
                    .round("Behavioral Round")
                    .interviewDate(LocalDateTime.now().minusDays(20))
                    .notes("Failed due to culture fit.")
                    .jobApplication(app2)
                    .build();

            interviewRepository.save(i1);
            interviewRepository.save(i2);
            interviewRepository.save(i3);

            System.out.println("Data initialized successfully.");
            
            long jobCount = jobApplicationRepository.count();
            System.out.println("TESTING: Fetched " + jobCount + " jobs from PostgreSQL.");
            long intCount = interviewRepository.count();
            System.out.println("TESTING: Fetched " + intCount + " interviews from PostgreSQL.");
        }
    }
}
