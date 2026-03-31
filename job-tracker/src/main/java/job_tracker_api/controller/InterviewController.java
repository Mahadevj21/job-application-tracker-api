package job_tracker_api.controller;

import jakarta.validation.Valid;
import job_tracker_api.dto.InterviewDto;
import job_tracker_api.service.InterviewService;
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
    public ResponseEntity<InterviewDto> createInterview(@Valid @RequestBody InterviewDto dto) {
        return new ResponseEntity<>(interviewService.createInterview(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InterviewDto> getInterviewById(@PathVariable Long id) {
        return ResponseEntity.ok(interviewService.getInterviewById(id));
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<InterviewDto>> getInterviewsByJobId(@PathVariable Long jobId) {
        return ResponseEntity.ok(interviewService.getInterviewsForJobApplication(jobId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InterviewDto> updateInterview(@PathVariable Long id,
                                                        @Valid @RequestBody InterviewDto dto) {
        return ResponseEntity.ok(interviewService.updateInterview(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInterview(@PathVariable Long id) {
        interviewService.deleteInterview(id);
        return ResponseEntity.noContent().build();
    }
}
