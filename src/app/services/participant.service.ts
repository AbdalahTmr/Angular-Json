import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Evenement} from "../model/evenement";
import {Observable} from "rxjs";
import {Participant} from "../model/participant";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  constructor(private httpClient : HttpClient) { }
  private url : string = 'http://localhost:3000/participants';
  addPart(part :Participant){
    return this.httpClient.post(this.url,part);
  }

  allPart(): Observable<Participant[]> {
    return this.httpClient.get<Participant[]>(this.url);
  }
  deletePart(id:string){
    return this.httpClient.delete(this.url+'/'+id);
  }
  updatePart(part :Participant){
    return  this.httpClient.put(this.url+'/'+part.id,part)
  }


  getByid(id:string){
    return this.httpClient.get<Participant>(this.url+"/"+id);
  }
}
