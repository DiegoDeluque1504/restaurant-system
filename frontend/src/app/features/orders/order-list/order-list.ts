import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrdersService } from '../../../core/services/orders.service';
import { Order, ORDER_STATUS_LABELS, ORDER_TYPE_LABELS } from '../../../core/models/order.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2><i class="bi bi-receipt me-2"></i>Órdenes</h2>
        <a routerLink="/orders/new" class="btn btn-primary">
          <i class="bi bi-plus-lg me-2"></i>Nueva Orden
        </a>
      </div>

      <div *ngIf="loading" class="text-center py-5">
        <div class="spinner-border text-primary"></div>
        <p class="mt-3">Cargando órdenes...</p>
      </div>

      <div *ngIf="error" class="alert alert-danger">
        <i class="bi bi-exclamation-circle me-2"></i>{{ error }}
      </div>

      <div *ngIf="!loading && orders.length === 0" class="alert alert-info">
        <i class="bi bi-info-circle me-2"></i>
        No hay órdenes registradas
      </div>

      <div class="row" *ngIf="!loading && orders.length > 0">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead class="table-primary">
                <tr>
                  <th>#</th>
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Total</th>
                  <th>Mesa/Delivery</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let order of orders">
                  <td>{{ order.id }}</td>
                  <td>{{ order.date | date:'short' }}</td>
                  <td>
                    <span class="badge bg-info">
                      {{ getOrderTypeLabel(order.order_type) }}
                    </span>
                  </td>
                  <td>
                    <span class="badge" [ngClass]="getStatusClass(order.status)">
                      {{ getStatusLabel(order.status) }}
                    </span>
                  </td>
                  <td class="fw-bold">S/ {{ order.total }}</td>
                  <td>
                    <span *ngIf="order.table">Mesa {{ order.table }}</span>
                    <span *ngIf="order.delivery">Delivery #{{ order.delivery }}</span>
                    <span *ngIf="!order.table && !order.delivery">Para llevar</span>
                  </td>
                  <td>
                    <div class="btn-group btn-group-sm">
                      <a [routerLink]="['/orders', order.id]" class="btn btn-outline-primary">
                        <i class="bi bi-eye"></i>
                      </a>
                      <button class="btn btn-outline-danger" (click)="deleteOrder(order.id!)">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .table {
      background: white;
      border-radius: 10px;
    }
  `]
})
export class OrderListComponent {
  private ordersService = inject(OrdersService);
  orders: Order[] = [];
  loading = false;
  error = '';
  statusLabels = ORDER_STATUS_LABELS;
  typeLabels = ORDER_TYPE_LABELS;

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.error = '';
    this.ordersService.getAll().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
        console.log('Órdenes cargadas:', data);
      },
      error: (err) => {
        this.error = err.message || 'Error al cargar órdenes';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  deleteOrder(id: number) {
    if (confirm('¿Estás seguro de eliminar esta orden?')) {
      this.ordersService.delete(id).subscribe({
        next: () => this.loadOrders(),
        error: (err) => {
          this.error = err.message || 'Error al eliminar orden';
        }
      });
    }
  }

  getStatusLabel(status: string): string {
    return this.statusLabels[status as keyof typeof ORDER_STATUS_LABELS] || status;
  }

  getOrderTypeLabel(type: string): string {
    return this.typeLabels[type as keyof typeof ORDER_TYPE_LABELS] || type;
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'PENDING': 'bg-warning',
      'PREPARING': 'bg-info',
      'READY': 'bg-success',
      'DELIVERED': 'bg-primary',
      'CANCELLED': 'bg-danger'
    };
    return classes[status] || 'bg-secondary';
  }
}