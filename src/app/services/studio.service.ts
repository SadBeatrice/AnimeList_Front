import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Studio } from '../models/studio';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class StudioService {
  private http = inject(HttpClient);
  private API = environment.SERVIDOR+'/api/studio';

  findAll(): Observable<Studio[]> {
    return this.http.get<Studio[]>(`${this.API}/findAll`);
  }

  findById(id: number): Observable<Studio> {
    return this.http.get<Studio>(`${this.API}/findById/${id}`);
  }

  save(studio: Studio): Observable<string> {
    return this.http.post<string>(`${this.API}/save`, studio, { responseType: 'text' as 'json' });
  }

  update(studio: Studio, id: number): Observable<string> {
    return this.http.put<string>(`${this.API}/update/${id}`, studio, { responseType: 'text' as 'json' });
  }

  deleteById(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API}/deleteById/${id}`, { responseType: 'text' as 'json' });
  }
}