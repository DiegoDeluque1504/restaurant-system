import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-dark text-light text-center py-3 mt-auto">
      <div class="container">
        <p class="mb-0">
          <i class="bi bi-c-circle me-1"></i>
          {{ currentYear }} Restaurant Management System - 
          Desarrollado con Angular 20 & Django
        </p>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      font-size: 0.9rem;
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}