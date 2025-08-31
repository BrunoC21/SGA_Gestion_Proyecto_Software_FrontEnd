import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../pipes/filter.pipe';
import { LimitPipe } from '../../pipes/limit-pipe.pipe';
import { PaginatePipe } from '../../pipes/paginate.pipe';
import { FormsModule } from '@angular/forms';
import { InventarioService } from '../../services/inventario.service';
import { MedicamentoService } from '../../services/medicamento.service';
import { SucursalService } from '../../services/sucursal.service';
import { SucursalInventarioService } from '../../services/sucursal-inventario.service';


@Component({
  selector: 'app-gestion-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe, LimitPipe, PaginatePipe],
  templateUrl: './gestion-inventario.component.html',
  styleUrls: ['./gestion-inventario.component.css']
})
export class GestionInventarioComponent implements OnInit {

  currentPage = 1;

  get totalPages(): number {
    return Math.ceil((this.posts.filter(post =>
      post.name.toLowerCase().includes(this.filterPost.toLowerCase())
    ).length || 1) / this.selectedLimit);
  }

  selectedLimit = 5; // valor por defecto
  get filteredPosts() {
    const filtered = this.posts.filter(post =>
      post.name.toLowerCase().includes(this.filterPost.toLowerCase())
    );
    return filtered.slice(0, this.selectedLimit);
  }
  
  constructor(){}
  filterPost = "";
  posts = [
    {
      "id": 1,
      "name": "ibuprofeno",
      "descripcion": "antinflamatorio",
      "lote": 1,
      "tipo": "pastilla",
      "medida": "mg",
      "stock": 14
    },
    {
      "id": 2,
      "name": "pastilla 2",
      "descripcion": "antinflamatorio",
      "lote": 1,
      "tipo": "pastilla",
      "medida": "mg",
      "stock": 14
    },
    {
      "id": 3,
      "name": "pastilla 3",
      "descripcion": "antistaminico",
      "lote": 2,
      "tipo": "pastilla",
      "medida": "mg",
      "stock": 14
    },
    {
      "id": 4,
      "name": "pastilla 4",
      "descripcion": "descripcion 4",
      "lote": 1,
      "tipo": "pastilla",
      "medida": "mg",
      "stock": 14
    },
    {
      "id": 5,
      "name": "pastilla 5",
      "descripcion": "descripcion 5",
      "lote": 2,
      "tipo": "pastilla",
      "medida": "mg",
      "stock": 14
    },
    {
      "id": 1,
      "name": "ibuprofeno",
      "descripcion": "antinflamatorio",
      "lote": 1,
      "tipo": "pastilla",
      "medida": "mg",
      "stock": 14
    },
    {
      "id": 2,
      "name": "pastilla 2",
      "descripcion": "antinflamatorio",
      "lote": 1,
      "tipo": "pastilla",
      "medida": "mg",
      "stock": 14
    },
    {
      "id": 3,
      "name": "pastilla 3",
      "descripcion": "antistaminico",
      "lote": 2,
      "tipo": "pastilla",
      "medida": "mg",
      "stock": 14
    },
    {
      "id": 4,
      "name": "pastilla 4",
      "descripcion": "descripcion 4",
      "lote": 1,
      "tipo": "pastilla",
      "medida": "mg",
      "stock": 14
    },
    {
      "id": 5,
      "name": "pastilla 5",
      "descripcion": "descripcion 5",
      "lote": 2,
      "tipo": "pastilla",
      "medida": "mg",
      "stock": 14
    },
    {
      "id": 1,
      "name": "ibuprofeno",
      "descripcion": "antinflamatorio",
      "lote": 1,
      "tipo": "pastilla",
      "medida": "mg",
      "stock": 14
    },
    {
      "id": 2,
      "name": "pastilla 2",
      "descripcion": "antinflamatorio",
      "lote": 1,
      "tipo": "pastilla",
      "medida": "mg",
      "stock": 14
    },
    {
      "id": 3,
      "name": "pastilla 3",
      "descripcion": "antistaminico",
      "lote": 2,
      "tipo": "pastilla",
      "medida": "mg",
      "stock": 14
    },
    {
      "id": 4,
      "name": "pastilla 4",
      "descripcion": "descripcion 4",
      "lote": 1,
      "tipo": "pastilla",
      "medida": "mg",
      "stock": 14
    },
    {
      "id": 5,
      "name": "pastilla 5",
      "descripcion": "descripcion 5",
      "lote": 2,
      "tipo": "pastilla",
      "medida": "mg",
      "stock": 14
    }
  ]

  ngOnInit() {  
  }
}

