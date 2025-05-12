import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GestionInventarioComponent } from "./pages/gestion-inventario/gestion-inventario.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GestionInventarioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inventario-frontend';
}
