import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EvenementService} from "../../services/evenement.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EvenformService} from "../../services/evenform.service";
import {Evenement} from "../../model/evenement";
import {ParticipantService} from "../../services/participant.service";
import {PartformService} from "../../services/partform.service";
import {Participant} from "../../model/participant";

@Component({
  selector: 'app-ajout-part',
  templateUrl: './ajout-part.component.html',
  styleUrls: ['./ajout-part.component.css']
})
export class AjoutPartComponent implements OnInit{
  valueSearch: string = "";
  participant: any;
  partForm = new FormGroup({
    id: new FormControl(''),
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    etat: new FormControl('', [Validators.required]),
    even_id: new FormControl('', [Validators.required]),
  });

  constructor(private partService: ParticipantService,
              private router: Router,
              private route: ActivatedRoute,
              private partFormService: PartformService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.getById();
    }
  }

  get f3() {
    return this.partFormService.f3;
  }
  get submitForm() {
    return this.partFormService.submitForm;
  }


  getById(){
    this.partService.getByid(this.route.snapshot.params['id']).subscribe(
      (data: Participant) => {
        this.participant = data;
        console.log(this.participant)
        this.partForm.get('id')?.setValue(this.participant.id);
        this.partForm.get('nom')?.setValue(this.participant.nom);
        this.partForm.get('prenom')?.setValue(this.participant.prenom);
        this.partForm.get('age')?.setValue(this.participant.age);
        this.partForm.get('etat')?.setValue(this.participant.etat);
        this.partForm.get('even_id')?.setValue(this.participant.even_id);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  Test():{
    console.log('Erreur')
  }
}
