import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContenidoService {
  private apiUrl = 'https://backend-editor-5auy.onrender.com/api/contenido';

  constructor(private http: HttpClient) {}

  guardarContenido(data: { html: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  obtenerContenido(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
