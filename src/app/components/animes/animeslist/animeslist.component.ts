import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Anime } from '../../../models/anime';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { AnimesdetailsComponent } from '../animesdetails/animesdetails.component';
import { AnimeService } from '../../../services/anime.service';


@Component({
  selector: 'app-animeslist',
  imports: [MdbModalModule, AnimesdetailsComponent],
  templateUrl: './animeslist.component.html',
  styleUrl: './animeslist.component.scss'
})


export class AnimeslistComponent {

  lista: Anime[] = [];
  animeEdit: Anime = new Anime();

  // Elementos dos Modals
  modalService = inject(MdbModalService);
  @ViewChild('modalAnimeDetail') modalAnimeDetail!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;


  animesService = inject(AnimeService);


  constructor() {
    this.findAll();

    let animeNovo = history.state.animeNovo;
    let animeEditado = history.state.animeEditado;

    if (animeNovo) {
      // animeNovo.id = 10
      this.lista.push(animeNovo);
    }

    if (animeEditado) {
      let indice = this.lista.findIndex(x => { return x.id == animeEditado.id });
      this.lista[indice] = animeEditado;

    }
  }


  findAll(){
    this.animesService.findAll().subscribe({
      next: lista => { // Igual try catch;
          this.lista = lista;
      },
      error: erro => {
        Swal.fire({
          text: "Ocorreu um erro",
          icon: "error",
        });
      },
    })
  }


  deleteById(anime: Anime) {
    Swal.fire({
      text: "Tem certeza que deseja deletar?",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Sim, desejo deletar!",
      cancelButtonText: "Cancelar"      
    }).then((result) => {

      if (result.isConfirmed) {
          this.animesService.deleteById(anime.id).subscribe({
          next: mensagem => {
            Swal.fire({
              text: mensagem,
              icon: "success"
            });
            this.findAll();
          },
          error: erro => {
            Swal.fire({
              text: "Ocorreu um erro",
              icon: "error",
            });          
          },
        });

      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: "Cancelado",
          text: "O anime não foi deletado :)",
          icon: "success"
        });
      }
    });
  }


  new(){
    this.animeEdit = new Anime();
    this.modalRef = this.modalService.open(this.modalAnimeDetail);
  }


  edit(anime: Anime){
    this.animeEdit = Object.assign({}, anime); // clonando para evitar ref de objeto;
    this.modalRef = this.modalService.open(this.modalAnimeDetail);
  }


  retornoDetail(anime: Anime){
    this.findAll();
    this.modalRef.close();
  }
}
