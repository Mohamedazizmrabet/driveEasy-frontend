import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../api';
import { Client, Eligibilite } from '../models/client';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private url = API_URL + '/clients';

  constructor(private http: HttpClient) {}

  search(q = ''): Observable<Client[]> {
    return this.http.get<Client[]>(this.url, { params: q ? { q } : {} });
  }

  getById(id: number): Observable<Client> {
    return this.http.get<Client>(this.url + '/' + id);
  }

  getEligibilite(id: number): Observable<Eligibilite> {
    return this.http.get<Eligibilite>(this.url + '/' + id + '/eligibilite');
  }

  create(client: any): Observable<Client> {
    return this.http.post<Client>(this.url, client);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id);
  }
}
