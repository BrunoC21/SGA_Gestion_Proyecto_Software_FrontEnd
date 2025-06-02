// src/app/services/beneficio.service.ts
import { Injectable } from '@angular/core';

export interface Beneficio {
  id: number;
  nombre: string;
  descripcion: string;
  requisitos: string;
}

@Injectable({
  providedIn: 'root'
})
export class BenefitService {
  private storageKey = 'beneficios';

  constructor() {}

  // Obtener lista de beneficios
  getBeneficios(): Beneficio[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Crear beneficio
  agregarBeneficio(beneficio: Omit<Beneficio, 'id'>): void {
    const beneficios = this.getBeneficios();
    const newId = beneficios.length > 0 ? beneficios[beneficios.length - 1].id + 1 : 1;
    beneficios.push({ ...beneficio, id: newId });
    localStorage.setItem(this.storageKey, JSON.stringify(beneficios));
  }

  // Eliminar beneficio por ID
  eliminarBeneficio(id: number): void {
    const beneficios = this.getBeneficios().filter(b => b.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(beneficios));
  }
}
