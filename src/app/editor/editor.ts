import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ContenidoService } from '../services/contenido.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillModule],
  templateUrl: './editor.html',
})
export class EditorComponent implements OnInit {
  contenidoHtml = '';
  previewHtml: string | null = null;

  modules = {
    toolbar: [
      ['bold', 'italic'],           // Negrita y Cursiva
      ['link'],                     // Insertar hipervínculo
      [{ list: 'ordered' }, { list: 'bullet' }], // Listas ordenadas y no ordenadas
    ]
  };
  formats = ['bold', 'italic', 'list', 'bullet', 'link'];
  constructor(private contenidoService: ContenidoService) {}

  ngOnInit() {
    this.contenidoService.obtenerContenido().subscribe({
      next: (data: any) => this.contenidoHtml = data.html || '',
      error: (err) => console.error('Error al cargar contenido:', err),
    });
  }

  guardarContenido() {
    const contenidoLimpio = this.contenidoHtml.replace(/<p><br><\/p>/g, '').trim();
    if (!contenidoLimpio) {
      alert('⚠️ No hay contenido para guardar.');
      return;
    }

    this.contenidoService.guardarContenido({ html: this.contenidoHtml }).subscribe({
      next: () => {        
        alert('✅ Contenido guardado en la base de datos');
        console.log('Contenido guardado:', this.contenidoHtml);
        this.contenidoService.notificarCambio();
      },
    
      error: (err) => console.error('❌ Error al guardar contenido:', err),
    });
  }

  previsualizar() {
    this.previewHtml = this.contenidoHtml || null;
  }

  limpiar() {
    this.contenidoHtml = '';
    this.previewHtml = null;
  }

  onContentChanged(event: any) {
    if (event?.html !== undefined) {
      this.contenidoHtml = event.html;
    }
  }
}
