import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EvenementService} from "./evenement.service";
import {Evenement} from "../model/evenement";
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvenformService {
  evenements: Evenement[]= [];
  constructor(private evenService: EvenementService) { }
  evenement: Partial<Evenement> = {};

  submitForm = false;
  evenForm = new FormGroup({
    id: new FormControl(''),
    nom: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    lieu: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    organisateur: new FormControl('', [Validators.required]),
  });

  get f2() {
    return this.evenForm.controls;
  }


  generateId() {
    // Cette méthode est beaucoup plus sûre pour générer un ID unique temporaire.
    // La méthode précédente pouvait échouer si `this.evenement.nom` n'était pas une chaîne de caractères,
    // et n'était pas garantie d'être unique.
    const randomPart = Math.random().toString(36).substring(2, 7);
    const timePart = Date.now().toString(36).slice(-4);
    return `${randomPart}${timePart}`.toUpperCase();
  }

  clear(){
    this.evenement ={
      'id': '',
      'nom':'',
      'date': '',
      'lieu':'',
      'description':'',
      'organisateur':'',
    }
  }

  // La méthode retourne maintenant un Observable.
  // Le composant qui l'appelle est responsable de la souscription et de la gestion de la réponse (succès/erreur).
  addEvenement(): Observable<Evenement> {
    this.submitForm = true;
    if (this.evenForm.invalid) {
      return throwError(() => new Error('Le formulaire est invalide.'));
    }

    const evenementData = this.evenForm.value as Partial<Evenement>;

    if (evenementData.id) {
      return this.evenService.updateEven(evenementData as Evenement);
    }

    evenementData.id = this.generateId();
    return this.evenService.addEven(evenementData as Evenement);
  }
}
