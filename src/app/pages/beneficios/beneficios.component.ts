// beneficios.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
import { LimitPipe } from '../../pipes/limit-pipe.pipe';
import { PaginatePipe } from '../../pipes/paginate.pipe';
import { BenefitService, Beneficio } from '../../services/benefit.service';

@Component({
  selector: 'app-beneficios',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe, LimitPipe, PaginatePipe],
  templateUrl: './beneficios.component.html',
  styleUrls: ['./beneficios.component.css']
})
export class BeneficiosComponent implements OnInit {
  beneficios: Beneficio[] = [];
  filterPost = '';
  selectedLimit = 5;
  currentPage = 1;
  beneficio_name = '';
  descripcion_benef = '';
  requisitos_benef = '';
  beneficioEliminarId: number | null = null;

  constructor(private beneficioService: BenefitService) {}

  ngOnInit(): void {
    this.cargarBeneficios();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPosts.length / this.selectedLimit);
  }

  get filteredPosts(): Beneficio[] {
    return this.beneficios.filter(b =>
      b.nombre.toLowerCase().includes(this.filterPost.toLowerCase()) ||
      b.descripcion.toLowerCase().includes(this.filterPost.toLowerCase())
    ).slice((this.currentPage - 1) * this.selectedLimit, this.currentPage * this.selectedLimit);
  }

  cargarBeneficios(): void {
    this.beneficios = this.beneficioService.getBeneficios();
  }

  agregarBeneficio(): void {
    if (!this.beneficio_name || !this.descripcion_benef || !this.requisitos_benef) return;
    this.beneficioService.agregarBeneficio({
      nombre: this.beneficio_name,
      descripcion: this.descripcion_benef,
      requisitos: ''
    });
    this.beneficio_name = '';
    this.descripcion_benef = '';
    this.requisitos_benef = '';
    this.cargarBeneficios();
  }

  seleccionarBeneficioEliminar(id: number): void {
    this.beneficioEliminarId = id;
  }

  eliminarBeneficio(): void {
    if (this.beneficioEliminarId !== null) {
      this.beneficioService.eliminarBeneficio(this.beneficioEliminarId);
      this.beneficioEliminarId = null;
      this.cargarBeneficios();
    }
  }
}
