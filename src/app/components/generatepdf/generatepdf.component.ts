import { Component } from '@angular/core';
import {ExportpdfService} from "../../services/exportpdf.service";
import {ParticipantService} from "../../services/participant.service";
import {EvenementService} from "../../services/evenement.service";
import {Evenement} from "../../model/evenement";
import {Participant} from "../../model/participant";

@Component({
  selector: 'app-generatepdf',
  templateUrl: './generatepdf.component.html',
  styleUrls: ['./generatepdf.component.css']
})

export class GeneratepdfComponent {
  evenements: Evenement[]= [];
  participants: Participant[]= [];
  constructor(private pdfService: ExportpdfService,
              private partService: ParticipantService,
              private evenService: EvenementService
  ) {
  }

  allEvenements(){
    this.evenService.allEven().subscribe(
      (data :Evenement[])=>{
        console.log(data)
        this.evenements = data;
        this.allParticipants();
        //this.createChart();
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  allParticipants(){
    this.partService.allPart().subscribe(
      (data :Participant[])=>{
        console.log(data)
        this.participants = data;

      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
