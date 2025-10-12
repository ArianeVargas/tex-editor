import { Component } from '@angular/core';
import { EditorComponent } from './editor/editor';
import { VerContenidoComponent } from './view/ver-contenido';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EditorComponent, VerContenidoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {}
