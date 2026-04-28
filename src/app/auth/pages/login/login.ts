import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html'
})
export class Login {
  loginForm: FormGroup;
  showPassword = signal<boolean>(false);
  loginError = signal<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(value => !value);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginError.set(false);
      const { identifier, password } = this.loginForm.value;
      
      const success = this.authService.login(identifier, password);

      if (success) {
        console.log('Login exitoso, redirigiendo...');
        this.router.navigate(['/dashboard']);
      } else {
        this.loginError.set(true);
        console.error('Credenciales incorrectas');
      }
    }
  }
}
