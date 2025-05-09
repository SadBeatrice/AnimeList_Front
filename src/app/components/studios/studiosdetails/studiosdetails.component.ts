import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Studio } from '../../../models/studio';
import { StudioService } from '../../../services/studio.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-studiosdetails',
  standalone: true,
  imports: [CommonModule, FormsModule, MdbFormsModule],
  templateUrl: './studiosdetails.component.html',
  styleUrls: ['./studiosdetails.component.scss']
})
export class StudiosdetailsComponent {

  @Input("studio") studio: Studio = new Studio();
  @Output("retorno") retorno = new EventEmitter<any>();

  studioService = inject(StudioService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  constructor() {
    const id = this.route.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number): void {
    this.studioService.findById(id).subscribe({
      next: data => this.studio = data,
      error: () => {
        Swal.fire({
          text: "Ocorreu um erro ao buscar o estúdio",
          icon: "error"
        });
      }
    });
  }

  save(): void {
    if (this.studio.id > 0) {
      this.studioService.update(this.studio, this.studio.id).subscribe({
        next: msg => {
          Swal.fire({
            text: msg,
            icon: "success"
          });
          this.router.navigate(['admin/studios'], { state: { studioEditado: this.studio } });
          this.retorno.emit(this.studio);
        },
        error: () => {
          Swal.fire({
            text: "Ocorreu um erro",
            icon: "error"
          });
        }
      });
    } else {
      this.studioService.save(this.studio).subscribe({
        next: msg => {
          Swal.fire({
            text: msg,
            icon: "success"
          });
          this.router.navigate(['admin/studios'], { state: { studioNovo: this.studio } });
          this.retorno.emit(this.studio);
        },
        error: () => {
          Swal.fire({
            text: "Ocorreu um erro",
            icon: "error"
          });
        }
      });
    }
  }
}
