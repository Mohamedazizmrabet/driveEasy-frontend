import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { VehiculeService } from '../../services/vehicule.service';
import { Vehicule } from '../../models/vehicule';

@Component({
  selector: 'app-vehicule-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './vehicule-list.component.html',
  styleUrl: './vehicule-list.component.css'
})
export class VehiculeListComponent implements OnInit {
  vehicules = signal<Vehicule[]>([]);
  erreur = signal('');

  // filtres (envoyés au backend)
  carburant = '';
  prixMax: number | null = null;

  // tri et pagination (faits dans le navigateur)
  tri = 'marque';
  page = 1;
  parPage = 6;

  constructor(private vehiculeService: VehiculeService) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.erreur.set('');
    this.vehiculeService.getAll(this.carburant, this.prixMax).subscribe({
      next: (data) => {
        this.vehicules.set(data);
        this.page = 1;
      },
      error: (msg) => this.erreur.set(msg)
    });
  }

  // liste triée puis découpée pour la page courante
  vehiculesAffiches(): Vehicule[] {
    const copie = [...this.vehicules()];
    if (this.tri === 'prixAsc') copie.sort((a, b) => a.prixJournalier - b.prixJournalier);
    if (this.tri === 'prixDesc') copie.sort((a, b) => b.prixJournalier - a.prixJournalier);
    if (this.tri === 'marque') copie.sort((a, b) => a.marque.localeCompare(b.marque));
    const debut = (this.page - 1) * this.parPage;
    return copie.slice(debut, debut + this.parPage);
  }

  nbPages(): number {
    return Math.max(1, Math.ceil(this.vehicules().length / this.parPage));
  }

  supprimer(v: Vehicule): void {
    if (!confirm('Supprimer le véhicule ' + v.immatriculation + ' ?')) return;
    this.vehiculeService.delete(v.id).subscribe({
      next: () => this.charger(),
      error: (msg) => this.erreur.set(msg)
    });
  }
}
