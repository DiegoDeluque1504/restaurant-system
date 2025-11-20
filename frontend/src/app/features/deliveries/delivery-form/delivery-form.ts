import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveriesService } from '../../../core/services/deliveries.service';
import { DeliveryPerson } from '../../../core/models/delivery.model';

@Component({
  selector: 'app-delivery-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './delivery-form.html',
})
export class DeliveryFormComponent {
  private fb = inject(FormBuilder);
  private deliveriesService = inject(DeliveriesService);
  private router = inject(Router);

  deliveryForm = this.fb.group({
    customer_name: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    cost: ['', [Validators.required, Validators.min(0)]],
    delivery_person: [null as number | null]
  });

  deliveryPersons: DeliveryPerson[] = [];
  loading = false;
  submitted = false;

  ngOnInit() {
    this.loadDeliveryPersons();
  }

  loadDeliveryPersons() {
    this.deliveriesService.getAllPersons().subscribe({
      next: (data) => this.deliveryPersons = data
    });
  }

  get f() {
    return this.deliveryForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.deliveryForm.invalid) return;

    this.loading = true;
    this.deliveriesService.create(this.deliveryForm.value as any).subscribe({
      next: () => this.router.navigate(['/deliveries']),
      error: () => this.loading = false
    });
  }
}