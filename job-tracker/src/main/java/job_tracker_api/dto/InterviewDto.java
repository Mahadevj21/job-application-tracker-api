package job_tracker_api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewDto {

    private Long id;

    @NotNull(message = "Job Application ID is required")
    private Long jobApplicationId;

    @NotBlank(message = "Interview round is required")
    private String round;

    private LocalDateTime interviewDate;

    private String notes;
}
