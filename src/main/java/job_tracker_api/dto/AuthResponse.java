package job_tracker_api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import job_tracker_api.model.Role;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String message;
    private Long userId;
    private String username;
    private Role role;
}
