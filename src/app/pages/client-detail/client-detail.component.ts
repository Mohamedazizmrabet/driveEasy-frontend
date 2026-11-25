import { Component, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { LocationService } from '../../services/location.service';
import { Client, Eligibilite } from '../../models/client';
import { Location } from '../../models/location';

@Component({
  selector: 'app-client-detail',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './client-detail.component.html'
})
export class ClientDetailComponent implements OnInit {
  client = signal<Client | null>(null);
  eligibilite = signal<Eligibilite | null>(null);
  locations = signal<Location[]>([]);
  erreur = signal('');

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.clientService.getById(id).subscribe({
      next: (c) => this.client.set(c),
      error: (msg) => this.erreur.set(msg)
    });
    this.clientService.getEligibilite(id).subscribe({
      next: (e) => this.eligibilite.set(e)
    });
    // historique : toutes les locations du client (100 max)
    this.locationService.getAll({ clientId: id, size: 100 }).subscribe({
      next: (page) => this.locations.set(page.content)
    });
  }
}
