import { Component, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { Location, Page } from '../../models/location';

@Component({
  selector: 'app-location-list',
  imports: [DecimalPipe, FormsModule, RouterLink],
  templateUrl: './location-list.component.html'
})
export class LocationListComponent implements OnInit {
  resultat = signal<Page<Location> | null>(null);
  erreur = signal('');
  message = signal('');

  // filtres
  statut = '';
  dateDebut = '';
  dateFin = '';
  page = 0; // le backend compte les pages à partir de 0

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.erreur.set('');
    this.locationService
      .getAll({ statut: this.statut, dateDebut: this.dateDebut, dateFin: this.dateFin, page: this.page, size: 10 })
      .subscribe({
        next: (data) => this.resultat.set(data),
        error: (msg) => this.erreur.set(msg)
      });
  }

  filtrer(): void {
    this.page = 0;
    this.charger();
  }

  changerPage(nouvellePage: number): void {
    this.page = nouvellePage;
    this.charger();
  }

  depart(l: Location): void {
    this.locationService.depart(l.id).subscribe({
      next: () => {
        this.message.set('Location ' + l.id + ' démarrée : le véhicule est maintenant loué.');
        this.charger();
      },
      error: (msg) => this.erreur.set(msg)
    });
  }

  annuler(l: Location): void {
    if (!confirm('Annuler la réservation ' + l.id + ' ?')) return;
    this.locationService.annuler(l.id).subscribe({
      next: () => {
        this.message.set('Réservation ' + l.id + ' annulée.');
        this.charger();
      },
      error: (msg) => this.erreur.set(msg)
    });
  }
}
