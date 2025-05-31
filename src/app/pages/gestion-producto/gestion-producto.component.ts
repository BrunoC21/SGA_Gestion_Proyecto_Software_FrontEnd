import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../pipes/filter.pipe';
import { LimitPipe } from '../../pipes/limit-pipe.pipe';
import { PaginatePipe } from '../../pipes/paginate.pipe';
import { FormsModule } from '@angular/forms';
import { MedicamentoService, Products } from '../../services/medicamento.service';

@Component({
  selector: 'app-gestion-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe, LimitPipe, PaginatePipe],
  templateUrl: './gestion-producto.component.html',
  styleUrl: './gestion-producto.component.css'
})
export class GestionProductoComponent implements OnInit {
  currentPage = 1;
  selectedLimit = 5;
  filterPost = '';

  posts: Products[] = [];

  newProduct: Products = {
    product_name: '',
    description: '',
    type: '',
    measure_unit: ''
  };

  editProduct: Products = {
    id: 0,
    product_name: '',
    description: '',
    type: '',
    measure_unit: ''
  };

  constructor(private medicamentoService: MedicamentoService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.medicamentoService.getAll().subscribe(data => {
      this.posts = data;
    });
  }

  get totalPages(): number {
    const filtered = this.posts.filter(post =>
      post.product_name.toLowerCase().includes(this.filterPost.toLowerCase())
    );
    return Math.ceil((filtered.length || 1) / this.selectedLimit);
  }

  get filteredPosts(): Products[] {
    const filtered = this.posts.filter(post =>
      post.product_name.toLowerCase().includes(this.filterPost.toLowerCase())
    );
    return filtered.slice(
      (this.currentPage - 1) * this.selectedLimit,
      this.currentPage * this.selectedLimit
    );
  }

  addProduct(): void {
    const { product_name, description, type, measure_unit } = this.newProduct;

    if (product_name.trim() && description.trim() && type.trim() && measure_unit.trim()) {
      this.medicamentoService.create(this.newProduct).subscribe(() => {
        this.loadProducts();
        this.newProduct = {
          product_name: '',
          description: '',
          type: '',
          measure_unit: ''
        };
        const popup = document.getElementById('popup-agregar') as HTMLElement;
        if (popup) popup.removeAttribute('popover');
      });
    } else {
      alert('Todos los campos son obligatorios.');
    }
  }

  openEditPopup(product: Products): void {
    this.editProduct = { ...product };
    const popup = document.getElementById('popup-modificar') as HTMLElement;
    if (popup) popup.setAttribute('popover', 'auto');
  }

  updateProduct(): void {
    if (
      this.editProduct.id &&
      this.editProduct.product_name.trim() &&
      this.editProduct.description.trim() &&
      this.editProduct.type.trim() &&
      this.editProduct.measure_unit.trim()
    ) {
      this.medicamentoService.update(this.editProduct.id, this.editProduct).subscribe(() => {
        this.loadProducts();
        const popup = document.getElementById('popup-modificar') as HTMLElement;
        if (popup) popup.removeAttribute('popover');
      });
    } else {
      alert('Todos los campos son obligatorios para modificar.');
    }
  }
}
