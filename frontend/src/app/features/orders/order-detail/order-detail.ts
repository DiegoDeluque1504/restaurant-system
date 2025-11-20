import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrdersService } from '../../../services/orders';
import { Order } from '../../../core/models/order.model';

@Component({
  standalone: true,
  selector: 'app-order-detail',
  templateUrl: './order-detail.html',
  styleUrls: ['./order-detail.css'],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class OrderDetailComponent implements OnInit {

  orderId!: number;
  order!: Order;

  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadOrder();
  }

  loadOrder() {
    this.loading = true;
    this.error = '';

    this.ordersService.getOrder(this.orderId).subscribe({
      next: (data) => {
        this.order = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el detalle de la orden.';
        this.loading = false;
      }
    });
  }
}
