import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../pipes/filter.pipe';
import { LimitPipe } from '../../pipes/limit-pipe.pipe';
import { PaginatePipe } from '../../pipes/paginate.pipe';
import { FormsModule } from '@angular/forms';
import { SucursalService, Warehouse } from '../../services/sucursal.service';

@Component({
  selector: 'app-gestion-bodega',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe, LimitPipe, PaginatePipe],
  templateUrl: './gestion-bodega.component.html',
  styleUrls: ['./gestion-bodega.component.css']
})
export class GestionBodegaComponent implements OnInit{
  currentPage = 1;
  selectedLimit = 5;
  filterPost = "";

  posts: Warehouse[] = [];

  newWarehouse: Warehouse = {
    warehouse_Name: '',
    direction: ''
  };

  editWarehouse: Warehouse = {
    id: 0,
    warehouse_Name: '',
    direction: ''
  }

  constructor(private sucursalService: SucursalService) {}

  ngOnInit(): void {
    this.loadWarehouses();
  }

  loadWarehouses(): void {
    this.sucursalService.getAll().subscribe(data => {
      this.posts = data;
    });
  }

  get totalPages(): number {
    return Math.ceil((this.posts.filter(post =>
      post.warehouse_Name.toLowerCase().includes(this.filterPost.toLowerCase())
    ).length || 1) / this.selectedLimit);
  }

  get filteredPosts() {
    const filtered = this.posts.filter(post =>
      post.warehouse_Name.toLowerCase().includes(this.filterPost.toLowerCase())
    );
    return filtered.slice(
      (this.currentPage - 1) * this.selectedLimit,
      this.currentPage * this.selectedLimit
    );
  }
  
  addWarehouse(): void {
    const { warehouse_Name, direction } = this.newWarehouse;

    if (warehouse_Name.trim() && direction.trim()) {
      this.sucursalService.create(this.newWarehouse).subscribe(() => {
        this.loadWarehouses(); // recargar productos
        this.newWarehouse = {
          warehouse_Name: '',
          direction: ''
        };

        const popup = document.getElementById('popup-agregar') as HTMLElement;
        if (popup) popup.removeAttribute('popover');
      });
    } else {
      alert('Todos los campos son obligatorios.');
    }
  }

  openEditPopup(warehouse: Warehouse): void {
    this.editWarehouse = { ...warehouse};
    const popup = document.getElementById('popup-modificar') as HTMLElement;
    if (popup) popup.setAttribute('popover', 'auto');
  }

  updateWarehouse(): void {
    if(
      this.editWarehouse.id &&
      this.editWarehouse.warehouse_Name.trim() &&
      this.editWarehouse.direction.trim()
    ){
      this.sucursalService.update(this.editWarehouse.id, this.editWarehouse).subscribe(() => {
        this.loadWarehouses();
        const popup = document.getElementById('popup-modificar') as HTMLElement;
        if (popup) popup.removeAttribute('popover');
      });
    } else {
      alert('Todos los campos son obligatorios para modificar.');
    }
  }
  
  
}
