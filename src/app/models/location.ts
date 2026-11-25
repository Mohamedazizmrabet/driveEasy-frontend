import { Client } from './client';
import { Vehicule } from './vehicule';

export interface Location {
  id: number;
  clientId: number;
  vehiculeId: number;
  dateDebut: string;
  dateFinPrevue: string;
  dateRetourEffectif: string | null;
  kmDepart: number | null;
  kmRetour: number | null;
  nombreJours: number;
  prixJournalierApplique: number;
  categorieClient: string;
  remise: number;
  penalite: number;
  montantTotal: number;
  statut: string;
  dateCreation: string;
}

export interface LocationDetail {
  location: Location;
  client: Client | null;
  vehicule: Vehicule | null;
  avertissements: string[];
}

export interface Page<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface Simulation {
  nombreJours: number;
  prixJournalier: number;
  coefficientCategorie: number;
  prixJournalierApplique: number;
  categorieClient: string;
  tauxRemise: number;
  montantBrut: number;
  remise: number;
  montantTotal: number;
  clientEligible: boolean;
  motifsIneligibilite: string[];
  vehiculeDisponible: boolean;
  motifIndisponibilite: string | null;
}

export interface Statistiques {
  chiffreAffaires: number;
  chiffreAffairesMois: number;
  nombreLocations: number;
  locationsParStatut: { [statut: string]: number };
  totalVehicules: number | null;
  vehiculesParStatut: { [statut: string]: number } | null;
  tauxOccupation: number | null;
  topVehicules: { vehiculeId: number; libelle: string; immatriculation: string; nombreLocations: number; chiffreAffaires: number }[];
}
