import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/">
          <i class="bi bi-shop me-2"></i>
          Restaurant System
        </a>
        
        <button class="navbar-toggler" type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            @if (currentUser$ | async) {
              <li class="nav-item">
                <a class="nav-link" routerLink="/home" routerLinkActive="active">
                  <i class="bi bi-house-door me-1"></i>Inicio
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/categories" routerLinkActive="active">
                  <i class="bi bi-list-ul me-1"></i>Categorías
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/dishes" routerLinkActive="active">
                  <i class="bi bi-egg-fried me-1"></i>Platos
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/orders" routerLinkActive="active">
                  <i class="bi bi-receipt me-1"></i>Órdenes
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/tables" routerLinkActive="active">
                  <i class="bi bi-grid-3x3 me-1"></i>Mesas
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/deliveries" routerLinkActive="active">
                  <i class="bi bi-truck me-1"></i>Entregas
                </a>
              </li>
            }
          </ul>

          <ul class="navbar-nav ms-auto">
            @if (currentUser$ | async; as user) {
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" 
                   data-bs-toggle="dropdown">
                  <i class="bi bi-person-circle me-1"></i>
                  {{ user.username }}
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <a class="dropdown-item" href="#" (click)="logout($event)">
                      <i class="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                    </a>
                  </li>
                </ul>
              </li>
            } @else {
              <li class="nav-item">
                <a class="nav-link" routerLink="/auth/login">
                  <i class="bi bi-box-arrow-in-right me-1"></i>Iniciar Sesión
                </a>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar-brand {
      font-weight: 600;
      font-size: 1.3rem;
    }

    .nav-link {
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .nav-link:hover {
      transform: translateY(-2px);
    }

    .nav-link.active {
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 5px;
    }
  `]
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  currentUser$ = this.authService.currentUser$;

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }
}