import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../pipes/filter.pipe';
import { LimitPipe } from '../../pipes/limit-pipe.pipe';
import { PaginatePipe } from '../../pipes/paginate.pipe';
import { FormsModule } from '@angular/forms';
import { SucursalService } from '../../services/sucursal.service';

@Component({
  selector: 'app-gestion-bodega',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe, LimitPipe, PaginatePipe],
  templateUrl: './gestion-bodega.component.html',
  styleUrls: ['./gestion-bodega.component.css']
})
export class GestionBodegaComponent {
  currentPage = 1;

  get totalPages(): number {
    return Math.ceil((this.posts.filter(post =>
      post.warehouse_Name.toLowerCase().includes(this.filterPost.toLowerCase())
    ).length || 1) / this.selectedLimit);
  }

  selectedLimit = 5; // valor por defecto
  get filteredPosts() {
    const filtered = this.posts.filter(post =>
      post.warehouse_Name.toLowerCase().includes(this.filterPost.toLowerCase())
    );
    return filtered.slice(0, this.selectedLimit);
  }
  
  constructor(){}
  filterPost = "";
  posts = [
    {
      "id": 1,
      "warehouse_Name": "Sucursal los vilos",
      "direccion": "123 calle pan"
    }
  ];
  ngOnInit() {  
  }
}
