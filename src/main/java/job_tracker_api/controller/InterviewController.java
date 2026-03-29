package job_tracker_api.controller;

import job_tracker_api.model.Interview;
import job_tracker_api.service.InterviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;

    @PostMapping
    public ResponseEntity<Interview> createInterview(@RequestParam Long jobId, @Valid @RequestBody Interview interview) {
        return new ResponseEntity<>(interviewService.createInterview(jobId, interview), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Interview> getInterviewById(@PathVariable Long id) {
        return ResponseEntity.ok(interviewService.getInterviewById(id));
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<Interview>> getInterviewsByJobId(@PathVariable Long jobId) {
        return ResponseEntity.ok(interviewService.getInterviewsForJobApplication(jobId));
    }
}
