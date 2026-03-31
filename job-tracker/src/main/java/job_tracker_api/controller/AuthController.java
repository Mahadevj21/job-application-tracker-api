package job_tracker_api.controller;

import job_tracker_api.dto.AuthResponse;
import job_tracker_api.dto.LoginDto;
import job_tracker_api.dto.RegisterDto;
import job_tracker_api.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterDto registerDto) {
        try {
            AuthResponse response = authService.register(registerDto);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(AuthResponse.builder().message(ex.getMessage()).build());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginDto loginDto) {
        try {
            AuthResponse response = authService.login(loginDto);
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(AuthResponse.builder().message(ex.getMessage()).build());
        }
    }
}
