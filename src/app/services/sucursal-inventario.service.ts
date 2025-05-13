import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from './inventario.service';
import { Warehouse } from './sucursal.service';

export interface StockWare{
  id?: number;
  warehouse: Warehouse;
  lot: Inventory;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class SucursalInventarioService {
  private baseUrl = `${this.apiUrl}/api/warehouse`;

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) {}

  create(stockware: StockWare): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/create`, stockware);
  }

  getAll(): Observable<StockWare[]> {
      return this.http.get<StockWare[]>(`${this.baseUrl}/all`);
    }
  
    getById(id: number): Observable<StockWare> {
      return this.http.get<StockWare>(`${this.baseUrl}/search/${id}`);
    }
  
    update(id: number, stockware: StockWare): Observable<StockWare> {
      return this.http.put<StockWare>(`${this.baseUrl}/update/${id}`, stockware);
    }
  
    delete(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
    }
}
