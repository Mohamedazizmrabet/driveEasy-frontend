import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../api';
import { Vehicule } from '../models/vehicule';

@Injectable({ providedIn: 'root' })
export class VehiculeService {
  private url = API_URL + '/vehicules';

  constructor(private http: HttpClient) {}

  getAll(carburant = '', prixMax: number | null = null): Observable<Vehicule[]> {
    let params = new HttpParams();
    if (carburant) params = params.set('carburant', carburant);
    if (prixMax) params = params.set('prixMax', prixMax);
    return this.http.get<Vehicule[]>(this.url, { params });
  }

  getById(id: number): Observable<Vehicule> {
    return this.http.get<Vehicule>(this.url + '/' + id);
  }

  getDisponibles(dateDebut: string, dateFin: string): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(this.url + '/disponibles', { params: { dateDebut, dateFin } });
  }

  create(vehicule: any): Observable<Vehicule> {
    return this.http.post<Vehicule>(this.url, vehicule);
  }

  update(id: number, vehicule: any): Observable<Vehicule> {
    return this.http.put<Vehicule>(this.url + '/' + id, vehicule);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id);
  }
}
