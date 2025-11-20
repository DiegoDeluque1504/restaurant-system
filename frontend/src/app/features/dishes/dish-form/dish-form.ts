import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { DishesService } from '../../../core/services/dishes.service';
import { CategoriesService } from '../../../core/services/categories.service';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-dish-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container mt-4">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h4 class="mb-0">
            <i class="bi bi-plus-circle me-2"></i>
            {{ isEditMode ? 'Editar Plato' : 'Nuevo Plato' }}
          </h4>
        </div>
        <div class="card-body">
          <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
          <div *ngIf="success" class="alert alert-success">{{ success }}</div>

          <form [formGroup]="dishForm" (ngSubmit)="onSubmit()">
            <div class="mb-3">
              <label class="form-label">Nombre *</label>
              <input type="text" class="form-control" formControlName="name"
                     [class.is-invalid]="submitted && f['name'].errors">
              <div class="invalid-feedback" *ngIf="submitted && f['name'].errors">
                El nombre es requerido (mín. 3 caracteres)
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Descripción *</label>
              <textarea class="form-control" rows="3" formControlName="description"
                        [class.is-invalid]="submitted && f['description'].errors"></textarea>
              <div class="invalid-feedback" *ngIf="submitted && f['description'].errors">
                La descripción es requerida
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Precio *</label>
                <input type="number" step="0.01" class="form-control" formControlName="price"
                       [class.is-invalid]="submitted && f['price'].errors">
                <div class="invalid-feedback" *ngIf="submitted && f['price'].errors">
                  El precio es requerido
                </div>
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label">Categoría *</label>
                <select class="form-select" formControlName="category"
                        [class.is-invalid]="submitted && f['category'].errors">
                  <option value="">Seleccione una categoría</option>
                  <option *ngFor="let cat of categories" [value]="cat.id">
                    {{ cat.name }}
                  </option>
                </select>
                <div class="invalid-feedback" *ngIf="submitted && f['category'].errors">
                  Seleccione una categoría
                </div>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Estado</label>
              <select class="form-select" formControlName="status">
                <option value="ACTIVE">Activo</option>
                <option value="INACTIVE">Inactivo</option>
              </select>
            </div>

            <div class="d-flex gap-2">
              <button type="submit" class="btn btn-primary" [disabled]="loading">
                <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
                <i *ngIf="!loading" class="bi bi-save me-2"></i>
                Guardar
              </button>
              <a routerLink="/dishes" class="btn btn-secondary">Cancelar</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class DishFormComponent {
  private fb = inject(FormBuilder);
  private dishesService = inject(DishesService);
  private categoriesService = inject(CategoriesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  dishForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required],
    price: ['', [Validators.required, Validators.min(0)]],
    category: ['', Validators.required],
    status: ['ACTIVE']
  });

  categories: Category[] = [];
  loading = false;
  submitted = false;
  error = '';
  success = '';
  isEditMode = false;
  dishId: number | null = null;

  ngOnInit() {
    this.loadCategories();
    this.checkEditMode();
  }

  loadCategories() {
    this.categoriesService.getAll().subscribe({
      next: (data) => this.categories = data
    });
  }

  checkEditMode() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.dishId = Number(id);
      this.loadDish(this.dishId);
    }
  }

  loadDish(id: number) {
    this.dishesService.getById(id).subscribe({
      next: (dish) => {
        this.dishForm.patchValue({
          name: dish.name,
          description: dish.description,
          price: dish.price.toString(),
          category: dish.category.toString(),
          status: dish.status
        });
      }
    });
  }

  get f() {
    return this.dishForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.dishForm.invalid) return;

    this.loading = true;
    
    const data = {
      name: this.dishForm.value.name!,
      description: this.dishForm.value.description!,
      price: parseFloat(this.dishForm.value.price!),
      category: parseInt(this.dishForm.value.category!),
      status: this.dishForm.value.status! as 'ACTIVE' | 'INACTIVE'
    };

    const request = this.isEditMode && this.dishId
      ? this.dishesService.update(this.dishId, data as any)
      : this.dishesService.create(data as any);

    request.subscribe({
      next: () => {
        this.success = 'Plato guardado exitosamente';
        setTimeout(() => this.router.navigate(['/dishes']), 1500);
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}