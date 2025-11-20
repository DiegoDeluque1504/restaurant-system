import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriesService } from '../../../core/services/categories.service';
import { Category, CATEGORY_STATUS } from '../../../core/models/category.model';

@Component({
  standalone: true,
  selector: 'app-category-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './category-form.html',
  styleUrls: ['./category-form.css']
})
export class CategoryForm implements OnInit {

  form!: FormGroup;
  editing = false;
  id!: number;

  statusOptions = Object.values(CATEGORY_STATUS);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      description: [''],
      status: ['ACTIVE']
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editing = true;
        this.id = params['id'];
        this.loadCategory();
      }
    });
  }

  loadCategory() {
    this.categoriesService.getById(this.id).subscribe(data => {
      this.form.patchValue(data);
    });
  }

  save() {
    if (this.form.invalid) return;

    const dto: Category = this.form.value;

    if (this.editing) {
      this.categoriesService.update(this.id, dto).subscribe(() => {
        this.router.navigate(['/categories']);
      });
    } else {
      this.categoriesService.create(dto).subscribe(() => {
        this.router.navigate(['/categories']);
      });
    }
  }
}
