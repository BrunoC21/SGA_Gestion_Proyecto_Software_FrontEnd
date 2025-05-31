import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
import { LimitPipe } from '../../pipes/limit-pipe.pipe';
import { PaginatePipe } from '../../pipes/paginate.pipe';

import { InventarioService, Inventory } from '../../services/inventario.service';
import { MedicamentoService, Products } from '../../services/medicamento.service';
import { SucursalService, Warehouse } from '../../services/sucursal.service';
import { SucursalInventarioService, StockWare } from '../../services/sucursal-inventario.service';

@Component({
  selector: 'app-gestion-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe, LimitPipe, PaginatePipe],
  templateUrl: './gestion-inventario.component.html',
  styleUrl: './gestion-inventario.component.css'
})
export class GestionInventarioComponent implements OnInit {
  currentPage = 1;
  selectedLimit = 5;
  filterPost = "";

  posts: StockWare[] = [];

  productsList: Products[] = [];
  warehouseList: Warehouse[] = [];

  newInventory: {
    selectedProductId: number | null;
    selectedWarehouseId: number | null;
    inventory_number: number;
    exp_date: string;
    unit_price: number;
    stockAmount: number;
  } = {
    selectedProductId: null,
    selectedWarehouseId: null,
    inventory_number: 0,
    exp_date: '',
    unit_price: 0,
    stockAmount: 0
  };

  constructor(
    private inventarioService: InventarioService,
    private medicamentoService: MedicamentoService,
    private sucursalService: SucursalService,
    private sucursalInventarioService: SucursalInventarioService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadWarehouses();
    this.loadStock();
  }

  loadProducts(): void {
    this.medicamentoService.getAll().subscribe(data => this.productsList = data);
  }

  loadWarehouses(): void {
    this.sucursalService.getAll().subscribe(data => this.warehouseList = data);
  }

  loadStock(): void {
    this.sucursalInventarioService.getAll().subscribe(data => this.posts = data);
  }

  get totalPages(): number {
    const filtered = this.filteredPosts;
    return Math.ceil((filtered.length || 1) / this.selectedLimit);
  }

  get filteredPosts(): StockWare[] {
    return this.posts.filter(post =>
      post.lot?.product?.product_name?.toLowerCase().includes(this.filterPost.toLowerCase())
    ).slice(
      (this.currentPage - 1) * this.selectedLimit,
      this.currentPage * this.selectedLimit
    );
  }

  addInventory(): void {
    const {
      selectedProductId,
      selectedWarehouseId,
      inventory_number,
      exp_date,
      unit_price,
      stockAmount
    } = this.newInventory;

    if (!selectedProductId || !selectedWarehouseId) {
      alert('Debes seleccionar un producto y una bodega.');
      return;
    }

    const selectedProduct = this.productsList.find(p => p.id === selectedProductId);
    const selectedWarehouse = this.warehouseList.find(w => w.id === selectedWarehouseId);

    if (!selectedProduct || !selectedWarehouse) {
      alert('Producto o bodega seleccionados no válidos.');
      return;
    }

    const newInv: Inventory = {
      product: selectedProduct,
      inventory_number,
      exp_date,
      unit_price
    };

    this.inventarioService.create(newInv).subscribe(() => {
    // Luego de crear, obtener todos los inventarios y buscar el creado
      this.inventarioService.getAll().subscribe((allInventories: Inventory[]) => {
        const matchedInventory = allInventories.find(inv =>
          inv.product.id === selectedProduct.id &&
          inv.inventory_number === inventory_number &&
          inv.exp_date === exp_date &&
          inv.unit_price === unit_price
        );

        if (!matchedInventory) {
          alert('No se pudo encontrar el inventario recién creado.');
          return;
        }

        const stock: StockWare = {
          lot: matchedInventory,
          warehouse: selectedWarehouse,
          amount: stockAmount
        };

        this.sucursalInventarioService.create(stock).subscribe(() => {
          this.loadStock();
          this.resetForm();

          const popup = document.getElementById('popup-agregar') as HTMLElement;
          if (popup) popup.removeAttribute('popover');
        });
      });
    });
  }


  resetForm(): void {
    this.newInventory = {
      selectedProductId: null,
      selectedWarehouseId: null,
      inventory_number: 0,
      exp_date: '',
      unit_price: 0,
      stockAmount: 0
    };
  }
}
