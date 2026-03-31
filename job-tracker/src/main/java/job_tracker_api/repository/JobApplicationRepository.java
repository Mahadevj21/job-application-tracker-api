package job_tracker_api.repository;

import job_tracker_api.model.JobApplication;
import job_tracker_api.model.JobStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long>, JpaSpecificationExecutor<JobApplication> {

    Page<JobApplication> findByStatus(JobStatus status, Pageable pageable);

    Page<JobApplication> findByCompanyNameContainingIgnoreCase(String companyName, Pageable pageable);

    Page<JobApplication> findByJobTitleContainingIgnoreCase(String jobTitle, Pageable pageable);

    long countByStatus(JobStatus status);

    @Query("SELECT COUNT(j) FROM JobApplication j")
    long countAll();
}
