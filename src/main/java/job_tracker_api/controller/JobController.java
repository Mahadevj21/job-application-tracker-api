package job_tracker_api.controller;

import job_tracker_api.model.JobApplication;
import job_tracker_api.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @PostMapping
    public ResponseEntity<JobApplication> createJob(@RequestBody JobApplication jobApplication) {
        JobApplication createdJob = jobService.createJob(jobApplication);
        return new ResponseEntity<>(createdJob, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<JobApplication>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobApplication> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }
}
