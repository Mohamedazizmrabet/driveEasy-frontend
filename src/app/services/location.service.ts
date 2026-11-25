import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../api';
import { Location, LocationDetail, Page, Simulation, Statistiques } from '../models/location';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private url = API_URL + '/locations';

  constructor(private http: HttpClient) {}

  getAll(filtres: { statut?: string; clientId?: number; dateDebut?: string; dateFin?: string; page?: number; size?: number }): Observable<Page<Location>> {
    let params = new HttpParams();
    if (filtres.statut) params = params.set('statut', filtres.statut);
    if (filtres.clientId) params = params.set('clientId', filtres.clientId);
    if (filtres.dateDebut) params = params.set('dateDebut', filtres.dateDebut);
    if (filtres.dateFin) params = params.set('dateFin', filtres.dateFin);
    params = params.set('page', filtres.page ?? 0).set('size', filtres.size ?? 10);
    return this.http.get<Page<Location>>(this.url, { params });
  }

  getById(id: number): Observable<LocationDetail> {
    return this.http.get<LocationDetail>(this.url + '/' + id);
  }

  simuler(demande: any): Observable<Simulation> {
    return this.http.post<Simulation>(this.url + '/simulation', demande);
  }

  create(demande: any): Observable<Location> {
    return this.http.post<Location>(this.url, demande);
  }

  depart(id: number): Observable<Location> {
    return this.http.patch<Location>(this.url + '/' + id + '/depart', {});
  }

  retour(id: number, kmRetour: number, dateRetour: string): Observable<Location> {
    return this.http.patch<Location>(this.url + '/' + id + '/retour', { kmRetour, dateRetour });
  }

  annuler(id: number): Observable<Location> {
    return this.http.patch<Location>(this.url + '/' + id + '/annulation', {});
  }

  getStatistiques(): Observable<Statistiques> {
    return this.http.get<Statistiques>(this.url + '/statistiques');
  }
}
