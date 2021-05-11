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

  constructor(private imagenService: ImagenService) {
    this.subscription = this.imagenService
    .getTerminoBusqueda()
    .subscribe(data => {
      this.termino = data;
      this.obtenerImagenes();
    });
  }

  ngOnInit(): void {}

  obtenerImagenes(): void {
    this.imagenService
    .getImagenes(this.termino)
    .subscribe(data => {
      this.resultados = data.hits;
      console.log(data);
      if (data.hits.length === 0){
        this.imagenService.setError(`oopss... No encontramos ningun resultado`);
        return;
      }
    }, error => {
      this.imagenService.setError('Opps... Ocurrio un error');
    });
  }

}
