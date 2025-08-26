import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Evenement} from "../model/evenement";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  constructor(private httpClient : HttpClient) { }
  private url : string = 'http://localhost:3000/evenements';
  addEven(even :Evenement){
    return this.httpClient.post(this.url,even);
  }

  allEven(): Observable<Evenement[]> {
    return this.httpClient.get<Evenement[]>(this.url);
  }
  deleteEven(id:string){
    return this.httpClient.delete(this.url+'/'+id);
  }
  updateEven(even :Evenement){
    return  this.httpClient.put(this.url+'/'+even.id,even)
  }


  getByid(id:string){
    return this.httpClient.get<Evenement>(this.url+"/"+id);
  }
}
