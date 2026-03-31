package job_tracker_api.controller;

import job_tracker_api.dto.AnalyticsDto;
import job_tracker_api.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/stats")
    public ResponseEntity<AnalyticsDto> getStats() {
        return ResponseEntity.ok(analyticsService.getStats());
    }
}
