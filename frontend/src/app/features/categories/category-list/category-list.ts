import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../../core/services/categories.service';
import { Category } from '../../../core/models/category.model';

@Component({
  standalone: true,
  selector: 'app-category-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.css']
})
export class CategoryList implements OnInit {

  categories: Category[] = [];
  loading = true;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoriesService.getAll().subscribe({
      next: data => {
        this.categories = data;
        this.loading = false;
      },
      error: err => console.error(err)
    });
  }

  deleteCategory(id: number) {
    if (!confirm('¿Deseas eliminar esta categoría?')) return;
    this.categoriesService.delete(id).subscribe(() => {
      this.categories = this.categories.filter(c => c.id !== id);
    });
  }
}
