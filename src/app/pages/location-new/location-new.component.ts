import { Component, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { VehiculeService } from '../../services/vehicule.service';
import { LocationService } from '../../services/location.service';
import { Client } from '../../models/client';
import { Vehicule } from '../../models/vehicule';
import { Simulation } from '../../models/location';

// Assistant en 5 étapes : client → période → véhicule → simulation → confirmation
@Component({
  selector: 'app-location-new',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './location-new.component.html'
})
export class LocationNewComponent implements OnInit {
  etape = signal(1);
  erreur = signal('');

  clients = signal<Client[]>([]);
  vehiculesDisponibles = signal<Vehicule[]>([]);
  simulation = signal<Simulation | null>(null);

  // choix de l'utilisateur
  clientChoisi: Client | null = null;
  dateDebut = '';
  dateFin = '';
  vehiculeChoisi: Vehicule | null = null;

  aujourdhui = new Date().toLocaleDateString('en-CA'); // date du jour au format yyyy-mm-dd

  constructor(
    private clientService: ClientService,
    private vehiculeService: VehiculeService,
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientService.search().subscribe({
      next: (data) => this.clients.set(data),
      error: (msg) => this.erreur.set(msg)
    });
  }

  // Étape 1 → 2
  choisirClient(c: Client): void {
    this.clientChoisi = c;
    this.erreur.set('');
    this.etape.set(2);
  }

  // Étape 2 → 3 : on cherche les véhicules libres sur la période
  validerPeriode(): void {
    this.erreur.set('');
    if (!this.dateDebut || !this.dateFin || this.dateFin <= this.dateDebut) {
      this.erreur.set('La date de fin doit être après la date de début.');
      return;
    }
    this.vehiculeService.getDisponibles(this.dateDebut, this.dateFin).subscribe({
      next: (data) => {
        this.vehiculesDisponibles.set(data);
        this.etape.set(3);
      },
      error: (msg) => this.erreur.set(msg)
    });
  }

  // Étape 3 → 4 : on demande le prix au backend
  choisirVehicule(v: Vehicule): void {
    this.vehiculeChoisi = v;
    this.erreur.set('');
    this.locationService.simuler(this.demande()).subscribe({
      next: (sim) => {
        this.simulation.set(sim);
        this.etape.set(4);
      },
      error: (msg) => this.erreur.set(msg)
    });
  }

  // Étape 4 → 5 : création de la réservation
  confirmer(): void {
    this.erreur.set('');
    this.locationService.create(this.demande()).subscribe({
      next: () => this.etape.set(5),
      error: (msg) => this.erreur.set(msg)
    });
  }

  precedent(): void {
    this.erreur.set('');
    this.etape.set(this.etape() - 1);
  }

  allerAuxLocations(): void {
    this.router.navigate(['/locations']);
  }

  private demande() {
    return {
      clientId: this.clientChoisi?.id,
      vehiculeId: this.vehiculeChoisi?.id,
      dateDebut: this.dateDebut,
      dateFin: this.dateFin
    };
  }
}
