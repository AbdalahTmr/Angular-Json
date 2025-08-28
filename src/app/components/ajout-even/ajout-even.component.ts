import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EvenementService} from "../../services/evenement.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {Evenement} from "../../model/evenement";
import {EvenformService} from "../../services/evenform.service";

@Component({
  selector: 'app-ajout-even',
  templateUrl: './ajout-even.component.html',
  styleUrls: ['./ajout-even.component.css']
})
export class AjoutEvenComponent implements OnInit {
  valueSearch: string = "";
  evenement: any;
  evenForm = new FormGroup({
    id: new FormControl(''),
    nom: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    lieu: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    organisateur: new FormControl('', [Validators.required]),
  });

  constructor(private evenService: EvenementService,
              private router: Router,
              private route: ActivatedRoute,
              private evenFormService: EvenformService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.getById();
    }
    this.test()
  }

  get f2() {
    return this.evenFormService.f2;
  }
  get submitForm() {
    return this.evenFormService.submitForm;
  }


  getById(){
    this.evenService.getByid(this.route.snapshot.params['id']).subscribe(
      (data: Evenement) => {
        this.evenement = data;
        console.log(this.evenement)
        this.evenForm.get('id')?.setValue(this.evenement.id);
        this.evenForm.get('nom')?.setValue(this.evenement.nom);
        this.evenForm.get('date')?.setValue(this.evenement.date);
        this.evenForm.get('lieu')?.setValue(this.evenement.lieu);
        this.evenForm.get('description')?.setValue(this.evenement.description);
        this.evenForm.get('organisateur')?.setValue(this.evenement.organisateur);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  test(){
    console.log('Erreur lors du chargement du fichier')
  }

}
