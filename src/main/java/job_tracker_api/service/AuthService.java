package job_tracker_api.service;

import job_tracker_api.dto.AuthResponse;
import job_tracker_api.dto.LoginDto;
import job_tracker_api.dto.RegisterDto;
import job_tracker_api.model.Role;
import job_tracker_api.model.User;
import job_tracker_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    public AuthResponse register(RegisterDto dto) {
        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new RuntimeException("Username is already taken!");
        }
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email is already taken!");
        }

        String hashedPassword = BCrypt.hashpw(dto.getPassword(), BCrypt.gensalt());

        User user = User.builder()
                .username(dto.getUsername())
                .email(dto.getEmail())
                .password(hashedPassword)
                .role(dto.getRole() != null ? dto.getRole() : Role.USER)
                .build();

        User savedUser = userRepository.save(user);

        return AuthResponse.builder()
                .message("User registered successfully")
                .userId(savedUser.getId())
                .username(savedUser.getUsername())
                .role(savedUser.getRole())
                .build();
    }

    public AuthResponse login(LoginDto dto) {
        Optional<User> userOptional = userRepository.findByUsername(dto.getIdentifier());
        if (userOptional.isEmpty()) {
            userOptional = userRepository.findByEmail(dto.getIdentifier());
        }

        if (userOptional.isEmpty()) {
            throw new RuntimeException("Invalid username or password");
        }

        User user = userOptional.get();

        if (!BCrypt.checkpw(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        return AuthResponse.builder()
                .message("Login successful")
                .userId(user.getId())
                .username(user.getUsername())
                .role(user.getRole())
                .build();
    }
}
