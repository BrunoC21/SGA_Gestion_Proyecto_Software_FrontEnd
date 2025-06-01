import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GestionInventarioComponent } from "./pages/gestion-inventario/gestion-inventario.component";
import { GestionProductoComponent } from './pages/gestion-producto/gestion-producto.component';
import { GestionBodegaComponent } from './pages/gestion-bodega/gestion-bodega.component';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    GestionInventarioComponent,
    GestionProductoComponent,
    GestionBodegaComponent,
    HomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inventario-frontend';

  openMenu(): void {
    const overlay = document.getElementById('side-menu-overlay');
    if (overlay) {
      overlay.classList.remove('hidden');
    }
  }

  closeMenu(): void {
    const overlay = document.getElementById('side-menu-overlay');
    if (overlay) {
      overlay.classList.add('hidden');
    }
  }
}
