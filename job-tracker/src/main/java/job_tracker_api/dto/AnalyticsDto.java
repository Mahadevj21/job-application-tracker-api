package job_tracker_api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsDto {
    private long totalApplications;
    private long totalInterviews;
    private long offers;
    private long rejections;
    private long applied;
    private long interviews;
}
