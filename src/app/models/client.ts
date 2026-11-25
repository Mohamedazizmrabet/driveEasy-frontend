export interface Client {
  id: number;
  cin: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  age: number;
  email: string;
  telephone: string;
  adresse: string;
  numeroPermis: string;
  dateExpirationPermis: string;
  permisExpire: boolean;
  categorieClient: string;
  dateInscription: string;
}

export interface Eligibilite {
  clientId: number;
  eligible: boolean;
  age: number;
  permisValide: boolean;
  categorieClient: string;
  motifs: string[];
}
