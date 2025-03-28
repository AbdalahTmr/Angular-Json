import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParticipantComponent } from './components/participant/participant.component';
import { EvenementComponent } from './components/evenement/evenement.component';
import { StatistiqueComponent } from './components/statistique/statistique.component';
import { FiltreEvenementPipe } from './pipe/filtre-evenement.pipe';
import { FiltreParticipantPipe } from './pipe/filtre-participant.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AjoutEvenComponent } from './components/ajout-even/ajout-even.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { AjoutPartComponent } from './components/ajout-part/ajout-part.component';
import { GeneratepdfComponent } from './components/generatepdf/generatepdf.component';

@NgModule({
  declarations: [
    AppComponent,
    ParticipantComponent,
    EvenementComponent,
    StatistiqueComponent,
    FiltreEvenementPipe,
    FiltreParticipantPipe,
    AjoutEvenComponent,
    AjoutPartComponent,
    GeneratepdfComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
