import { Component, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { Statistiques } from '../../models/location';

@Component({
  selector: 'app-dashboard',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  stats = signal<Statistiques | null>(null);
  erreur = signal('');

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.getStatistiques().subscribe({
      next: (data) => this.stats.set(data),
      error: (msg) => this.erreur.set(msg)
    });
  }

  // nombre de véhicules pour un statut (0 si absent)
  nbVehicules(statut: string): number {
    return this.stats()?.vehiculesParStatut?.[statut] ?? 0;
  }

  nbLocations(statut: string): number {
    return this.stats()?.locationsParStatut[statut] ?? 0;
  }

  // largeur d'une barre du graphique en % (par rapport à la plus grande valeur)
  largeur(valeur: number, max: number): number {
    return max === 0 ? 0 : (valeur / max) * 100;
  }

  maxTop(): number {
    return Math.max(1, ...(this.stats()?.topVehicules.map((v) => v.nombreLocations) ?? []));
  }
}
