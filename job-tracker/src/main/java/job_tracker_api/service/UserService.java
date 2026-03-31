package job_tracker_api.service;

import job_tracker_api.dto.UserDto;
import job_tracker_api.exception.UserNotFoundException;
import job_tracker_api.model.User;
import job_tracker_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserDto createUser(User user) {
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            throw new RuntimeException("Username cannot be empty");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        return toDto(userRepository.save(user));
    }

    public UserDto getUserById(Long id) {
        return toDto(userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id)));
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public UserDto updateUser(Long id, User updatedUser) {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        if (updatedUser.getUsername() == null || updatedUser.getUsername().trim().isEmpty()) {
            throw new RuntimeException("Username cannot be empty");
        }
        if (!existing.getEmail().equals(updatedUser.getEmail())
                && userRepository.existsByEmail(updatedUser.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        existing.setUsername(updatedUser.getUsername());
        existing.setEmail(updatedUser.getEmail());

        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            existing.setPassword(updatedUser.getPassword());
        }
        if (updatedUser.getRole() != null) {
            existing.setRole(updatedUser.getRole());
        }

        return toDto(userRepository.save(existing));
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
    }

    private UserDto toDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}
