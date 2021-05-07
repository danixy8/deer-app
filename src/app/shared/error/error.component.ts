import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from '../../services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {

  mensajeError!: string;
  mostrar = false;
  subscripcion: Subscription;

  constructor(private imagenService: ImagenService) {
    this.subscripcion = imagenService.getError().subscribe(data => {
      this.mostrarMensaje();
      this.mensajeError = data;
    });
   }

   ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  mostrarMensaje(): void {
    this.mostrar = true;
    setTimeout(() => {
      this.mostrar = false;
    }, 2000);
  }

}
