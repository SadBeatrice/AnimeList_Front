import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = environment.SERVIDOR+"/api/category";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/findAll`);
  }

  findById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.url}/findById/${id}`);
  }

  findByName(nome: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/findByNome?nome=${nome}`);
  }

  deleteById(id: number): Observable<string> {
    return this.http.delete(`${this.url}/deleteById/${id}`, { responseType: 'text' });
  }

  save(category: Category): Observable<string> {
    return this.http.post(`${this.url}/save`, category, { responseType: 'text' });
  }

  update(category: Category, id: number): Observable<string> {
    return this.http.put(`${this.url}/update/${id}`, category, { responseType: 'text' });
  }
}
