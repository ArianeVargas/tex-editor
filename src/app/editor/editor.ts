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

  modules: any = {
    syntax: true,
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean'],
    ],
  };

  constructor(private contenidoService: ContenidoService) {}

  ngOnInit() {
    this.contenidoService.obtenerContenido().subscribe({
      next: (data: any) => this.contenidoHtml = data.html || '',
      error: (err) => console.error('Error al cargar contenido:', err),
    });
  }

  guardarContenido() {
    if (!this.contenidoHtml.trim()) {
      alert('⚠️ No hay contenido para guardar.');
      return;
    }

    this.contenidoService.guardarContenido({ html: this.contenidoHtml }).subscribe({
      next: () => alert('✅ Contenido guardado en la base de datos'),
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
