package job_tracker_api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import job_tracker_api.model.JobStatus;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobApplicationDto {
    private Long id;

    @NotBlank(message = "Company Name is required")
    private String companyName;

    @NotBlank(message = "Job Title is required")
    private String jobTitle;

    @NotNull(message = "Job Status is required")
    private JobStatus status;

    private LocalDate appliedDate;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
