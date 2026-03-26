package job_tracker_api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginDto {
    @NotBlank(message = "Username or Email is required")
    private String identifier;

    @NotBlank(message = "Password is required")
    private String password;
}
