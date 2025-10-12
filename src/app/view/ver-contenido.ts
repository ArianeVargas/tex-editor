import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenidoService } from '../services/contenido.service';

@Component({
  selector: 'app-ver-contenido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-contenido.html',
})
export class VerContenidoComponent implements OnInit {
  contenidos: any[] = [];
  paginaActual = 1;
  itemsPorPagina = 5;

  constructor(private contenidoService: ContenidoService) {}

  ngOnInit() {
    this.cargarContenidos();
    this.contenidoService.cambios$.subscribe(() => {
      this.cargarContenidos();
    });
  }

  cargarContenidos() {
    this.contenidoService.obtenerContenido().subscribe({
      next: (data: any[]) => {
        this.contenidos = data.reverse(); 
      },
      error: (err) => console.error('❌ Error al cargar los contenidos:', err),
    });
  }

  get contenidosPaginados() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    return this.contenidos.slice(inicio, inicio + this.itemsPorPagina);
  }

  totalPaginas() {
    return Math.ceil(this.contenidos.length / this.itemsPorPagina);
  }

  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas()) {
      this.paginaActual = pagina;
    }
  }
}
