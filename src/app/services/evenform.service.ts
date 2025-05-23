import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {EvenementService} from "./evenement.service";
import {Router} from "@angular/router";
import {Evenement} from "../model/evenement";

@Injectable({
  providedIn: 'root'
})
export class EvenformService {
  evenements: Evenement[]= [];
  constructor(private evenService: EvenementService,
              private router: Router
  ) { }
  evenement:any;

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
    var result = '';
    result = this.evenement.nom.length + this.evenement.nom[0]
    return result
  }

  clear(){
    this.evenement ={
      'id': '',
      'nom':'',
      'date': new Date(),
      'lieu':'',
      'description':'',
      'organisateur':'',
    }
  }
  addEvenement() {
    this.submitForm = true;
    if (this.evenForm.invalid) {
      return;
    } else {
      if (this.evenForm.value['id'] == '') {
        this.evenement = this.evenForm.value;
        this.evenement.id = this.generateId();

        this.evenService.addEven(this.evenement).subscribe(
          () => {

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Utilisateur ajoute avec succes",
              showConfirmButton: false,
              timer: 1500
            });
            this.evenForm.reset();
            this.evenService.allEven();
            //Redirection
            this.router.navigateByUrl('/evenement');
          },
          (error) => {
            console.log("Error");
          }
        )
        // this.users = this.userService.allUser();


      } else {
        this.evenement = this.evenForm.value;
        this.evenService.updateEven(this.evenement).subscribe(
          () => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Utilisateur modifie avec succes",
              showConfirmButton: false,
              timer: 1500
            });

            this.evenService.allEven().subscribe(
              (data: Evenement[]) => this.evenements = data
            );

            this.evenForm.reset();
            //this.router.navigateByUrl('/utilisateur');
          },
          (error) => {
            console.log(error);
          }
        )
      }

    }
  }
}
