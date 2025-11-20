import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-5">
      <div class="text-center mb-5">
        <h1 class="display-4 text-primary mb-3">
          <i class="bi bi-shop"></i>
          Restaurant Management System
        </h1>
        <p class="lead text-muted">
          Sistema completo de gestión para restaurantes
        </p>
      </div>

      <div class="row g-4">
        <div class="col-md-4">
          <a routerLink="/categories" class="text-decoration-none">
            <div class="card h-100 border-0 shadow-sm hover-card">
              <div class="card-body text-center p-4">
                <i class="bi bi-list-ul text-primary" style="font-size: 3rem;"></i>
                <h5 class="card-title mt-3">Categorías</h5>
                <p class="card-text text-muted">
                  Gestiona las categorías del menú
                </p>
              </div>
            </div>
          </a>
        </div>

        <div class="col-md-4">
          <a routerLink="/dishes" class="text-decoration-none">
            <div class="card h-100 border-0 shadow-sm hover-card">
              <div class="card-body text-center p-4">
                <i class="bi bi-egg-fried text-success" style="font-size: 3rem;"></i>
                <h5 class="card-title mt-3">Platos</h5>
                <p class="card-text text-muted">
                  Administra el menú del restaurante
                </p>
              </div>
            </div>
          </a>
        </div>

        <div class="col-md-4">
          <a routerLink="/orders" class="text-decoration-none">
            <div class="card h-100 border-0 shadow-sm hover-card">
              <div class="card-body text-center p-4">
                <i class="bi bi-receipt text-warning" style="font-size: 3rem;"></i>
                <h5 class="card-title mt-3">Órdenes</h5>
                <p class="card-text text-muted">
                  Gestiona las órdenes de clientes
                </p>
              </div>
            </div>
          </a>
        </div>

        <div class="col-md-4">
          <a routerLink="/tables" class="text-decoration-none">
            <div class="card h-100 border-0 shadow-sm hover-card">
              <div class="card-body text-center p-4">
                <i class="bi bi-grid-3x3 text-info" style="font-size: 3rem;"></i>
                <h5 class="card-title mt-3">Mesas</h5>
                <p class="card-text text-muted">
                  Control de mesas del restaurante
                </p>
              </div>
            </div>
          </a>
        </div>

        <div class="col-md-4">
          <a routerLink="/deliveries" class="text-decoration-none">
            <div class="card h-100 border-0 shadow-sm hover-card">
              <div class="card-body text-center p-4">
                <i class="bi bi-truck text-danger" style="font-size: 3rem;"></i>
                <h5 class="card-title mt-3">Entregas</h5>
                <p class="card-text text-muted">
                  Gestión de entregas a domicilio
                </p>
              </div>
            </div>
          </a>
        </div>

        <div class="col-md-4">
          <a href="/admin" target="_blank" class="text-decoration-none">
            <div class="card h-100 border-0 shadow-sm hover-card">
              <div class="card-body text-center p-4">
                <i class="bi bi-gear text-secondary" style="font-size: 3rem;"></i>
                <h5 class="card-title mt-3">Admin Django</h5>
                <p class="card-text text-muted">
                  Panel de administración
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hover-card {
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .hover-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important;
    }

    a {
      color: inherit;
    }
  `]
})
export class HomeComponent {}