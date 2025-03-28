import {Evenement} from "./evenement";

export class Participant {
  id!: string;
  nom!:string
  prenom!:string
  age!:string
  etat!:string
  even_id!:Evenement
}
