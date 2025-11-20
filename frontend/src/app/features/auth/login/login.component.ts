import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
            <div class="card shadow-lg">
              <div class="card-body p-5">
                <div class="text-center mb-4">
                  <i class="bi bi-shop text-primary" style="font-size: 3rem;"></i>
                  <h2 class="mt-3">Iniciar Sesión</h2>
                  <p class="text-muted">Sistema de Gestión de Restaurantes</p>
                </div>

                <div *ngIf="error" class="alert alert-danger alert-dismissible fade show">
                  <i class="bi bi-exclamation-circle me-2"></i>
                  {{ error }}
                  <button type="button" class="btn-close" (click)="error = ''"></button>
                </div>

                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
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
                      placeholder="Ingrese su usuario"
                    >
                    <div *ngIf="submitted && f['username'].errors" class="invalid-feedback">
                      El usuario es requerido
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
                      placeholder="Ingrese su contraseña"
                    >
                    <div *ngIf="submitted && f['password'].errors" class="invalid-feedback">
                      La contraseña es requerida
                    </div>
                  </div>

                  <div class="d-grid gap-2 mb-3">
                    <button 
                      type="submit" 
                      class="btn btn-primary btn-lg"
                      [disabled]="loading"
                    >
                      <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
                      <i *ngIf="!loading" class="bi bi-box-arrow-in-right me-2"></i>
                      {{ loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
                    </button>
                  </div>

                  <div class="text-center">
                    <p class="mb-0">
                      ¿No tienes cuenta? 
                      <a routerLink="/auth/register" class="text-primary">Regístrate aquí</a>
                    </p>
                  </div>
                </form>

                <div class="mt-4 p-3 bg-light rounded">
                  <small class="text-muted d-block mb-2">
                    <strong>Credenciales de prueba:</strong>
                  </small>
                  <small class="text-muted d-block">
                    • Usuario: <code>admin</code> / Contraseña: <code>admin123</code>
                  </small>
                </div>
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

    code {
      background-color: #e9ecef;
      padding: 2px 6px;
      border-radius: 4px;
    }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  loading = false;
  submitted = false;
  error = '';
  returnUrl = '/';

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value as any).subscribe({
      next: () => {
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        this.error = error.message || 'Error al iniciar sesión';
        this.loading = false;
      }
    });
  }
}