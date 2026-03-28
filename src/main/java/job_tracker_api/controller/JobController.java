package job_tracker_api.controller;

import job_tracker_api.dto.JobApplicationDto;
import job_tracker_api.service.JobApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobApplicationService jobApplicationService;

    @PostMapping
    public ResponseEntity<JobApplicationDto> createJob(@Valid @RequestBody JobApplicationDto dto) {
        return new ResponseEntity<>(jobApplicationService.createJob(dto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<JobApplicationDto>> getAllJobs(
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(jobApplicationService.getAllJobs(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobApplicationDto> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobApplicationService.getJobById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobApplicationDto> updateJob(@PathVariable Long id, @Valid @RequestBody JobApplicationDto dto) {
        return ResponseEntity.ok(jobApplicationService.updateJob(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        jobApplicationService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }
}
