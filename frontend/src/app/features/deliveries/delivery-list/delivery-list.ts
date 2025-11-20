import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DeliveriesService } from '../../../core/services/deliveries.service';
import { Delivery } from '../../../core/models/delivery.model';

@Component({
  selector: 'app-delivery-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './delivery-list.html',
})
export class DeliveryListComponent {
  private deliveriesService = inject(DeliveriesService);
  deliveries: Delivery[] = [];
  loading = false;

  ngOnInit() {
    this.loadDeliveries();
  }

  loadDeliveries() {
    this.loading = true;
    this.deliveriesService.getAll().subscribe({
      next: (data) => {
        this.deliveries = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  deleteDelivery(id: number) {
    if (confirm('¿Eliminar esta entrega?')) {
      this.deliveriesService.delete(id).subscribe({
        next: () => this.loadDeliveries()
      });
    }
  }
}