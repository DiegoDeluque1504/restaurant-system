import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

interface ErrorResponse {
  message?: string;
  error?: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6">
            <div class="card shadow-lg">
              <div class="card-body p-5">
                <div class="text-center mb-4">
                  <i class="bi bi-person-plus text-primary" style="font-size: 3rem;"></i>
                  <h2 class="mt-3">Crear Cuenta</h2>
                  <p class="text-muted">Completa el formulario para registrarte</p>
                </div>

                <div *ngIf="success" class="alert alert-success">
                  <i class="bi bi-check-circle me-2"></i>
                  ¡Registro exitoso! Redirigiendo...
                </div>

                <div *ngIf="error" class="alert alert-danger alert-dismissible fade show">
                  <i class="bi bi-exclamation-circle me-2"></i>
                  {{ error }}
                  <button type="button" class="btn-close" (click)="error = ''"></button>
                </div>

                <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="first_name" class="form-label">Nombre</label>
                      <input 
                        type="text" 
                        id="first_name"
                        class="form-control" 
                        formControlName="first_name"
                        [class.is-invalid]="submitted && f['first_name'].errors"
                        placeholder="Juan"
                      >
                      <div *ngIf="submitted && f['first_name'].errors" class="invalid-feedback">
                        El nombre es requerido
                      </div>
                    </div>

                    <div class="col-md-6 mb-3">
                      <label for="last_name" class="form-label">Apellido</label>
                      <input 
                        type="text" 
                        id="last_name"
                        class="form-control" 
                        formControlName="last_name"
                        [class.is-invalid]="submitted && f['last_name'].errors"
                        placeholder="Pérez"
                      >
                      <div *ngIf="submitted && f['last_name'].errors" class="invalid-feedback">
                        El apellido es requerido
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="username" class="form-label">
                      <i class="bi bi-person me-2"></i>Usuario
                    </label>
                    <input 
                      type="text" 
                      id="username"
                      class="form-control" 
                      formControlName="username"
                      [class.is-invalid]="submitted && f['username'].errors"
                      placeholder="usuario123"
                    >
                    <div *ngIf="submitted && f['username'].errors" class="invalid-feedback">
                      <div *ngIf="f['username'].errors['required']">El usuario es requerido</div>
                      <div *ngIf="f['username'].errors['minlength']">Mínimo 3 caracteres</div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="email" class="form-label">
                      <i class="bi bi-envelope me-2"></i>Email
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      class="form-control" 
                      formControlName="email"
                      [class.is-invalid]="submitted && f['email'].errors"
                      placeholder="usuario@ejemplo.com"
                    >
                    <div *ngIf="submitted && f['email'].errors" class="invalid-feedback">
                      <div *ngIf="f['email'].errors['required']">El email es requerido</div>
                      <div *ngIf="f['email'].errors['email']">Email inválido</div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="password" class="form-label">
                      <i class="bi bi-lock me-2"></i>Contraseña
                    </label>
                    <input 
                      type="password" 
                      id="password"
                      class="form-control" 
                      formControlName="password"
                      [class.is-invalid]="submitted && f['password'].errors"
                      placeholder="Mínimo 6 caracteres"
                    >
                    <div *ngIf="submitted && f['password'].errors" class="invalid-feedback">
                      <div *ngIf="f['password'].errors['required']">La contraseña es requerida</div>
                      <div *ngIf="f['password'].errors['minlength']">Mínimo 6 caracteres</div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="password2" class="form-label">
                      <i class="bi bi-lock-fill me-2"></i>Confirmar Contraseña
                    </label>
                    <input 
                      type="password" 
                      id="password2"
                      class="form-control" 
                      formControlName="password2"
                      [class.is-invalid]="submitted && (f['password2'].errors || registerForm.errors?.['passwordMismatch'])"
                      placeholder="Repite tu contraseña"
                    >
                    <div *ngIf="submitted && f['password2'].errors" class="invalid-feedback">
                      Confirma tu contraseña
                    </div>
                    <div *ngIf="submitted && registerForm.errors?.['passwordMismatch']" class="invalid-feedback d-block">
                      Las contraseñas no coinciden
                    </div>
                  </div>

                  <div class="d-grid gap-2 mb-3">
                    <button 
                      type="submit" 
                      class="btn btn-primary btn-lg"
                      [disabled]="loading"
                    >
                      <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
                      <i *ngIf="!loading" class="bi bi-person-plus me-2"></i>
                      {{ loading ? 'Registrando...' : 'Registrarse' }}
                    </button>
                  </div>

                  <div class="text-center">
                    <p class="mb-0">
                      ¿Ya tienes cuenta? 
                      <a routerLink="/auth/login" class="text-primary">Inicia sesión aquí</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: calc(100vh - 120px);
      display: flex;
      align-items: center;
      padding: 40px 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .card {
      border: none;
      border-radius: 15px;
      animation: fadeInUp 0.6s ease;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .form-control {
      padding: 12px;
      border-radius: 8px;
    }
  `]
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', Validators.required]
  }, {
    validators: this.passwordMatchValidator
  });

  loading = false;
  submitted = false;
  error = '';
  success = false;

  get f() {
    return this.registerForm.controls;
  }

  passwordMatchValidator(form: any) {
    const password = form.get('password');
    const password2 = form.get('password2');
    
    if (password && password2 && password.value !== password2.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.register(this.registerForm.value as any).subscribe({
      next: () => {
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      error: (error: ErrorResponse) => {
        this.error = error.message || error.error || 'Error al registrar usuario';
        this.loading = false;
      }
    });
  }
}