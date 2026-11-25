import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './client-form.component.html'
})
export class ClientFormComponent {
  form: FormGroup;
  erreur = signal('');

  constructor(private fb: FormBuilder, private clientService: ClientService, private router: Router) {
    this.form = this.fb.group({
      cin: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      adresse: [''],
      numeroPermis: ['', Validators.required],
      dateExpirationPermis: ['', Validators.required]
    });
  }

  invalide(champ: string): boolean {
    const c = this.form.get(champ);
    return !!c && c.invalid && c.touched;
  }

  enregistrer(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.clientService.create(this.form.value).subscribe({
      next: (client) => this.router.navigate(['/clients', client.id]),
      error: (msg) => this.erreur.set(msg)
    });
  }
}
