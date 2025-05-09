import { Injectable } from '@angular/core';
import {EvenementService} from "./evenement.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {ParticipantService} from "./participant.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PartformService {
  constructor(private partService: ParticipantService, private router: Router) { }
  participant:any;

  submitForm = false;
  partForm = new FormGroup({
    id: new FormControl(''),
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    etat: new FormControl('', [Validators.required]),
    even_id: new FormControl('', [Validators.required]),
  });

  get f3() {
    return this.partForm.controls;
  }


  generateId() {
    var result = '';
    result = this.participant.nom.length + this.participant.nom[0]
    return result
  }

  addParticipant() {
    this.submitForm = true;
    if (this.partForm.invalid) {
      return;
    } else {
      if (this.partForm.value['id'] == '') {
        this.participant = this.partForm.value;
        this.participant.id = this.generateId();

        this.partService.addPart(this.participant).subscribe(
          () => {

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Utilisateur ajoute avec succes",
              showConfirmButton: false,
              timer: 1500
            });
            this.partForm.reset();
            this.router.navigateByUrl('/participant');
          },
          (error) => {
            console.log("Error");
          }
        )
        // this.users = this.userService.allUser();


      } else {
        this.participant = this.partForm.value;
        this.partService.updatePart(this.participant).subscribe(
          () => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Utilisateur modifie avec succes",
              showConfirmButton: false,
              timer: 1500
            });
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
