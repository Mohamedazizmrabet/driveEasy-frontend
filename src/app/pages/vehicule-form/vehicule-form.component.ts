import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VehiculeService } from '../../services/vehicule.service';

@Component({
  selector: 'app-vehicule-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './vehicule-form.component.html'
})
export class VehiculeFormComponent implements OnInit {
  form: FormGroup;
  id: number | null = null; // null = création, sinon modification
  erreur = signal('');
  anneeMax = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private vehiculeService: VehiculeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // formulaire réactif avec les mêmes règles que le backend
    this.form = this.fb.group({
      immatriculation: ['', Validators.required],
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      annee: [this.anneeMax, [Validators.required, Validators.min(1990), Validators.max(this.anneeMax)]],
      couleur: [''],
      categorie: ['ECONOMIQUE', Validators.required],
      carburant: ['ESSENCE', Validators.required],
      boite: ['MANUELLE', Validators.required],
      nbPlaces: [5, [Validators.required, Validators.min(1), Validators.max(9)]],
      kilometrage: [0, [Validators.required, Validators.min(0)]],
      prixJournalier: [null, [Validators.required, Validators.min(1)]],
      statut: ['DISPONIBLE'],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.vehiculeService.getById(this.id).subscribe({
        next: (v) => this.form.patchValue(v),
        error: (msg) => this.erreur.set(msg)
      });
    }
  }

  // vrai si le champ est invalide et que l'utilisateur l'a touché
  invalide(champ: string): boolean {
    const c = this.form.get(champ);
    return !!c && c.invalid && c.touched;
  }

  enregistrer(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const requete = this.id
      ? this.vehiculeService.update(this.id, this.form.value)
      : this.vehiculeService.create(this.form.value);
    requete.subscribe({
      next: () => this.router.navigate(['/vehicules']),
      error: (msg) => this.erreur.set(msg)
    });
  }
}
