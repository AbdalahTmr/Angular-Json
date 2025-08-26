import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import {Evenement} from '../model/evenement';
import autoTable from 'jspdf-autotable';
import {Participant} from '../model/participant';

@Injectable({
  providedIn: 'root'
})
export class ExportpdfService {
  evenements: Evenement[]= [];
  constructor() { }

  generatePdf(events: Evenement[]) {

    const doc = new jsPDF();
    // Définir les colonnes et les lignes pour le tableau
    const head = [['ID', 'Nom', 'Date', 'Lieu', 'Organisateur', 'Description']];
    const body = events.map(e => [
      e.id,
      e.nom,
      e.date,
      e.lieu,
      e.organisateur,
      e.description
    ]);

    // Ajouter un titre au document
    doc.setFontSize(18);
    doc.text('Rapport des Événements', 14, 22);

    // Générer le tableau
    autoTable(doc, { head, body, startY: 30 });

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
