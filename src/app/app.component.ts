import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GestionInventarioComponent } from "./pages/gestion-inventario/gestion-inventario.component";
import { GestionProductoComponent } from './pages/gestion-producto/gestion-producto.component';
import { GestionBodegaComponent } from './pages/gestion-bodega/gestion-bodega.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GestionInventarioComponent, GestionProductoComponent, GestionBodegaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inventario-frontend';
}
