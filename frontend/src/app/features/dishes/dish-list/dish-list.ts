import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DishesService } from '../../../core/services/dishes.service';
import { Dish } from '../../../core/models/dish.model';

@Component({
  selector: 'app-dish-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2><i class="bi bi-egg-fried me-2"></i>Platos</h2>
        <a routerLink="/dishes/new" class="btn btn-primary">
          <i class="bi bi-plus-lg me-2"></i>Nuevo Plato
        </a>
      </div>

      <div *ngIf="loading" class="text-center py-5">
        <div class="spinner-border text-primary"></div>
        <p class="mt-3">Cargando platos...</p>
      </div>

      <div *ngIf="error" class="alert alert-danger">
        <i class="bi bi-exclamation-circle me-2"></i>{{ error }}
      </div>

      <div *ngIf="!loading && dishes.length === 0" class="alert alert-info">
        <i class="bi bi-info-circle me-2"></i>
        No hay platos registrados. ¡Crea el primero!
      </div>

      <div class="row" *ngIf="!loading && dishes.length > 0">
        <div class="col-md-6 col-lg-4 mb-4" *ngFor="let dish of dishes">
          <div class="card h-100">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h5 class="card-title mb-0">{{ dish.name }}</h5>
                <span class="badge" [ngClass]="dish.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'">
                  {{ dish.status === 'ACTIVE' ? 'Activo' : 'Inactivo' }}
                </span>
              </div>
              <p class="text-muted small mb-2">
                <i class="bi bi-tag me-1"></i>{{ dish.category_name }}
              </p>
              <p class="card-text">{{ dish.description }}</p>
              <p class="h4 text-primary mb-3">
                <i class="bi bi-cash me-2"></i>S/ {{ dish.price }}
              </p>
              <div class="btn-group w-100">
                <a [routerLink]="['/dishes/edit', dish.id]" class="btn btn-sm btn-outline-primary">
                  <i class="bi bi-pencil"></i> Editar
                </a>
                <button class="btn btn-sm btn-outline-danger" (click)="deleteDish(dish.id!)">
                  <i class="bi bi-trash"></i> Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      transition: transform 0.2s;
    }
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    }
  `]
})
export class DishListComponent {
  private dishesService = inject(DishesService);
  dishes: Dish[] = [];
  loading = false;
  error = '';

  ngOnInit() {
    this.loadDishes();
  }

  loadDishes() {
    this.loading = true;
    this.error = '';
    this.dishesService.getAll().subscribe({
      next: (data) => {
        this.dishes = data;
        this.loading = false;
        console.log('Platos cargados:', data); // Para debug
      },
      error: (err) => {
        this.error = err.message || 'Error al cargar platos';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  deleteDish(id: number) {
    if (confirm('¿Estás seguro de eliminar este plato?')) {
      this.dishesService.delete(id).subscribe({
        next: () => this.loadDishes(),
        error: (err) => {
          this.error = err.message || 'Error al eliminar plato';
        }
      });
    }
  }
}