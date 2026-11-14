import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <section class="page">
      <div class="page-heading"><div><p class="eyebrow">SAMEDI 14 NOVEMBRE 2026</p><h1>Vue d'ensemble</h1><p class="subtitle">Voici ce qui se passe dans votre agence aujourd'hui.</p></div><button class="primary-button">＋ <span>Nouvelle location</span></button></div>
      <div class="stat-grid">
        <article class="stat-card"><div class="stat-head"><span>Véhicules disponibles</span><span class="stat-icon blue">▣</span></div><strong>—</strong><small><b class="positive">En attente de l'API</b> <span>sur la flotte</span></small><div class="mini-bars"><i style="height:35%"></i><i style="height:50%"></i><i style="height:42%"></i><i style="height:68%"></i><i style="height:55%"></i><i style="height:82%"></i><i style="height:70%"></i><i style="height:92%"></i><i style="height:74%"></i><i style="height:100%"></i></div></article>
        <article class="stat-card"><div class="stat-head"><span>Locations actives</span><span class="stat-icon violet">▤</span></div><strong>—</strong><small><span>Les données apparaîtront après connexion à l'API.</span></small><div class="stat-footer"><span class="dot violet-dot"></span> Locations en cours</div></article>
        <article class="stat-card"><div class="stat-head"><span>Clients enregistrés</span><span class="stat-icon green">♙</span></div><strong>—</strong><small><span>Statistique fournie par le service client.</span></small><div class="stat-footer"><span class="dot green-dot"></span> Base clients</div></article>
        <article class="stat-card"><div class="stat-head"><span>Chiffre d'affaires</span><span class="stat-icon amber">↗</span></div><strong>— <em>TND</em></strong><small><span>Calculé depuis les locations terminées.</span></small><div class="stat-footer"><span class="dot amber-dot"></span> Ce mois</div></article>
      </div>
      <div class="content-grid">
        <section class="panel activity"><div class="panel-heading"><div><h2>Activité récente</h2><p>Les dernières opérations de l'agence</p></div><button class="text-button">Voir les locations <span>→</span></button></div><div class="empty-state"><div class="empty-icon">▤</div><strong>En attente de connexion au backend</strong><p>Les locations récentes seront affichées ici dès que l'API sera disponible.</p></div></section>
        <section class="panel fleet"><div class="panel-heading"><div><h2>État de la flotte</h2><p>Répartition des véhicules</p></div><button class="more-button" aria-label="Plus d'options">···</button></div><div class="fleet-empty"><div class="ring"><span>—<small>véhicules</small></span></div><div class="legend"><p><i class="legend-dot available"></i>Disponibles <b>—</b></p><p><i class="legend-dot rented"></i>En location <b>—</b></p><p><i class="legend-dot maintenance"></i>Maintenance <b>—</b></p></div></div><div class="api-note"><span>i</span> Les statistiques ne sont pas simulées.</div></section>
      </div>
      <section class="panel quick-panel"><div><h2>Accès rapide</h2><p>Gérez les principales activités de votre agence.</p></div><div class="quick-actions"><a href="/vehicules">＋ Ajouter un véhicule <span>→</span></a><a href="/clients">＋ Nouveau client <span>→</span></a><a href="/locations/new">＋ Créer une réservation <span>→</span></a></div></section>
      <footer class="footer">© 2026 DriveEasy <span>·</span> Gestion de flotte automobile</footer>
    </section>
  `
})
export class DashboardComponent {}
