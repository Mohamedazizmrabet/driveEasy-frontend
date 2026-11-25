import { Routes } from '@angular/router';
import { idGuard } from './id.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VehiculeListComponent } from './pages/vehicule-list/vehicule-list.component';
import { VehiculeFormComponent } from './pages/vehicule-form/vehicule-form.component';
import { ClientListComponent } from './pages/client-list/client-list.component';
import { ClientFormComponent } from './pages/client-form/client-form.component';
import { ClientDetailComponent } from './pages/client-detail/client-detail.component';
import { LocationListComponent } from './pages/location-list/location-list.component';
import { LocationNewComponent } from './pages/location-new/location-new.component';
import { LocationRetourComponent } from './pages/location-retour/location-retour.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'vehicules', component: VehiculeListComponent },
  { path: 'vehicules/new', component: VehiculeFormComponent },
  { path: 'vehicules/:id/edit', component: VehiculeFormComponent, canActivate: [idGuard] },

  { path: 'clients', component: ClientListComponent },
  { path: 'clients/new', component: ClientFormComponent },
  { path: 'clients/:id', component: ClientDetailComponent, canActivate: [idGuard] },

  { path: 'locations', component: LocationListComponent },
  { path: 'locations/new', component: LocationNewComponent },
  { path: 'locations/:id/retour', component: LocationRetourComponent, canActivate: [idGuard] },

  { path: '**', redirectTo: 'dashboard' }
];
