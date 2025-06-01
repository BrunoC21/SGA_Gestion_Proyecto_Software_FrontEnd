import { AfterViewInit, Component, ElementRef, ViewChild, CommonModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('manualCarouselTrack') trackRef!: ElementRef;

  productos = [
    { nombre: 'Paracetamol', precio: 1990, imagen: 'assets/images/med1.jpg' },
    { nombre: 'Ibuprofeno', precio: 2590, imagen: 'assets/images/med2.jpg' },
    { nombre: 'Aspirina', precio: 1890, imagen: 'assets/images/med3.jpg' },
    { nombre: 'Amoxicilina', precio: 3290, imagen: 'assets/images/med4.jpg' },
    { nombre: 'Omeprazol', precio: 2990, imagen: 'assets/images/med5.jpg' },
    { nombre: 'Vitamina C', precio: 1590, imagen: 'assets/images/med6.jpg' },
    { nombre: 'Loratadina', precio: 1990, imagen: 'assets/images/med7.jpg' },
    { nombre: 'Antigripal', precio: 2390, imagen: 'assets/images/med8.jpg' }
  ];

  ngAfterViewInit() {
    const track = this.trackRef.nativeElement as HTMLElement;
    const btnNext = document.querySelector('.next-manual') as HTMLButtonElement | null;
    const btnPrev = document.querySelector('.prev-manual') as HTMLButtonElement | null;

    const scrollAmount = track.clientWidth / 5 * 2.5; // desplaza 2.5 elementos

    btnNext?.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    btnPrev?.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }
}