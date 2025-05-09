import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Anime } from '../models/anime';
import { Studio } from '../models/studio';
import { Category } from '../models/category';


@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  http = inject(HttpClient);

  API = 'http://localhost:8080/api/anime';
  STUDIO_API = 'http://localhost:8080/api/studio';
  CATEGORY_API = 'http://localhost:8080/api/category';

  constructor() { }

  findAll(): Observable<Anime[]>{
    return this.http.get<Anime[]>(this.API+"/findAll");
  }

  findById(id: number): Observable<Anime> {
    return this.http.get<Anime>(this.API+"/findById/"+id);
  }

  save(anime: Anime): Observable<string>{
    return this.http.post<string>(this.API+"/save", anime, {responseType: 'text' as 'json'});
  }

  update(anime: Anime, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id, anime, {responseType: 'text' as 'json'});
  }

  deleteById(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

}
