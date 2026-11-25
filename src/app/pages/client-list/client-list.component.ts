import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';

@Component({
  selector: 'app-client-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit {
  clients = signal<Client[]>([]);
  recherche = '';
  erreur = signal('');
  page = 1;
  parPage = 5;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.erreur.set('');
    this.clientService.search(this.recherche).subscribe({
      next: (data) => {
        this.clients.set(data);
        this.page = 1;
      },
      error: (msg) => this.erreur.set(msg)
    });
  }

  clientsAffiches(): Client[] {
    const debut = (this.page - 1) * this.parPage;
    return this.clients().slice(debut, debut + this.parPage);
  }

  nbPages(): number {
    return Math.max(1, Math.ceil(this.clients().length / this.parPage));
  }

  supprimer(c: Client): void {
    if (!confirm('Supprimer ' + c.prenom + ' ' + c.nom + ' ?')) return;
    this.clientService.delete(c.id).subscribe({
      next: () => this.charger(),
      error: (msg) => this.erreur.set(msg)
    });
  }
}
