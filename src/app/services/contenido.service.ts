import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContenidoService {
  private apiUrl = 'https://backend-editor-5auy.onrender.com/api/contenido';
  // private apiUrl = 'http://localhost:3000/api/contenido';

  private actualizacion = new Subject<void>();
  cambios$ = this.actualizacion.asObservable();

  constructor(private http: HttpClient) {}

  guardarContenido(data: { html: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  obtenerContenido(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  notificarCambio() {
    this.actualizacion.next();
  }
}
