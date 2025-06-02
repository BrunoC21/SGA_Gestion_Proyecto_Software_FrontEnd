import { Component, OnInit } from '@angular/core';
import { UsuarioService, User } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  user?: User;
  previewImage: string = '';  // para la foto subida

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.whoami().subscribe({
      next: (data) => {
        this.user = data;
        // Puedes poner la foto por defecto o si el usuario tiene una URL
        this.previewImage = ''; // aquí puedes poner data.imageUrl si existiera
      },
      error: (err) => console.error('Error cargando usuario', err)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result as string;
      // Aquí podrías hacer upload al backend si quieres
    };
    reader.readAsDataURL(file);
  }
}
