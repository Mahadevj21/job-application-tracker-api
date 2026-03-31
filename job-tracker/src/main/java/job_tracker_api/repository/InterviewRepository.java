package job_tracker_api.repository;

import job_tracker_api.model.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long> {
    List<Interview> findByJobApplicationId(Long jobApplicationId);
}
