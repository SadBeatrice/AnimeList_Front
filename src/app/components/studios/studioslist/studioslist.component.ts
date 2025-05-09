import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';

import { Studio } from '../../../models/studio';
import { StudioService } from '../../../services/studio.service';
import { StudiosdetailsComponent } from '../studiosdetails/studiosdetails.component';

@Component({
  selector: 'app-studioslist',
  standalone: true,
  imports: [MdbModalModule, StudiosdetailsComponent],
  templateUrl: './studioslist.component.html',
  styleUrl: './studioslist.component.scss'
})
export class StudioslistComponent {

  lista: Studio[] = [];
  studioEdit: Studio = new Studio();

  studioService = inject(StudioService);
  modalService = inject(MdbModalService);

  @ViewChild('modalStudioDetail') modalStudioDetail!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor() {
    this.findAll();

    let studioNovo = history.state.studioNovo;
    let studioEditado = history.state.studioEditado;

    if (studioNovo) {
      this.lista.push(studioNovo);
    }

    if (studioEditado) {
      let indice = this.lista.findIndex(x => x.id === studioEditado.id);
      this.lista[indice] = studioEditado;
    }
  }

  findAll() {
    this.studioService.findAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: () => {
        Swal.fire({
          text: "Ocorreu um erro ao buscar estúdios",
          icon: "error",
        });
      },
    });
  }

  deleteById(studio: Studio) {
    Swal.fire({
      text: "Tem certeza que deseja deletar este estúdio?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, desejo deletar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.studioService.deleteById(studio.id).subscribe({
          next: mensagem => {
            Swal.fire({
              text: mensagem,
              icon: "success"
            });
            this.findAll();
          },
          error: () => {
            Swal.fire({
              text: "Erro ao deletar estúdio",
              icon: "error",
            });
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelado",
          text: "O estúdio não foi deletado :)",
          icon: "success"
        });
      }
    });
  }

  new() {
    this.studioEdit = new Studio();
    this.modalRef = this.modalService.open(this.modalStudioDetail);
  }

  edit(studio: Studio) {
    this.studioEdit = Object.assign({}, studio);
    this.modalRef = this.modalService.open(this.modalStudioDetail);
  }

  retornoDetail(studio: Studio) {
    this.findAll();
    this.modalRef.close();
  }
}