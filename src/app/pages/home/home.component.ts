import { AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

export interface Producto {
  imagen: string;
  titulo: string;
  descripcion: string;
  precio: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  productos: Producto[] = [
    {  imagen: 'assets/img/producto1.jpg',  titulo: 'Nombre del Producto1',  descripcion: 'Descripción breve del producto.',  precio: 8990},
    {  imagen: 'assets/img/producto1.jpg',  titulo: 'Nombre del Producto2',  descripcion: 'Descripción breve del producto.',  precio: 4990},
    {  imagen: 'assets/img/producto1.jpg',  titulo: 'Nombre del Producto3',  descripcion: 'Descripción breve del producto.',  precio: 5990},
    {  imagen: 'assets/img/producto1.jpg',  titulo: 'Nombre del Producto4',  descripcion: 'Descripción breve del producto.',  precio: 6990},
    {  imagen: 'assets/img/producto1.jpg',  titulo: 'Nombre del Producto5',  descripcion: 'Descripción breve del producto.',  precio: 8990},
    {  imagen: 'assets/img/producto1.jpg',  titulo: 'Nombre del Producto6',  descripcion: 'Descripción breve del producto.',  precio: 9990}
    
  ];

  startIndex: number = 0;

  mostrarPrev(): void {
    if (this.startIndex > 0) {
      this.startIndex--;
    }
  }

  mostrarNext(): void {
    if (this.startIndex < this.productos.length - 4) {
      this.startIndex++;
    }
  }
}