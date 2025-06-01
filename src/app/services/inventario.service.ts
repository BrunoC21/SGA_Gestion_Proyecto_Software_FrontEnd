import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from './medicamento.service';

export interface Inventory {
  id?: number;
  product: Products;
  inventory_number: number;
  exp_date: string;
  unit_price: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private baseUrl = `${this.apiUrl}/api/inventory`;

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) {}

  create(inventory: Inventory): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/create`, inventory);
  }

  getAll(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.baseUrl}/all`);
  }

  getById(id: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.baseUrl}/search/${id}`);
  }

  update(id: number, inventory: Inventory): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.baseUrl}/update/${id}`, inventory);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }
}
