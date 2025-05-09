import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AnimeService } from '../../../services/anime.service';
import { StudioService } from '../../../services/studio.service';
import { CategoryService } from '../../../services/category.service';

import { Category } from '../../../models/category';
import { Anime } from '../../../models/anime';
import { Studio } from '../../../models/studio';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-animesdetails',
  standalone: true,
  imports: [CommonModule, FormsModule, MdbFormsModule],
  templateUrl: './animesdetails.component.html',
  styleUrls: ['./animesdetails.component.scss']
})

export class AnimesdetailsComponent {

  @Input("anime") anime: Anime = new Anime();
  @Output("retorno") retorno = new EventEmitter<any>();

  studios: Studio[] = [];
  categories: Category[] = [];

  router = inject(ActivatedRoute);
  router2 = inject(Router);
  animeService = inject(AnimeService);
  studioService = inject(StudioService);
  categoryService = inject(CategoryService);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
    this.loadStudios();
    this.loadCategories();
  }

  findById(id: number) {
    this.animeService.findById(id).subscribe({
      next: retorno => {
        this.anime = retorno;
      },
      error: erro => {
        Swal.fire({
          text: "Ocorreu um erro",
          icon: "error",
        });
      }
    });
  }

  save() {
    if (this.anime.id > 0) {
      this.animeService.update(this.anime, this.anime.id).subscribe({
        next: mensagem => {
          Swal.fire({
            text: mensagem,
            icon: "success",
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(['admin/animes'], { state: { animeEditado: this.anime } });
          this.retorno.emit(this.anime);
        },
        error: erro => {
          Swal.fire({
            text: "Ocorreu um erro",
            icon: "error",
          });
        }
      });
    } else {
      this.animeService.save(this.anime).subscribe({
        next: mensagem => {
          Swal.fire({
            text: mensagem,
            icon: "success"
          });
          this.router2.navigate(['admin/animes'], { state: { animeNovo: this.anime } });
          this.retorno.emit(this.anime);
        },
        error: erro => {
          Swal.fire({
            text: "Ocorreu um erro",
            icon: "error",
          });
        }
      });
    }
  }

  ngOnInit(): void {
    this.loadCategories();
  }
  
  toggleCategory(category: Category): void {
    const index = this.anime.categories.findIndex(c => c.id === category.id);
    if (index === -1) {
      this.anime.categories.push(category);
    } else {
      this.anime.categories.splice(index, 1);
    }
  }

  loadStudios(): void {
    this.studioService.findAll().subscribe({
      next: data => this.studios = data,
      error: () => { 
        Swal.fire({
          text: "Ocorreu um erro",
          icon: "error",
        });
       }
    });
  }
  
  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: data => this.categories = data,
      error: () => { 
        Swal.fire({
        text: "Ocorreu um erro",
        icon: "error",
      }); }
    });
  }
}
