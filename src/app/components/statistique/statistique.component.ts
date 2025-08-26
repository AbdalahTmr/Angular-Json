import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from "chart.js";
import {EvenementService} from "../../services/evenement.service";
import {ParticipantService} from "../../services/participant.service";
import {Evenement} from "../../model/evenement";
import {Participant} from "../../model/participant";


@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit{
  public chart: any;
  public chart2: any;
  evenements: Evenement[]= [];
  participants: Participant[]= [];
  som = 0;
  constructor(public evenService: EvenementService,
              public partService: ParticipantService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.allEvenements();
    this.allParticipants();
  }

  createChart(){
    this.chart = new Chart("MyChart", {
      type: 'polarArea',

      data: {
        labels: this.evenements.map(evenement => evenement.nom),
        datasets: [
          {
            label: "Nombre d'evenements",
            data: Array(this.evenements.length).fill(this.som),
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(255, 255, 86)',
              'rgb(54, 162, 205)',
            ]
          },

        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
    this.chart2 = new Chart("MyChart2", {
      type: 'bar',

      data: {
        labels: this.evenements.map(evenement => evenement.nom),
        datasets: [
          {
            label: "Nombre de participant par evenement",
            data: this.getNombreParticipantsParEvenement().map(evenement => evenement.nombreParticipants),
            backgroundColor:  [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(255, 255, 86)',
              'rgb(54, 162, 205)',
            ]
          },

        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
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

  getNbrEven(){
    if (this.evenements.length === 0) {
      console.log("Aucun événement trouvé !");
      return 0;
    }
    console.log("Nombre d'événements :", this.evenements.length);
    this.som = this.evenements.length;
    return this.som;
  }

  allEvenements(){
    this.evenService.allEven().subscribe(
      (data :Evenement[])=>{
        console.log(data)
        this.evenements = data;
        this.getNbrEven();
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

        this.createChart();
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
