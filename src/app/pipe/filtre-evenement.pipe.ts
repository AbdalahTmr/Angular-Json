import { Pipe, PipeTransform } from '@angular/core';
import {Evenement} from "../model/evenement";

@Pipe({
  name: 'filtreEvenement'
})
export class FiltreEvenementPipe implements PipeTransform {

  transform(evenements: Evenement[],value: any): Evenement[] {
    if(value.length != 0){
      return  evenements.filter((a)=> a.nom.includes(value));
    }
    return evenements;
  }

}
