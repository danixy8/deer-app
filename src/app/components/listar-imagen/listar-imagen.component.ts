import { Component, OnInit } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';
import { Subscription } from 'rxjs';
import { GetTermino } from '../../interfaces/getTermino.interface';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent implements OnInit {
  termino = '';
  subscription: Subscription;
  resultados!: any[];
  loading = false;
  imagenesPorPagina = 30;
  paginaActual = 1;
  calcularTotalPagina = 0;

  constructor(private imagenService: ImagenService) {
    this.subscription = this.imagenService
    .getTerminoBusqueda()
    .subscribe(data => {
      this.termino = data;
      this.paginaActual = 1;
      this.loading = true;
      this.obtenerImagenes();
    });
  }

  ngOnInit(): void {}

  obtenerImagenes(): void {
    this.imagenService
    .getImagenes(this.termino, this.imagenesPorPagina, this.paginaActual)
    .subscribe(data => {
      this.loading = false;
      this.resultados = data.hits;
      if (data.hits.length === 0){
        this.imagenService.setError(`oopss... No encontramos ningun resultado`);
        return;
      }
      this.calcularTotalPagina = Math.ceil(data.totalHits / this.imagenesPorPagina);
    }, error => {
      this.imagenService.setError('Opps... Ocurrio un error');
    });
  }

  paginaAnterior(): void {
    this.paginaActual--;
    this.loading = true;
    this.resultados = [];
    this.obtenerImagenes();
  }

  paginaposterior(): void {
    this.paginaActual++;
    this.loading = true;
    this.resultados = [];
    this.obtenerImagenes();
  }

  paginaAnteriorClass(): boolean {
    if ( this.paginaActual === 1 ){
      return false;
    } else {
      return true;
    }
  }

  paginaPosteriorClass(): boolean {
    if ( this.paginaActual === this.calcularTotalPagina ){
      return false;
    }else{
      return true;
    }
  }

}
