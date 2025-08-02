import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EvenementService} from "../../services/evenement.service";
import Swal from 'sweetalert2';
import {Evenement} from "../../model/evenement";
import {generate} from "rxjs";
import {AjoutEvenComponent} from "../ajout-even/ajout-even.component";
import {EvenformService} from "../../services/evenform.service";
import {ExportpdfService} from "../../services/exportpdf.service";
import * as XLSX from "xlsx";
import {ExportExcelService} from "../../services/export-excel.service";
@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {
  valueSearch: string = "";
  evenements:Evenement[]= [];
  evenement :Evenement = {
    'id': '',
    'nom':'',
    'date': '',
    'lieu':'',
    'description':'',
    'organisateur':'',
  }
  som = 0;
  constructor(private evenService : EvenementService,
              private router: Router,
              private pdfService: ExportpdfService,
              private evenFormService: EvenformService,
              private excelService: ExportExcelService
              ){

  }
  ngOnInit(): void {
    this.allEvenements();
    this.evenService.allEven().subscribe(data => {
      this.evenements = data;
      this.getNbrEven();
    });

  }

  addEvenement() {
    this.evenFormService.addEvenement();
  }

  get evenForm() {
    return this.evenFormService.evenForm;
  }
  get f2() {
    return this.evenFormService.f2;
  }
  get submitForm() {
    return this.evenFormService.submitForm;
  }
  deleteEvenement(id: string){
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
        this.evenService.deleteEven(id).subscribe(
          (data)=>{
            this.allEvenements();
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
  getNbrEven(){
    if (this.evenements.length === 0) {
      console.log("Aucun événement trouvé !");
      return 0;
    }
    console.log("Nombre d'événements :", this.evenements.length);

     this.som = this.evenements.length;
    return this.som;
  }




  recharge(e: Evenement) {
    this.evenement = e;
    this.evenForm.patchValue({
      id: e.id,
      nom: e.nom,
      date: e.date,
      lieu: e.lieu,
      description: e.description,
      organisateur: e.organisateur
    });
  }


  allEvenements(){
    this.evenService.allEven().subscribe(
      (data :Evenement[])=>{
        console.log(data)
        this.evenements = data;

      },
      (error)=>{
        console.log(error);
      }
    )
  }

  exportPdf() {
    this.evenService.allEven().subscribe(
      (evenements: Evenement[]) => {
        if (evenements.length === 0) {
          console.log("Aucun événement trouvé !");
          return;
        }
        this.pdfService.generatePdf(evenements);
      },
      (error) => {
        console.error("Erreur lors de la récupération des événements", error);
      }
    );
  }

  // fileName = "Rapports_evenements.xlsx";
  // exportExcel() {
  //   let data = document.getElementById('table-data');
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb,ws, 'Sheet1')
  //
  //   XLSX.writeFile(wb, this.fileName)
  // }

  exportExcel() {
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

  Test():{
    console.log('Erreur')
  }

}
