import { Injectable } from '@angular/core';
import jsPDF from "jspdf";
import {Evenement} from "../model/evenement";
import autoTable from "jspdf-autotable";
import {Participant} from "../model/participant";

@Injectable({
  providedIn: 'root'
})
export class ExportpdfService {
  evenements: Evenement[]= [];
  constructor() { }

  generatePdf(evenements: Evenement[]) {

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Rapport des Événements', 10, 10);
    const columns = ["#", "Nom", "Date", "Lieu", "Organisateur", "Description"];
    const rows = evenements.map((event, index) => [
      event.id,  // Numéro
      event.nom,
      event.date,
      event.lieu,
      event.organisateur,
      event.description
    ]);

// Or use javascript directly:
    autoTable(doc, {
      head: [columns],
      body: rows,
      styles: {fontStyle: "bolditalic"},
      headStyles: {fillColor: [44, 62, 80]}
    })
    doc.save('rapport_evenements.pdf');
  }


  generatePdf2(participants: Participant[]) {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Rapport des Participants', 10, 10);
    const columns = ["#", "Nom", "Prenom", "Age", "Etat", "Nom Evenement"];
    const rows = participants.map((part, index) => [
      part.id,
      part.nom,
      part.prenom,
      part.age,
      part.etat,
      typeof part.even_id === 'object' ? part.even_id.nom : part.even_id
    ]);

// Or use javascript directly:
    autoTable(doc, {
      head: [columns],
      body: rows,
      styles: {fontStyle: "bolditalic"},
      headStyles: {fillColor: [44, 62, 80]}
    })
    doc.save('rapport_particpants.pdf');
  }
}
