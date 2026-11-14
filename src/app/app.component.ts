import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="shell">
      <aside class="sidebar">
        <a class="brand" routerLink="/" aria-label="DriveEasy accueil"><span class="brand-mark">D</span><span>drive<span class="brand-light">easy</span></span></a>
        <p class="nav-caption">ESPACE AGENCE</p>
        <nav aria-label="Navigation principale">
          <a class="nav-link active" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }"><span class="nav-icon">◫</span>Vue d'ensemble</a>
          <a class="nav-link" routerLink="/vehicules"><span class="nav-icon">▣</span>Véhicules</a>
          <a class="nav-link" routerLink="/clients"><span class="nav-icon">♙</span>Clients</a>
          <a class="nav-link" routerLink="/locations"><span class="nav-icon">▤</span>Locations</a>
        </nav>
        <div class="sidebar-bottom"><div class="agency-avatar">DA</div><div><strong>DriveEasy Agency</strong><small>Administrateur</small></div><span class="more">···</span></div>
      </aside>
      <main class="main"><header class="topbar"><div class="crumb">Espace agence <span>/</span> <strong>Tableau de bord</strong></div><div class="top-actions"><button class="icon-button" aria-label="Notifications">♧<i></i></button><span class="top-divider"></span><div class="user-avatar">AK</div><div class="user-name">Aziz K.<small>Administrateur</small></div><span class="chevron">⌄</span></div></header><router-outlet /></main>
    </div>
  `
})
export class AppComponent {}
