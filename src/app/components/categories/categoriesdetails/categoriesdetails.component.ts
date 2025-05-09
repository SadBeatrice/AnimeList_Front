import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-categoriesdetails',
  standalone: true,
  imports: [CommonModule, FormsModule, MdbFormsModule],
  templateUrl: './categoriesdetails.component.html',
  styleUrls: ['./categoriesdetails.component.scss']
})
export class CategoriesdetailsComponent {
  @Input("category") category: Category = new Category();
  @Output("retorno") retorno = new EventEmitter<any>();

  categoryService = inject(CategoryService);
  router = inject(Router);

  save(): void {
    if (this.category.id > 0) {
      this.categoryService.update(this.category, this.category.id).subscribe({
        next: mensagem => {
          Swal.fire({ text: mensagem, icon: 'success' });
          this.router.navigate(['admin/categories'], { state: { categoryEditado: this.category } });
          this.retorno.emit(this.category);
        },
        error: () => {
          Swal.fire({ text: "Ocorreu um erro", icon: "error" });
        }
      });
    } else {
      this.categoryService.save(this.category).subscribe({
        next: mensagem => {
          Swal.fire({ text: mensagem, icon: 'success' });
          this.router.navigate(['admin/categories'], { state: { categoryNovo: this.category } });
          this.retorno.emit(this.category);
        },
        error: () => {
          Swal.fire({ text: "Ocorreu um erro", icon: "error" });
        }
      });
    }
  }
}
