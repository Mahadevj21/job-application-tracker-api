package job_tracker_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "job_applications")
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @jakarta.validation.constraints.NotBlank(message = "Company Name is required")
    private String companyName;

    @jakarta.validation.constraints.NotBlank(message = "Job Title is required")
    private String jobTitle;

    @jakarta.validation.constraints.NotNull(message = "Job Status is required")
    @Enumerated(EnumType.STRING)
    private JobStatus status;

    private LocalDate appliedDate;

    private String notes;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @lombok.ToString.Exclude
    @lombok.EqualsAndHashCode.Exclude
    private User user;

    @OneToMany(mappedBy = "jobApplication", cascade = CascadeType.ALL, orphanRemoval = true)
    @lombok.ToString.Exclude
    @lombok.EqualsAndHashCode.Exclude
    private java.util.List<Interview> interviews = new java.util.ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
