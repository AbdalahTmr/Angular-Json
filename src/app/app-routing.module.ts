import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StatistiqueComponent} from "./components/statistique/statistique.component";
import {ParticipantComponent} from "./components/participant/participant.component";
import {EvenementComponent} from "./components/evenement/evenement.component";
import {AjoutEvenComponent} from "./components/ajout-even/ajout-even.component";

const routes: Routes = [
  {path: 'participant',component:ParticipantComponent},
  {path: 'evenement',component:EvenementComponent},
  {path: 'updateEven/:id',component:AjoutEvenComponent},
  {path:'statistique',component:StatistiqueComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
