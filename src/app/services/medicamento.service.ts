import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Products {
  id?: number;
  product_name: string;
  description: string;
  type: string;
  measure_unit: string;
}

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {
  private baseUrl = `${this.apiUrl}/api/products`;

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) {}

  create(products: Products): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/create`, products);
  }

  getAll(): Observable<Products[]> {
      return this.http.get<Products[]>(`${this.baseUrl}/all`);
    }
  
    getById(id: number): Observable<Products> {
      return this.http.get<Products>(`${this.baseUrl}/search/${id}`);
    }
  
    update(id: number, products: Products): Observable<Products> {
      return this.http.put<Products>(`${this.baseUrl}/update/${id}`, products);
    }
  
    delete(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
    }

}
