import { Component, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { Location, LocationDetail } from '../../models/location';

@Component({
  selector: 'app-location-retour',
  imports: [DecimalPipe, FormsModule, RouterLink],
  templateUrl: './location-retour.component.html'
})
export class LocationRetourComponent implements OnInit {
  detail = signal<LocationDetail | null>(null);
  resultat: Location | null = null; // la location après le retour (récapitulatif final)
  erreur = signal('');

  kmRetour: number | null = null;
  dateRetour = new Date().toLocaleDateString('en-CA'); // date du jour au format yyyy-mm-dd

  constructor(private route: ActivatedRoute, private locationService: LocationService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.locationService.getById(id).subscribe({
      next: (d) => {
        this.detail.set(d);
        this.kmRetour = d.location.kmDepart;
      },
      error: (msg) => this.erreur.set(msg)
    });
  }

  // aperçu calculé dans le navigateur (le calcul officiel est fait par le backend)
  joursDeRetard(): number {
    if (!this.detail()) return 0;
    const prevu = new Date(this.detail().location.dateFinPrevue).getTime();
    const retour = new Date(this.dateRetour).getTime();
    return Math.max(0, Math.round((retour - prevu) / (1000 * 60 * 60 * 24)));
  }

  penaliteEstimee(): number {
    return this.detail() ? this.joursDeRetard() * 1.5 * this.detail().location.prixJournalierApplique : 0;
  }

  valider(): void {
    if (!this.detail() || this.kmRetour === null) return;
    this.erreur.set('');
    this.locationService.retour(this.detail().location.id, this.kmRetour, this.dateRetour).subscribe({
      next: (l) => this.resultat.set(l),
      error: (msg) => this.erreur.set(msg)
    });
  }

  imprimer(): void {
    window.print();
  }
}
