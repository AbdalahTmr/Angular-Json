import {Component, OnInit} from '@angular/core';
import {Evenement} from "../../model/evenement";
import {EvenementService} from "../../services/evenement.service";
import {Router} from "@angular/router";
import {EvenformService} from "../../services/evenform.service";
import Swal from "sweetalert2";
import {Participant} from "../../model/participant";
import {PartformService} from "../../services/partform.service";
import {ParticipantService} from "../../services/participant.service";
import {GeneratepdfComponent} from "../generatepdf/generatepdf.component";
import {ExportpdfService} from "../../services/exportpdf.service";
import {ExportExcelService} from "../../services/export-excel.service";

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit{
  valueSearch: string = "";
  participants:Participant[]= [];
  evenements:Evenement[]= [];
  participant :Participant = {
    'id': '',
    'nom':'',
    'prenom':'',
    'age':'',
    'etat':'',
    even_id: { id: '', nom: '', date: '', lieu: '', description: '', organisateur: '' }  }
  constructor(private partService : ParticipantService,
              private evenService : EvenementService,
              private router: Router,
              private partFormService: PartformService,
              private pdfService: ExportpdfService,
              private excelService: ExportExcelService
  ){

  }
  ngOnInit(): void {
    this.allParticipants();
    this.getEvenements();
  }

  addParticipant() {
    this.partFormService.addParticipant();
  }

  getEvenements() {
    this.evenService.allEven().subscribe(
      (data: Evenement[]) => {
        this.evenements = data;
        this.getNombreParticipantsParEvenement();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  get partForm() {
    return this.partFormService.partForm;
  }
  get f3() {
    return this.partFormService.f3;
  }
  get submitForm() {
    return this.partFormService.submitForm;
  }
  deleteParticipant(id: string){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Voulez-vous supprimer?",
      text: "Vous n'allez plus revoir ça!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimé!",
      cancelButtonText: "Non, annulé!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.partService.deletePart(id).subscribe(
          (data)=>{
            this.allParticipants();
          },
          (error)=>{
            console.log(error);
          }
        );
        // this.loadVoitures();
        swalWithBootstrapButtons.fire({
          title: "Supprimer!",
          text: "La ligne a bien été supprimer.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }

  recharge(p:Participant){
    this.participant = p;
  }

  clear(){
    this.participant ={
      'id': '',
      'nom':'',
      'prenom':'',
      'age':'',
      'etat':'',
      even_id: { id: '', nom: '', date: '', lieu: '', description: '', organisateur: '' }
    }
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

  getNombreParticipantsParEvenement() {
    const result = this.evenements.map(event => {
      const nombreParticipants = this.participants.filter(p => {
        return typeof p.even_id === 'object' ? p.even_id.id === event.id : p.even_id === event.id;
      }).length;

      console.log(`Événement: ${event.nom}, ID: ${event.id}, Nombre de participants: ${nombreParticipants}`);

      return {
        evenement: event.nom,
        nombreParticipants: nombreParticipants
      };
    });

    console.log("Résultat final :", result);
    return result;
  }


  exportPdf() {
    this.partService.allPart().subscribe(
      (participants: Participant[]) => {
        if (participants.length === 0) {
          console.log("Aucun événement trouvé !");
          return;
        }
        this.pdfService.generatePdf2(participants);
      },
      (error) => {
        console.error("Erreur lors de la récupération des événements", error);
      }
    )
  }

  exportExcel2() {
    this.evenService.allEven().subscribe(
      (evenements: Evenement[]) => {
        if (evenements.length === 0) {
          console.log("Aucun événement trouvé !");
          return;
        }
        this.excelService.exportToExcel(evenements, 'Statistiques');
      },
      (error) => {
        console.error("Erreur lors de la récupération des événements", error);
      }
    );
  }

}
