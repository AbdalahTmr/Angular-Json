import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Evenement } from "../model/evenement";

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  private url: string = 'http://localhost:3000/evenements';

  constructor(private httpClient: HttpClient) {}

  addEven(even: Evenement): Observable<Evenement> {
    return this.httpClient.post<Evenement>(this.url, even);
  }

  allEven(): Observable<Evenement[]> {
    return this.httpClient.get<Evenement[]>(this.url);
  }

  deleteEven(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }

  updateEven(even: Evenement): Observable<Evenement> {
    return this.httpClient.put<Evenement>(`${this.url}/${even.id}`, even);
  }

  getByid(id: string): Observable<Evenement> {
    return this.httpClient.get<Evenement>(`${this.url}/${id}`);
  }
}
