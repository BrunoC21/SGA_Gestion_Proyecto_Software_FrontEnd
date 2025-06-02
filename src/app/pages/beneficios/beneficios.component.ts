import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../pipes/filter.pipe';
import { LimitPipe } from '../../pipes/limit-pipe.pipe';
import { PaginatePipe } from '../../pipes/paginate.pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-beneficios',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe, LimitPipe, PaginatePipe],
  templateUrl: './beneficios.component.html',
  styleUrls: ['./beneficios.component.css']
})

export class BeneficiosComponent {
  
}
