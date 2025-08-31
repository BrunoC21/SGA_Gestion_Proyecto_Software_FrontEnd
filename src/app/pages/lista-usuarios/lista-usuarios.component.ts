import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../pipes/filter.pipe';
import { LimitPipe } from '../../pipes/limit-pipe.pipe';
import { PaginatePipe } from '../../pipes/paginate.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-usuarios',
  imports: [CommonModule, FormsModule, FilterPipe, LimitPipe, PaginatePipe],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit{
  currentPage = 1;

  get totalPages(): number {
    return Math.ceil((this.posts.filter(post =>
      post.RUT.toLowerCase().includes(this.filterPost.toLowerCase())
    ).length || 1) / this.selectedLimit);
  }

  selectedLimit = 5; // valor por defecto
  get filteredPosts() {
    const filtered = this.posts.filter(post =>
      post.RUT.toLowerCase().includes(this.filterPost.toLowerCase())
    );
    return filtered.slice(0, this.selectedLimit);
  }
  
  constructor(){}
  filterPost = "";
  posts = [
    {
     "RUT":"21.144.410-k",
     "nombre_completo":"Rodrigo Ignacio Jara Rodriguez",
     "fecha_nacimiento":"14/10/2002",
     "edad":22,
     "beneficio":"Fonasa", 
     "region":"Ñuble", 
     "comuna":"Chillan", 
     "direccion":"calle xxxxxxxxxxx N°xxxx", 
    },
    {
     "RUT":"20.143.440-k",
     "nombre_completo":"Matt",
     "fecha_nacimiento":"14/10/2002",
     "edad":20,
     "beneficio":"Fonasa", 
     "region":"Ñuble", 
     "comuna":"Chillan viejo", 
     "direccion":"calle xxxxxxxxxxx N°xxxx", 
    }
  ]

  ngOnInit() {  }
}
