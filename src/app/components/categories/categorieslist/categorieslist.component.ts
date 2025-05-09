import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';

import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { CategoriesdetailsComponent } from '../categoriesdetails/categoriesdetails.component';

@Component({
  selector: 'app-categorieslist',
  standalone: true,
  imports: [MdbModalModule, CategoriesdetailsComponent],
  templateUrl: './categorieslist.component.html',
  styleUrl: './categorieslist.component.scss'
})
export class CategorieslistComponent {
  lista: Category[] = [];
  categoryEdit: Category = new Category();

  modalService = inject(MdbModalService);
  @ViewChild('modalCategoryDetail') modalCategoryDetail!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  categoryService = inject(CategoryService);

  constructor() {
    this.findAll();

    const categoryNovo = history.state.categoryNovo;
    const categoryEditado = history.state.categoryEditado;

    if (categoryNovo) {
      categoryNovo.id = 10;
      this.lista.push(categoryNovo);
    }

    if (categoryEditado) {
      const i = this.lista.findIndex(x => x.id === categoryEditado.id);
      this.lista[i] = categoryEditado;
    }
  }

  findAll(): void {
    this.categoryService.getAll().subscribe({
      next: lista => this.lista = lista,
      error: () => Swal.fire({ text: "Ocorreu um erro", icon: "error" })
    });
  }

  deleteById(category: Category): void {
    Swal.fire({
      text: "Tem certeza que deseja deletar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, desejo deletar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteById(category.id).subscribe({
          next: mensagem => {
            Swal.fire({ text: mensagem, icon: "success" });
            this.findAll();
          },
          error: () => Swal.fire({ text: "Ocorreu um erro", icon: "error" })
        });
      } else {
        Swal.fire({ title: "Cancelado", text: "A categoria não foi deletada :)", icon: "success" });
      }
    });
  }

  new(): void {
    this.categoryEdit = new Category();
    this.modalRef = this.modalService.open(this.modalCategoryDetail);
  }

  edit(category: Category): void {
    this.categoryEdit = Object.assign({}, category);
    this.modalRef = this.modalService.open(this.modalCategoryDetail);
  }

  retornoDetail(category: Category): void {
    this.findAll();
    this.modalRef.close();
  }
}
