package job_tracker_api.config;

import job_tracker_api.model.Role;
import job_tracker_api.model.User;
import job_tracker_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            String adminPassword = BCrypt.hashpw("admin123", BCrypt.gensalt());
            User admin = User.builder()
                    .username("admin")
                    .email("admin@example.com")
                    .password(adminPassword)
                    .role(Role.ADMIN)
                    .build();

            String userPassword = BCrypt.hashpw("user123", BCrypt.gensalt());
            User normalUser = User.builder()
                    .username("john_doe")
                    .email("john@example.com")
                    .password(userPassword)
                    .role(Role.USER)
                    .build();

            userRepository.save(admin);
            userRepository.save(normalUser);
            System.out.println("Sample users initialized.");
        }
    }
}
