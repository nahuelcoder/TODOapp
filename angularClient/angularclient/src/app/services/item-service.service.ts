import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../models/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/users';
  }

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl);
  }

  save(item: Item): Observable<Item> {
    return this.http.post<Item>(this.baseUrl, item);
  }

  delete(item: Item): Observable<any> {
    return this.http.delete(this.baseUrl + "/" + item.id);
  }

  update(item: Item): Observable<Item> {
    return this.http.put<Item>(this.baseUrl + "/" + item.id, item);
  }

}
