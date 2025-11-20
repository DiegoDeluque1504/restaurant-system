import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersService } from '../../../core/services/orders.service';
import { TablesService } from '../../../core/services/tables.service';
import { DeliveriesService } from '../../../core/services/deliveries.service';
import { Order } from '../../../core/models/order.model';
import { Table } from '../../../core/models/table.model';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-4">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h4 class="mb-0">
            <i class="bi bi-plus-circle me-2"></i>Nueva Orden
          </h4>
        </div>
        <div class="card-body">
          <div *ngIf="error" class="alert alert-danger">{{ error }}</div>

          <form [formGroup]="orderForm" (ngSubmit)="onSubmit()">
            <div class="mb-3">
              <label class="form-label">Tipo de Orden *</label>
              <select class="form-select" formControlName="order_type"
                      (change)="onOrderTypeChange()"
                      [class.is-invalid]="submitted && f['order_type'].errors">
                <option value="DINE_IN">Para comer aquí</option>
                <option value="TAKEOUT">Para llevar</option>
                <option value="DELIVERY">Delivery</option>
              </select>
            </div>

            <div class="mb-3" *ngIf="orderForm.value.order_type === 'DINE_IN'">
              <label class="form-label">Mesa</label>
              <select class="form-select" formControlName="table">
                <option value="">Seleccione una mesa</option>
                <option *ngFor="let table of tables" [value]="table.id">
                  Mesa {{ table.number }} ({{ table.capacity }} personas) - {{ table.status }}
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Total *</label>
              <input type="number" step="0.01" class="form-control" formControlName="total"
                     [class.is-invalid]="submitted && f['total'].errors">
              <div class="invalid-feedback" *ngIf="submitted && f['total'].errors">
                El total es requerido
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Estado</label>
              <select class="form-select" formControlName="status">
                <option value="PENDING">Pendiente</option>
                <option value="PREPARING">En Preparación</option>
                <option value="READY">Listo</option>
                <option value="DELIVERED">Entregado</option>
              </select>
            </div>

            <div class="d-flex gap-2">
              <button type="submit" class="btn btn-primary" [disabled]="loading">
                <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
                Guardar
              </button>
              <a routerLink="/orders" class="btn btn-secondary">Cancelar</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class OrderFormComponent {
  private fb = inject(FormBuilder);
  private ordersService = inject(OrdersService);
  private tablesService = inject(TablesService);
  private router = inject(Router);

  orderForm = this.fb.group({
    order_type: ['DINE_IN', Validators.required],
    table: [null as number | null],
    delivery: [null as number | null],
    total: ['', [Validators.required, Validators.min(0)]],
    status: ['PENDING']
  });

  tables: Table[] = [];
  loading = false;
  submitted = false;
  error = '';

  ngOnInit() {
    this.loadTables();
  }

  loadTables() {
    this.tablesService.getAll().subscribe({
      next: (data) => this.tables = data.filter(t => t.status === 'AVAILABLE')
    });
  }

  onOrderTypeChange() {
    const type = this.orderForm.value.order_type;
    if (type !== 'DINE_IN') {
      this.orderForm.patchValue({ table: null });
    }
  }

  get f() {
    return this.orderForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.orderForm.invalid) return;

    this.loading = true;
    const data = this.orderForm.value as any;

    this.ordersService.create(data).subscribe({
      next: () => this.router.navigate(['/orders']),
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}