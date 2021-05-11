import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GetTermino } from '../interfaces/getTermino.interface';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private error$ = new Subject<string>();
  private terminoBusqueda$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  setError(mensaje: string): void {
    this.error$.next(mensaje);
  }

  getError(): Observable<string> {
    return this.error$.asObservable();
  }

  enviarTerminoBusqueda(termino: string): void {
    this.terminoBusqueda$.next(termino);
  }

  getTerminoBusqueda(): Observable<string> {
    return this.terminoBusqueda$.asObservable();
  }

  getImagenes( termino: string ): Observable<GetTermino> {
    const KEY = '21555019-eb4fa8a896392b28191992602';
    const URL = `https://pixabay.com/api/?key=${KEY}&q=${termino}`;
    return this.http.get<GetTermino>(URL);
  }
}
