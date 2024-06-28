import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KingDom } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class KingdomService {
  private BASE_URL = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getKingdomList(): Observable<{ kingdoms: KingDom[] }> {
    return this.http.get<{ kingdoms: KingDom[] }>(`${this.BASE_URL}/kingdoms`);
  }
}
